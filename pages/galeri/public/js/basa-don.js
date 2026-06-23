// Sayfa kaydırıldığında butonun görünürlüğünü kontrol et
window.onscroll = function () {
    const btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  };
  
  // Butona tıklanınca yukarı kaydır
  document.getElementById("scrollToTopBtn").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (scrollY > 1000) {
        btn.classList.add("sticky");
      } else {
        btn.classList.remove("sticky");
      }

      
  });
  