document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("privacyModal");
  const acceptBtn = document.getElementById("acceptPrivacy");
  
  const accepted = localStorage.getItem("privacyAccepted");

  if (!accepted) {
    modal.style.display = "flex";  // Veya block
  } else {
    modal.style.display = "none";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("privacyAccepted", "true");
    modal.style.display = "none";
  });
});
