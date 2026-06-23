document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("background-music");
  const toggleBtn = document.getElementById("music-toggle");

  let isPlaying = false;

  toggleBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.volume = 0.2;  // Müzik sesini 20% yapıyoruz
      music.play().then(() => {
        isPlaying = true;
        toggleBtn.textContent = "🔇";  // Simgeyi kapalı hale getir
      }).catch(err => {
        console.error("Müzik çalma hatası:", err);
        alert("Müzik çalma hatası: " + err.message);
      });
    } else {
      music.pause();
      isPlaying = false;
      toggleBtn.textContent = "🔊";  // Simgeyi açık hale getir
    }
  });
});