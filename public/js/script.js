// Aside menu
const menuToggle = document.querySelector('.menu-toggle');  // Menü açma butonu
const aside = document.querySelector('aside');  // Aside menüsü

// Butona tıklandığında aside menüsünü aç/kapa yapıyoruz
if (menuToggle && aside) {
    menuToggle.addEventListener('click', () => {
        // Menü açık mı kontrol ediyoruz
        if (aside.style.display === 'none' || aside.style.display === '') {
            // Menü gizliyse, önce display: block yapıyoruz sonra animasyon başlatıyoruz
            aside.style.display = 'block';
            setTimeout(() => {
                aside.style.transform = 'translateY(0)';  // Menü aşağıya kayacak
                aside.style.opacity = 1;  // Menü görünür olacak
            }, 10); // Animasyon başlatmak için küçük bir gecikme
        } else {
            // Menü açıksa, yukarı kaydırıyoruz ve opacity'yi sıfırlıyoruz
            aside.style.transform = 'translateY(-100%)';  // Menü yukarı kayar
            aside.style.opacity = 0;  // Menü kaybolur
            setTimeout(() => {
                aside.style.display = 'none';  // Menü tamamen gizlenir
            }, 300);  // Animasyon süresi kadar bekle
        }
    });
}

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
