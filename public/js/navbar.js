/* ====== Navbar JS — Hamburger + Dropdown + Scroll Shadow ====== */

document.addEventListener('DOMContentLoaded', () => {
  const topnav      = document.getElementById('topnav');
  const hamburger   = document.getElementById('hamburger');
  const topnavMenu  = document.getElementById('topnav-menu');
  const overlay     = document.getElementById('mobile-overlay');
  const dropdownParent = document.querySelector('.has-dropdown');
  const dropdownToggle = dropdownParent ? dropdownParent.querySelector('.dropdown-toggle') : null;

  /* ── Scroll shadow ── */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      topnav.classList.add('scrolled');
    } else {
      topnav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Hamburger toggle ── */
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    topnavMenu.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    // also close dropdown
    if (dropdownParent) dropdownParent.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    topnavMenu.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  overlay.addEventListener('click', closeMobileMenu);

  /* ── Mobile: tap on dropdown toggle ── */
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      // Only intercept on mobile widths
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownParent.classList.toggle('open');
      }
    });
  }

  /* ── Close menu when a link is clicked ── */
  topnavMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If mobile and it's an anchor, close menu
      if (window.innerWidth <= 768) {
        // Don't close if it's the dropdown toggle (handled above)
        if (!link.classList.contains('dropdown-toggle')) {
          closeMobileMenu();
        }
      }
    });
  });

  /* ── Active link highlighting on scroll ── */
  const sections = document.querySelectorAll('main section[id], section[id]');
  const navLinks = topnavMenu.querySelectorAll('a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const parentLi = a.parentElement;
          if (a.getAttribute('href') === '#' + id) {
            parentLi.classList.add('active');
          } else {
            parentLi.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
});
