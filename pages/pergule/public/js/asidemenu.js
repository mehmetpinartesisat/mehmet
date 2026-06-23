// Toggle butonunu, menüyü ve kapat butonunu seçiyoruz
const menuToggle = document.getElementById('menu-toggle');
const menuAside = document.getElementById('menu-aside');
const menuClose = document.getElementById('menu-close');

// Menü açma/kapatma için toggle butonu
menuToggle.addEventListener('click', () => {
  // Menü açma işlemi
  menuAside.classList.toggle('active');  // Menü açıldığında "active" sınıfı eklenir
  menuToggle.classList.toggle('hidden');  // Menü açıldığında toggle butonu gizlenir
  
  // Menü açıldığında "☰" ikonunu gizleyip, menü kapama butonunu gösteriyoruz
  if (menuAside.classList.contains('active')) {
    menuToggle.textContent = "";  // "☰" simgesini gizler
  } else {
    menuToggle.textContent = "☰";  // Menü kapandığında simgeyi tekrar gösterir
  }
});

// Menü kapat butonu
menuClose.addEventListener('click', () => {
  // Menü kapanıyor
  menuAside.classList.remove('active');  // "active" sınıfını çıkarıyoruz
  menuToggle.classList.remove('hidden');  // Menü toggle butonunu tekrar görünür yapıyoruz
  menuToggle.textContent = "☰";  // Menü kapatıldığında "☰" ikonunu geri getiriyoruz
});


