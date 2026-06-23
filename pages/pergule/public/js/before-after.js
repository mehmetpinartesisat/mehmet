const wrapper = document.querySelector('.after-img-wrapper');
const handle = document.getElementById('slider-handle');
const container = document.querySelector('.comparison-container');

let isDragging = false;

handle.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  moveSlider(e.clientX);
});

container.addEventListener('touchstart', () => isDragging = true);
document.addEventListener('touchend', () => isDragging = false);
document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  moveSlider(e.touches[0].clientX);
});

function moveSlider(x) {
  const rect = container.getBoundingClientRect();
  let offset = x - rect.left;
  offset = Math.max(0, Math.min(offset, rect.width));
  wrapper.style.width = `${offset}px`;
}
