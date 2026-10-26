// Pita berjalan yang bisa digeser mouse, dengan inersia.
import { reduceMotion } from "./motion.js";

export function mountMarquee(el, html) {
  const track = document.createElement("div");
  track.className = "marquee__track";
  track.innerHTML = html + html; // diduplikasi supaya bisa berputar tanpa jeda
  el.append(track);

  const speed = reduceMotion ? 0 : 0.45; // px per frame
  let x = 0, v = 0, half = 0, dragging = false, lastX = 0, hover = false;

  const measure = () => { half = track.scrollWidth / 2; };
  new ResizeObserver(measure).observe(track);

  function frame() {
    if (!dragging) {
      // inersia meluruh kembali ke kecepatan jalan normal
      const cruise = hover ? 0 : -speed;
      v += (cruise - v) * 0.04;
      x += v;
    }
    if (half) {
      if (x <= -half) x += half;
      if (x > 0) x -= half;
    }
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(frame);
  }

  el.addEventListener("pointerdown", e => {
    dragging = true; lastX = e.clientX; v = 0;
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  });
  el.addEventListener("pointermove", e => {
    if (!dragging) return;
    const d = e.clientX - lastX;
    lastX = e.clientX;
    x += d;
    v = d;
  });
  const end = () => { dragging = false; el.classList.remove("is-dragging"); };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  // scroll halaman ikut "mendorong" pita (event dari efek scroll Motion)
  document.addEventListener("fx:velocity", e => {
    if (!dragging && !reduceMotion) v -= Math.max(-6, Math.min(6, e.detail / 400));
  });
  el.addEventListener("pointerenter", () => { hover = true; });
  el.addEventListener("pointerleave", () => { hover = false; });

  measure();
  requestAnimationFrame(frame);
}
