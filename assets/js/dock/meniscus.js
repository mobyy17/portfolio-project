// Meniscus — dock navigasi antar halaman.
// Dipasang otomatis ke setiap elemen [data-meniscus]. Daftar halaman: assets/js/dock/routes.js. Atribut:
//   data-base="../"        prefix href (untuk halaman di subfolder)
//   data-active="skill"    halaman aktif (default: <body data-page>)
//   data-navigate="false"  hanya preview, tidak pindah halaman (mode demo)
// Event di document: "meniscus:preview" (bead melewati tab) dan "meniscus:navigate" (sebelum pindah).
(() => {
  // ---- geometri (HEAD harus sama dengan --head) ----
  const HEAD = 44;     // ruang di atas plate
  const R = 14;        // radius sudut plate
  const BEAD_R = 26;   // radius bead
  const GAP = 5;       // celah bead ke dinding socket
  const RB = BEAD_R + GAP; // radius bowl
  const BY = 2;        // pusat bowl sedikit di bawah tepi atas
  const S = 12;        // radius shoulder (fillet) dasar

  // ---- fisika ----
  const K = 0.12, DAMP = 0.72;   // spring
  const LEAVE_MIN = 280, LEAVE_MAX = 560; // ms sebelum pindah halaman
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // the shoulder is tangent to the top edge AND to the bowl,
  // so |C1C2| = s + rb -> solve the socket's half-width:
  const reach = (s, rb, by) => Math.sqrt((s + rb) ** 2 - (s - by) ** 2);

  function hexToRgb(h) {
    h = h.replace("#", "");
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  }

  function template(routes, base) {
    const tabs = routes.map((r, i) => `
      <a class="tab" href="${base}${r.href}" data-i="${i}" style="--acc:${r.acc}">
        <svg viewBox="0 0 24 24" aria-hidden="true">${r.icon}</svg>
        <span class="tab__label">${r.label}</span>
      </a>`).join("");

    return `
      <svg class="dock__skin" aria-hidden="true">
        <defs>
          <linearGradient id="mnPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style="stop-color: var(--dock-plate-top)" />
            <stop offset="1" style="stop-color: var(--dock-plate-bottom)" />
          </linearGradient>
          <linearGradient id="mnRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style="stop-color: var(--dock-rim-a, rgba(255,255,255,.42))" />
            <stop offset=".5" style="stop-color: var(--dock-rim-b, rgba(255,255,255,.10))" />
            <stop offset="1" style="stop-color: var(--dock-rim-c, rgba(255,255,255,.04))" />
          </linearGradient>
        </defs>
        <path class="dock__fill" />
      </svg>
      <span class="dock__peek" aria-hidden="true"><b class="dock__peekTitle"></b><span class="dock__peekSub"></span></span>
      <span class="dock__bead" aria-hidden="true"><span class="dock__beadIcon"></span></span>
      <div class="tablist">${tabs}</div>`;
  }

  function mount(dock) {
    const base = dock.dataset.base || "";
    const canNavigate = dock.dataset.navigate !== "false";
    const pageId = dock.dataset.active || document.body.dataset.page;
    // halaman uji coba (inDock: false) hanya muncul di dock saat sedang dibuka
    const en = document.documentElement.lang === "en";
    const routes = (window.MENISCUS_ROUTES || [])
      .filter(r => r.inDock !== false || r.id === pageId)
      .map(r => en ? { ...r, label: r.label_en || r.label, title: r.title_en || r.title, sub: r.sub_en || r.sub } : r);
    if (!routes.length) return;
    const current = Math.max(0, routes.findIndex(r => r.id === pageId));

    dock.classList.add("dock");
    dock.style.setProperty("--tabs", routes.length);
    dock.innerHTML = template(routes, base);

    const skin = dock.querySelector(".dock__skin");
    const path = dock.querySelector(".dock__fill");
    const bead = dock.querySelector(".dock__bead");
    const beadIcon = dock.querySelector(".dock__beadIcon");
    const peek = dock.querySelector(".dock__peek");
    const peekTitle = dock.querySelector(".dock__peekTitle");
    const peekSub = dock.querySelector(".dock__peekSub");
    const tablist = dock.querySelector(".tablist");
    const tabs = [...dock.querySelectorAll(".tab")];
    const root = document.documentElement;

    tabs[current].setAttribute("aria-current", "page");

    const accents = routes.map(r => hexToRgb(r.acc));
    let centersCache = [];
    const centers = () => centersCache;

    let W = 0, H = 0;
    let x = 0, v = 0, target = 0;
    let dragging = false, scrubbing = false, dragOffset = 0;
    let suppressClick = false;
    let active = -1;
    let peekUntil = 0;
    let leaving = null;     // { href, since }
    let drawn = null;       // posisi terakhir yang digambar, untuk skip frame diam

    // shoulder dikecilkan bila socket terlalu dekat ke tepi plate,
    // lalu sudut atas plate ikut mengecil supaya garis tidak pernah berbalik arah
    function fit(s, room) {
      while (s > 2 && reach(s, RB, BY) > room - R) s -= 0.5;
      return s;
    }

    function buildPath(cx, sL, sR) {
      const top = HEAD, bot = H;
      const by = top + BY;

      sL = fit(sL, cx);
      sR = fit(sR, W - cx);
      const dL = reach(sL, RB, BY);
      const dR = reach(sR, RB, BY);
      const rl = Math.max(0, Math.min(R, cx - dL));
      const rr = Math.max(0, Math.min(R, W - cx - dR));

      // titik singgung shoulder-bowl: dari pusat shoulder menuju pusat bowl, sejauh s
      const c1x = cx - dL, c1y = top + sL;
      const c2x = cx + dR, c2y = top + sR;
      const t1x = c1x + (cx - c1x) * sL / (sL + RB);
      const t1y = c1y + (by - c1y) * sL / (sL + RB);
      const t2x = c2x + (cx - c2x) * sR / (sR + RB);
      const t2y = c2y + (by - c2y) * sR / (sR + RB);

      // kalau titik singgung di atas pusat bowl, busur bawah > 180°
      const large = (t1y < by && t2y < by) ? 1 : 0;

      return [
        `M ${rl} ${top}`,
        `L ${cx - dL} ${top}`,
        `A ${sL} ${sL} 0 0 1 ${t1x} ${t1y}`,
        `A ${RB} ${RB} 0 ${large} 0 ${t2x} ${t2y}`,
        `A ${sR} ${sR} 0 0 1 ${cx + dR} ${top}`,
        `L ${W - rr} ${top}`,
        `Q ${W} ${top} ${W} ${top + rr}`,
        `L ${W} ${bot - R}`,
        `Q ${W} ${bot} ${W - R} ${bot}`,
        `L ${R} ${bot}`,
        `Q 0 ${bot} 0 ${bot - R}`,
        `L 0 ${top + rl}`,
        `Q 0 ${top} ${rl} ${top}`,
        "Z",
      ].join(" ");
    }

    function measure() {
      const r = dock.getBoundingClientRect();
      W = r.width; H = r.height;
      skin.setAttribute("viewBox", `0 0 ${W} ${H}`);
      centersCache = tabs.map(t => tablist.offsetLeft + t.offsetLeft + t.offsetWidth / 2);
      target = centersCache[Math.max(active, 0)];
      drawn = null;
    }

    // ---- warna: interpolasi aksen sesuai posisi bead ----
    function accentAt(px) {
      const c = centers();
      if (px <= c[0]) return accents[0];
      if (px >= c[c.length - 1]) return accents[c.length - 1];
      for (let i = 0; i < c.length - 1; i++) {
        if (px <= c[i + 1]) {
          const t = (px - c[i]) / (c[i + 1] - c[i]);
          const a = accents[i], b = accents[i + 1];
          return a.map((n, k) => Math.round(n + (b[k] - n) * t));
        }
      }
    }

    function nearest(px) {
      const c = centers();
      let best = 0;
      c.forEach((cx, i) => { if (Math.abs(cx - px) < Math.abs(c[best] - px)) best = i; });
      return best;
    }

    // tampilan aktif (bead, label, peek) — belum tentu halaman yang dibuka
    function select(i, { move = true } = {}) {
      if (i === active) { if (move) target = centers()[i]; return; }
      active = i;
      tabs.forEach((t, k) => t.classList.toggle("is-active", k === i));
      beadIcon.innerHTML = tabs[i].querySelector("svg").outerHTML;
      peekTitle.textContent = routes[i].title;
      peekSub.textContent = routes[i].sub;
      if (move) target = centers()[i];
      document.dispatchEvent(new CustomEvent("meniscus:preview", { detail: { route: routes[i], index: i } }));
    }

    function go(i) {
      select(i);
      if (!canNavigate || i === current) return;
      const ev = new CustomEvent("meniscus:navigate", { cancelable: true, detail: { route: routes[i], index: i } });
      if (!document.dispatchEvent(ev)) return;
      root.classList.add("is-leaving");
      leaving = { href: tabs[i].href, since: performance.now() };
    }

    function resetToCurrent() {
      leaving = null;
      root.classList.remove("is-leaving");
      select(current);
    }

    // ---- loop render ----
    function frame(now) {
      if (!dragging || scrubbing) {
        if (reduce) { x = target; v = 0; }
        else {
          v = (v + (target - x) * K) * DAMP;
          x += v;
          if (Math.abs(target - x) < 0.05 && Math.abs(v) < 0.05) { x = target; v = 0; }
        }
      }

      if (leaving) {
        const t = now - leaving.since;
        const settled = Math.abs(target - x) < 1.5;
        if ((settled && t >= (reduce ? 120 : LEAVE_MIN)) || t >= LEAVE_MAX) {
          const href = leaving.href;
          leaving = null;
          location.assign(href);
        }
      }

      const showPeek = dragging || now < peekUntil;
      dock.classList.toggle("is-peeking", showPeek);

      const still = drawn === x && v === 0 && !dragging;
      if (!still) {
        // velocity leans the surface: trailing shoulder draws out, leading one tightens
        const vel = Math.max(-30, Math.min(30, v));
        const mag = Math.abs(vel);
        const lean = vel / 30;                       // -1..1
        const sL = S * (1 + 0.06 * mag + 0.45 * lean);
        const sR = S * (1 + 0.06 * mag - 0.45 * lean);

        path.setAttribute("d", buildPath(x, Math.max(4, sL), Math.max(4, sR)));

        // bead: ikut x, sedikit squash saat cepat
        const squash = Math.min(mag * 0.008, 0.18);
        bead.style.transform =
          `translate(${x}px, ${HEAD + BY}px) scale(${1 + squash}, ${1 - squash * 0.8})`;

        const pw = peek.offsetWidth;
        const px = Math.max(pw / 2, Math.min(W - pw / 2, x));
        peek.style.transform = `translate(${px - pw / 2}px, 0) rotate(${lean * -4}deg)`;

        const [r, g, b] = accentAt(x);
        root.style.setProperty("--acc", `rgb(${r} ${g} ${b})`);
        drawn = x;
      }

      // selama drag, tab aktif ikut berubah saat bead lewat
      if (dragging) select(nearest(x), { move: false });

      requestAnimationFrame(frame);
    }

    // ---- input: klik / keyboard ----
    tablist.addEventListener("click", e => {
      const tab = e.target.closest(".tab");
      if (!tab) return;
      if (suppressClick) { suppressClick = false; e.preventDefault(); return; }
      // ctrl/cmd/shift-klik tetap buka tab baru seperti link biasa
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      go(+tab.dataset.i);
    }, true);

    dock.addEventListener("keydown", e => {
      const keys = { ArrowRight: 1, ArrowLeft: -1, Home: "first", End: "last" };
      if (!(e.key in keys)) return;
      const k = keys[e.key];
      const n = k === "first" ? 0 : k === "last" ? tabs.length - 1
        : (active + k + tabs.length) % tabs.length;
      select(n); tabs[n].focus();
      peekUntil = performance.now() + 1400;
      e.preventDefault();
    });

    // fokus keluar dari dock tanpa memilih -> kembali ke halaman aktif
    dock.addEventListener("focusout", e => {
      if (!dock.contains(e.relatedTarget) && !leaving) select(current);
    });

    // ---- input: drag bead ----
    function pointerX(e) {
      const left = dock.getBoundingClientRect().left;
      const c = centers();
      return Math.max(c[0], Math.min(c[c.length - 1], e.clientX - left));
    }

    let lastT = 0;
    bead.addEventListener("pointerdown", e => {
      if (leaving) return;
      dragging = true; scrubbing = false;
      bead.setPointerCapture(e.pointerId);
      const left = dock.getBoundingClientRect().left;
      dragOffset = e.clientX - left - x;
      lastT = performance.now();
      dock.classList.add("is-dragging");
    });

    bead.addEventListener("pointermove", e => {
      if (!dragging || scrubbing) return;
      const left = dock.getBoundingClientRect().left;
      const c = centers();
      const nx = Math.max(c[0], Math.min(c[c.length - 1], e.clientX - left - dragOffset));
      const now = performance.now();
      // kecepatan dalam px/frame (~16ms) supaya konsisten dgn spring
      v = (nx - x) / Math.max(1, now - lastT) * 16;
      x = nx; lastT = now;
    });

    // ---- input: geser (scrub) di sepanjang bar — bead mengejar pointer dengan spring ----
    let downX = null;
    tablist.addEventListener("pointerdown", e => {
      if (leaving || e.button !== 0) return;
      downX = e.clientX;
    });
    tablist.addEventListener("pointermove", e => {
      if (downX === null) return;
      if (!dragging && Math.abs(e.clientX - downX) > 8) {
        dragging = true; scrubbing = true;
        tablist.setPointerCapture(e.pointerId);
        dock.classList.add("is-dragging");
      }
      if (scrubbing) target = pointerX(e);
    });

    const endDrag = () => {
      downX = null;
      if (!dragging) return;
      if (scrubbing) suppressClick = true;
      dragging = false; scrubbing = false;
      dock.classList.remove("is-dragging");
      go(nearest(x));
      target = centers()[active];
      // klik "hantu" setelah scrub tidak selalu terjadi; jangan biarkan flag menggantung
      setTimeout(() => { suppressClick = false; }, 0);
    };
    [bead, tablist].forEach(el => {
      el.addEventListener("pointerup", endDrag);
      el.addEventListener("pointercancel", endDrag);
    });

    new ResizeObserver(() => { measure(); x = target; }).observe(dock);

    // kembali lewat tombol back (bfcache): pulihkan halaman yang sempat "pergi"
    addEventListener("pageshow", e => { if (e.persisted) resetToCurrent(); });

    // warna halaman aktif langsung terpasang sebelum frame pertama
    root.style.setProperty("--acc", routes[current].acc);
    root.dataset.accent = routes[current].id;

    measure();
    select(current);
    x = target;
    requestAnimationFrame(frame);
  }

  document.querySelectorAll("[data-meniscus]").forEach(mount);
  window.Meniscus = { mount };
})();
