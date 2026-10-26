// MOTION — reveal saat scroll, judul per huruf, tilt & spotlight mengikuti mouse,
// tombol magnetik, count-up angka, glow latar, progress scroll.
export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- judul dipecah per huruf ---------- */
export function splitText(el) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  el.classList.add("split");
  el.setAttribute("aria-label", el.textContent.trim());
  let i = 0;
  const walk = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(" "); return; }
          const w = document.createElement("span");
          w.className = "w";
          w.setAttribute("aria-hidden", "true");
          [...part].forEach(c => {
            const ch = document.createElement("span");
            ch.className = "ch";
            ch.style.setProperty("--i", i++);
            ch.textContent = c;
            w.append(ch);
          });
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
}

/* ---------- reveal saat masuk viewport ---------- */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        if (e.target.dataset.count !== undefined) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
  : null;

export function initReveal(root = document) {
  root.querySelectorAll("[data-split]").forEach(splitText);

  // anak dari [data-stagger] mendapat jeda bertingkat
  root.querySelectorAll("[data-stagger]").forEach(group => {
    const step = +group.dataset.stagger || 80;
    [...group.children].forEach((child, k) => {
      if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", "");
      child.style.setProperty("--d", k * step);
    });
  });

  root.querySelectorAll("[data-reveal]:not(.is-in), .split:not(.is-in), [data-count]:not(.is-in)").forEach(el => {
    if (io) io.observe(el);
    else { el.classList.add("is-in"); if (el.dataset.count !== undefined) countUp(el); }
  });
}

// jalankan ulang animasi masuk (dipakai filter organisasi)
export function replay(elements, step = 70) {
  elements.forEach(el => el.classList.remove("is-in"));
  void document.body.offsetWidth;
  elements.forEach((el, k) => {
    el.style.setProperty("--d", k * step);
    requestAnimationFrame(() => el.classList.add("is-in"));
  });
}

/* ---------- count-up ---------- */
export function countUp(el) {
  const raw = el.dataset.count;
  const end = parseFloat(raw);
  if (Number.isNaN(end)) return;
  const decimals = (raw.split(".")[1] || "").length;
  if (reduceMotion) { el.textContent = end.toFixed(decimals); return; }
  const dur = 1400, t0 = performance.now();
  const tick = now => {
    const t = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
    el.textContent = (end * (t === 1 ? 1 : eased)).toFixed(decimals);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- spotlight, tilt, magnetic ---------- */
function spotlight(card) {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}

// tilt memakai properti `rotate` (bukan `transform`) supaya tidak bentrok
// dengan animasi reveal; perspektif datang dari container.
function tilt(el) {
  const max = +el.dataset.tilt || 6;
  let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0, over = false;
  const loop = () => {
    rx += (tx - rx) * 0.14;
    ry += (ty - ry) * 0.14;
    const angle = Math.hypot(rx, ry);
    el.style.rotate = angle < 0.01 ? "" : `${rx / angle} ${ry / angle} 0 ${angle}deg`;
    if (over || angle > 0.01) raf = requestAnimationFrame(loop);
    else raf = 0;
  };
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tx = -py * max * 2;
    ty = px * max * 2;
    over = true;
    if (!raf) raf = requestAnimationFrame(loop);
  });
  el.addEventListener("pointerleave", () => {
    over = false; tx = ty = 0;
    if (!raf) raf = requestAnimationFrame(loop);
  });
}

// elemen tertarik sedikit ke arah kursor, lalu memantul balik
function magnetic(el) {
  const strength = +el.dataset.magnetic || 0.3;
  let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
  const loop = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    el.style.translate = Math.abs(x) + Math.abs(y) < 0.05 && !tx && !ty ? "" : `${x}px ${y}px`;
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(loop);
    else raf = 0;
  };
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    tx = (e.clientX - (r.left + r.width / 2)) * strength;
    ty = (e.clientY - (r.top + r.height / 2)) * strength;
    if (!raf) raf = requestAnimationFrame(loop);
  });
  el.addEventListener("pointerleave", () => {
    tx = ty = 0;
    if (!raf) raf = requestAnimationFrame(loop);
  });
}

export function initPointerFx(root = document) {
  root.querySelectorAll(".card:not([data-fx])").forEach(card => {
    card.dataset.fx = "1";
    spotlight(card);
  });
  if (!finePointer || reduceMotion) return;
  root.querySelectorAll("[data-tilt]:not([data-fx-tilt])").forEach(el => {
    el.dataset.fxTilt = "1";
    tilt(el);
  });
  root.querySelectorAll("[data-magnetic]:not([data-fx-mag])").forEach(el => {
    el.dataset.fxMag = "1";
    magnetic(el);
  });
}

/* ---------- atmosfer halaman ---------- */
export function initAtmosphere() {
  const glow = document.querySelector(".glow");
  const progress = document.querySelector(".progress");
  const topbar = document.querySelector(".topbar");

  // glow mengikuti mouse dengan sedikit lag
  if (glow && !reduceMotion) {
    let gx = innerWidth * 0.5, gy = innerHeight * 0.2, tx = gx, ty = gy, raf = 0;
    const loop = () => {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener("pointermove", e => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    loop();
  }

  // progress bar, topbar solid, rail timeline — satu handler scroll
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.setProperty("--progress", max > 0 ? (scrollY / max).toFixed(4) : 0);
    if (topbar) topbar.style.setProperty("--topbar-solid", scrollY > 8 ? 1 : 0);
    document.querySelectorAll(".timeline").forEach(tl => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      tl.style.setProperty("--p", p.toFixed(4));
    });
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
  return onScroll;
}
