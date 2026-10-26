// Tumpukan foto: geser kartu depan dengan mouse/jari untuk ganti foto.
import { icon } from "./icons.js";
import { esc } from "./components.js";
import { reduceMotion } from "./motion.js";
import { t } from "../core/i18n.js";

const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

export function mountPhotoStack(el, photos, name) {
  if (!photos.length) { el.remove(); return; }

  el.innerHTML = `
    <span class="photo-hint">${t("photo.hint")}</span>
    ${photos.map((src, i) => `
      <div class="photo-stack__card" data-pos="hidden">
        <img src="${esc(src)}" alt="${esc(t("photo.alt", { name, n: i + 1 }))}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} draggable="false">
      </div>`).join("")}
    <div class="photo-stack__ui">
      <button class="round-btn" type="button" data-dir="-1" aria-label="${t("photo.prev")}">${icon.arrowLeft}</button>
      <span class="photo-counter" aria-live="polite"></span>
      <button class="round-btn" type="button" data-dir="1" aria-label="${t("photo.next")}">${icon.arrow}</button>
      <button class="round-btn" type="button" data-autoplay></button>
    </div>`;

  let cards = [...el.querySelectorAll(".photo-stack__card")];
  const counter = el.querySelector(".photo-counter");
  let n = cards.length;
  let cur = 0, timer = 0, busy = false;
  // jeda manual oleh pengunjung (WCAG 2.2.2); reduced-motion = mulai dalam keadaan jeda
  let paused = reduceMotion;
  const playBtn = el.querySelector("[data-autoplay]");

  // foto yang gagal dimuat dibuang dari tumpukan
  cards.forEach(c => c.querySelector("img").addEventListener("error", () => {
    c.remove();
    cards = cards.filter(k => k !== c);
    n = cards.length;
    cur = Math.min(cur, Math.max(0, n - 1));
    if (n) layout(); else el.remove();
  }, { once: true }));

  function layout() {
    cards.forEach((c, k) => {
      const pos = (k - cur + n) % n;
      c.dataset.pos = pos < 3 ? pos : "hidden";
      c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
    counter.textContent = `${cur + 1} / ${n}`;
  }

  function step(dir, fling = 0) {
    if (busy || n < 2) return;
    const front = cards[cur];
    if (fling && !reduceMotion) {
      // kartu depan terlempar searah geseran, lalu masuk ke belakang tumpukan
      busy = true;
      front.classList.remove("is-dragging");
      front.classList.add("is-fling");
      front.style.transform = `translate(${fling * 120}%, -6%) rotate(${fling * 24}deg)`;
      setTimeout(() => {
        front.classList.remove("is-fling");
        front.style.transform = "";
        cur = (cur + dir + n) % n;
        layout();
        busy = false;
      }, 320);
    } else {
      front.style.transform = "";
      cur = (cur + dir + n) % n;
      layout();
    }
  }

  // ---- drag ----
  let sx = 0, sy = 0, dx = 0, lastX = 0, lastT = 0, vx = 0, dragging = false;
  el.addEventListener("pointerdown", e => {
    const front = cards[cur];
    if (busy || !front.contains(e.target) || e.button !== 0) return;
    dragging = true;
    sx = lastX = e.clientX; sy = e.clientY; dx = 0; vx = 0; lastT = performance.now();
    front.setPointerCapture(e.pointerId);
    front.classList.add("is-dragging");
    stop();
  });
  el.addEventListener("pointermove", e => {
    if (!dragging) return;
    const now = performance.now();
    vx = (e.clientX - lastX) / Math.max(1, now - lastT);
    lastX = e.clientX; lastT = now;
    dx = e.clientX - sx;
    const dy = (e.clientY - sy) * 0.25;
    cards[cur].style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.07}deg)`;
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    el.classList.add("was-dragged");
    const front = cards[cur];
    const flung = Math.abs(dx) > 90 || Math.abs(vx) > 0.6;
    if (flung) {
      // geser ke kiri = foto berikutnya
      const dir = (dx || vx) < 0 ? 1 : -1;
      step(dir, -dir);
    } else {
      front.classList.remove("is-dragging");
      front.style.transform = "";
    }
    start();
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);

  // ---- tombol & keyboard ----
  el.querySelectorAll("[data-dir]").forEach(b => b.addEventListener("click", () => {
    step(+b.dataset.dir, reduceMotion ? 0 : -(+b.dataset.dir));
    start();
  }));
  el.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { step(1, -1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { step(-1, 1); e.preventDefault(); }
  });

  // ---- autoplay (berhenti saat disentuh/difokus) ----
  function stop() { clearInterval(timer); timer = 0; }
  function start() {
    stop();
    if (paused || n < 2) return;
    timer = setInterval(() => step(1, -1), 5000);
  }
  el.addEventListener("pointerenter", stop);
  el.addEventListener("pointerleave", () => { if (!dragging) start(); });
  el.addEventListener("focusin", stop);
  el.addEventListener("focusout", e => { if (!el.contains(e.relatedTarget)) start(); });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  function syncPlayBtn() {
    playBtn.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
    playBtn.setAttribute("aria-label", paused ? t("photo.play") : t("photo.pause"));
    playBtn.setAttribute("aria-pressed", String(paused));
    playBtn.hidden = n < 2;
  }
  playBtn.addEventListener("click", () => {
    paused = !paused;
    syncPlayBtn();
    // tombol ada di dalam tumpukan (hover/fokus menahan autoplay); lanjut saat kursor/fokus pergi
  });

  layout();
  syncPlayBtn();
  start();
}
