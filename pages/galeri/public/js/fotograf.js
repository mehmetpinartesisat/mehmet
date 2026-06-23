function openPopup(imgElement) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    popup.style.display = 'flex'; // Pop-up'ı göster
    popupImg.src = imgElement.src; // Tıklanan fotoğrafı büyük olarak göster
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Pop-up'ı gizle
}
