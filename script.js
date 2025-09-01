// script.js - arrastre vertical con Pointer Events (mouse + touch)
const gallery = document.getElementById('gallery');

let isDown = false;
let startY = 0;
let scrollTop = 0;
let activePointerId = null;

gallery.addEventListener('pointerdown', (e) => {
  isDown = true;
  activePointerId = e.pointerId;
  gallery.classList.add('active');
  gallery.setPointerCapture(activePointerId);

  startY = e.clientY - gallery.offsetTop;
  scrollTop = gallery.scrollTop;
  e.preventDefault();
});

gallery.addEventListener('pointermove', (e) => {
  if (!isDown || e.pointerId !== activePointerId) return;

  const y = e.clientY - gallery.offsetTop;
  const walk = (y - startY) * 1.6; // velocidad: aumenta (>1.6) o reduce (<1.6)
  gallery.scrollTop = scrollTop - walk;
});

function endDrag(e) {
  if (!isDown) return;
  isDown = false;
  if (activePointerId !== null) {
    try { gallery.releasePointerCapture(activePointerId); } catch (err) {}
  }
  activePointerId = null;
  gallery.classList.remove('active');
}

gallery.addEventListener('pointerup', endDrag);
gallery.addEventListener('pointercancel', endDrag);
gallery.addEventListener('pointerleave', endDrag);
