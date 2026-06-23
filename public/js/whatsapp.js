/**
 * WhatsApp Integration — Mehmet Pınar Tesisat
 * Handles unified form submission → WhatsApp redirect
 * and floating WhatsApp button behavior
 */

(function () {
    'use strict';

    const WHATSAPP_NUMBER = '905488669395';

    /**
     * Build WhatsApp URL for service request
     */
    function buildServiceWhatsAppURL(name, phone, serviceType, message) {
        const lines = [];
        lines.push('🔧 Hizmet Talebi — Web Sitesinden');
        lines.push('');
        if (name) lines.push(`👤 Ad Soyad: ${name}`);
        if (phone) lines.push(`📞 Telefon: ${phone}`);
        if (serviceType && serviceType !== '') lines.push(`🔧 Hizmet: ${serviceType}`);
        if (message) lines.push(`💬 Mesaj: ${message}`);

        const text = encodeURIComponent(lines.join('\n'));
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }

    /**
     * Build WhatsApp URL for feedback (suggestion/complaint/thank you)
     */
    function buildFeedbackWhatsAppURL(type, name, phone, subject, message, rating) {
        const lines = [];

        // Emoji based on type
        const typeEmojis = {
            'Öneri': '💡', 'Suggestion': '💡',
            'Şikayet': '⚠️', 'Complaint': '⚠️',
            'Teşekkür': '❤️', 'Thank You': '❤️'
        };

        const emoji = typeEmojis[type] || '📝';
        lines.push(`${emoji} ${type} — Web Sitesinden`);
        lines.push('');
        if (name) lines.push(`👤 Ad Soyad: ${name}`);
        if (phone) lines.push(`📞 Telefon: ${phone}`);
        if (subject && subject !== '') lines.push(`📋 Konu: ${subject}`);
        if (rating > 0) lines.push(`⭐ Puan: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`);
        if (message) lines.push(`💬 Mesaj: ${message}`);

        const text = encodeURIComponent(lines.join('\n'));
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    }

    /**
     * Validate form fields
     */
    function validateForm(name, phone, message) {
        const errors = [];

        if (!name || name.trim().length < 2) {
            errors.push('Lütfen adınızı girin.');
        }

        if (!phone || phone.trim().length < 7) {
            errors.push('Lütfen geçerli bir telefon numarası girin.');
        }

        if (!message || message.trim().length < 3) {
            errors.push('Lütfen mesajınızı yazın.');
        }

        return errors;
    }

    /**
     * Show inline validation feedback
     */
    function showValidationError(formEl, errors) {
        // Remove existing error
        const existing = formEl.querySelector('.form-error');
        if (existing) existing.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: #FEE2E2;
            border: 1px solid #FECACA;
            border-radius: 12px;
            padding: 14px 20px;
            margin-bottom: 1.5rem;
            color: #DC2626;
            font-size: 0.9rem;
            line-height: 1.6;
            animation: faqSlide 0.3s ease;
        `;
        errorDiv.innerHTML = errors.map(e => `⚠️ ${e}`).join('<br>');
        formEl.insertBefore(errorDiv, formEl.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.opacity = '0';
                errorDiv.style.transform = 'translateY(-10px)';
                errorDiv.style.transition = 'all 0.3s ease';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);
    }

    /**
     * Toggle form fields based on message type
     */
    function initFormTypeToggle() {
        const radios = document.querySelectorAll('input[name="message-type"]');
        if (radios.length === 0) return;

        const serviceGroup = document.getElementById('service-group');
        const subjectGroup = document.getElementById('subject-group');
        const ratingGroup = document.getElementById('rating-group');

        function updateVisibility() {
            const selected = document.querySelector('input[name="message-type"]:checked');
            if (!selected) return;

            const isService = selected.value === 'Hizmet Talebi' || selected.value === 'Service Request';

            if (serviceGroup) {
                serviceGroup.style.display = isService ? '' : 'none';
            }
            if (subjectGroup) {
                subjectGroup.style.display = isService ? 'none' : '';
            }
            if (ratingGroup) {
                ratingGroup.style.display = isService ? 'none' : '';
            }
        }

        radios.forEach(radio => {
            radio.addEventListener('change', updateVisibility);
        });

        // Initial state
        updateVisibility();
    }

    /**
     * Initialize unified WhatsApp form
     */
    function initWhatsAppForm() {
        const form = document.getElementById('whatsapp-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const typeInput = form.querySelector('input[name="message-type"]:checked');
            const type = typeInput ? typeInput.value : 'Hizmet Talebi';
            const name = document.getElementById('wp-name')?.value;
            const phone = document.getElementById('wp-phone')?.value;
            const message = document.getElementById('wp-message')?.value;

            const errors = validateForm(name, phone, message);

            if (errors.length > 0) {
                showValidationError(form, errors);
                return;
            }

            let url;

            if (type === 'Hizmet Talebi' || type === 'Service Request') {
                const serviceType = document.getElementById('wp-service')?.value;
                url = buildServiceWhatsAppURL(name, phone, serviceType, message);
            } else {
                const subject = document.getElementById('cf-subject')?.value;
                const starContainer = document.getElementById('star-rating');
                const rating = starContainer?.getRating ? starContainer.getRating() : 0;
                url = buildFeedbackWhatsAppURL(type, name, phone, subject, message, rating);
            }

            window.open(url, '_blank');

            // Show success feedback
            const btn = form.querySelector('.whatsapp-submit-btn');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ WhatsApp Açılıyor...';
                btn.style.background = '#10B981';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }
        });
    }

    /**
     * Initialize Star Rating
     */
    function initStarRating() {
        const starContainer = document.getElementById('star-rating');
        if (!starContainer) return;

        let currentRating = 0;
        const stars = starContainer.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('mouseenter', function () {
                const val = parseInt(this.dataset.value);
                stars.forEach(s => {
                    s.classList.toggle('hovered', parseInt(s.dataset.value) <= val);
                });
            });

            star.addEventListener('mouseleave', function () {
                stars.forEach(s => s.classList.remove('hovered'));
            });

            star.addEventListener('click', function () {
                currentRating = parseInt(this.dataset.value);
                stars.forEach(s => {
                    s.classList.toggle('active', parseInt(s.dataset.value) <= currentRating);
                });
            });
        });

        // Expose getter
        starContainer.getRating = function () {
            return currentRating;
        };
    }

    /**
     * Initialize floating WhatsApp tooltip auto-show
     */
    function initFloatingWhatsApp() {
        const floatingBtn = document.querySelector('.floating-whatsapp');
        if (!floatingBtn) return;

        // Show tooltip after 5 seconds
        setTimeout(() => {
            const tooltip = floatingBtn.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.pointerEvents = 'auto';

                setTimeout(() => {
                    tooltip.style.opacity = '';
                    tooltip.style.pointerEvents = '';
                }, 4000);
            }
        }, 5000);
    }

    /**
     * Scroll reveal animation
     */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // Initialize
    function init() {
        initFormTypeToggle();
        initWhatsAppForm();
        initStarRating();
        initFloatingWhatsApp();
        initScrollReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
