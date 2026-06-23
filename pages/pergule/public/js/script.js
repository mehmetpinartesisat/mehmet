// Aside menu
const menuToggle = document.querySelector('.menu-toggle');  // Menü açma butonu
const aside = document.querySelector('aside');  // Aside menüsü

// Butona tıklandığında aside menüsünü aç/kapa yapıyoruz
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







