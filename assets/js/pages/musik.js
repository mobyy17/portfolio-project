// Halaman 07 — Musik (ONGOING). Sengaja berdiri sendiri & defensif:
// kalau datanya kosong atau belum lengkap, halaman tetap tampil dengan slot placeholder.
import { animate, stagger } from "motion";
import { t } from "../core/i18n.js";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const icon = {
    play: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 5 9 12l10 7zM5 5v14"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 5 10 7-10 7zM19 5v14"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>',
};
const slot = (what, path) => `<div class="slot"><b>${t("music.slot")}</b><span>${what}: ${t("music.slot.fill")} <code>data/portfolio.json</code> → <code>${path}</code></span></div>`;
// hanya izinkan embed resmi Spotify
const safeEmbed = (url) => (url && /^https:\/\/open\.spotify\.com\/embed\//.test(url) ? url : "");
export function render(data, root) {
    const m = data.musik ?? {};
    const lagu = (m.lagu ?? []).filter(l => l && l.judul);
    const artis = (m.artis ?? []).filter(a => a && a.nama);
    const genre = (m.genre ?? []).filter(Boolean);
    const embed = safeEmbed(m.spotify_embed);
    root.innerHTML = `
    <div class="ongoing" data-reveal>
      <span class="ongoing__tape" aria-hidden="true"></span>
      <span class="ongoing__body">${icon.wrench}<span><b>Ongoing</b> — ${esc(m.catatan || t("music.ongoing"))}</span></span>
    </div>

    <section class="music-hero" aria-label="${t("music.player")}">
      <div class="vinyl-wrap" data-reveal="scale">
        <div class="vinyl" tabindex="0" role="img" aria-label="${t("music.vinyl")}">
          <div class="vinyl__label"><img src="assets/icons/logo.svg" alt=""></div>
        </div>
        <span class="tonearm" aria-hidden="true"></span>
      </div>

      <div class="card now" data-reveal style="--d:120">
        <span class="crumb">${t("music.now")}</span>
        <h2 class="now__title" aria-live="polite">${lagu.length ? esc(lagu[0].judul) : t("music.none")}</h2>
        <p class="now__artist">${lagu.length ? esc(lagu[0].artis) : t("music.none.sub")}</p>
        <div class="eq" aria-hidden="true">${Array.from({ length: 18 }, () => "<i></i>").join("")}</div>
        <div class="now__ctrl">
          <button class="round-btn" type="button" data-step="-1" aria-label="${t("music.prev")}" ${lagu.length < 2 ? "disabled" : ""}>${icon.prev}</button>
          <button class="round-btn round-btn--big" type="button" data-toggle aria-label="${t("music.pause")}">${icon.pause}</button>
          <button class="round-btn" type="button" data-step="1" aria-label="${t("music.next")}" ${lagu.length < 2 ? "disabled" : ""}>${icon.next}</button>
        </div>
        <p class="now__hint">${t("music.hint")}</p>
      </div>
    </section>

    <h2 class="section-label" data-reveal>${t("music.genres")}</h2>
    <div class="chips music-genres">${genre.length ? genre.map(g => `<span class="chip">${esc(g)}</span>`).join("") : slot("Genre", "musik.genre")}</div>

    <h2 class="section-label" data-reveal>${t("music.artists")}</h2>
    <div class="artists" data-stagger="70">
      ${artis.length
        ? artis.map((a, i) => `
          <${a.link ? `a href="${esc(a.link)}" target="_blank" rel="noopener noreferrer"` : "div"} class="card artist" data-tilt="5">
            <span class="artist__rank">${String(i + 1).padStart(2, "0")}</span>
            <span class="artist__name">${esc(a.nama)}</span>
            ${a.genre ? `<span class="pill">${esc(a.genre)}</span>` : ""}
          </${a.link ? "a" : "div"}>`).join("")
        : slot("Artis", "musik.artis") + slot("Artis", "musik.artis") + slot("Artis", "musik.artis")}
    </div>

    <h2 class="section-label" data-reveal>${t("music.playlist")}</h2>
    ${embed
        ? `<iframe class="playlist" data-reveal src="${esc(embed)}" height="380" loading="lazy" title="Playlist Spotify"
           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
        : slot("Playlist Spotify", "musik.spotify_embed (link embed open.spotify.com/embed/…)")}`;
    mountPlayer(root, lagu);
}
function mountPlayer(root, lagu) {
    const vinyl = root.querySelector(".vinyl");
    const toggle = root.querySelector("[data-toggle]");
    const title = root.querySelector(".now__title");
    const artist = root.querySelector(".now__artist");
    const bars = [...root.querySelectorAll(".eq i")];
    let playing = !reduce;
    let angle = 0, speed = 0, idx = 0;
    const BASE = 1.2; // derajat per frame saat berputar normal
    /* ---- equalizer (Motion, berulang) ---- */
    const eqAnims = reduce ? [] : bars.map((b, i) => animate(b, { scaleY: [0.2, 0.4 + Math.random() * 0.6, 0.25, 0.9 * Math.random() + 0.1, 0.2] }, { duration: 1.1 + (i % 5) * 0.17, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }));
    function setPlaying(p) {
        playing = p;
        toggle.innerHTML = p ? icon.pause : icon.play;
        toggle.setAttribute("aria-label", p ? t("music.pause") : t("music.play"));
        vinyl.closest(".vinyl-wrap").classList.toggle("is-playing", p);
        eqAnims.forEach(a => (p ? a.play() : a.pause()));
    }
    toggle.addEventListener("click", () => setPlaying(!playing));
    root.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", async () => {
        if (lagu.length < 2)
            return;
        idx = (idx + Number(b.dataset.step) + lagu.length) % lagu.length;
        speed += Number(b.dataset.step) * 18; // piringan "terlempar" sedikit saat ganti lagu
        if (!reduce)
            await animate([title, artist], { opacity: 0, y: -8 }, { duration: 0.15 });
        title.textContent = lagu[idx].judul;
        artist.textContent = lagu[idx].artis ?? "";
        if (!reduce)
            animate([title, artist], { opacity: [0, 1], y: [8, 0] }, { delay: stagger(0.06), duration: 0.3 });
    }));
    /* ---- piringan: berputar + bisa diseret (scratch) dengan inersia ---- */
    let dragging = false, lastA = 0, lastT = 0;
    const center = () => {
        const r = vinyl.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const pointerAngle = (e) => {
        const c = center();
        return (Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180) / Math.PI;
    };
    vinyl.addEventListener("pointerdown", e => {
        dragging = true;
        lastA = pointerAngle(e);
        lastT = performance.now();
        vinyl.setPointerCapture(e.pointerId);
        vinyl.classList.add("is-scratching");
    });
    vinyl.addEventListener("pointermove", e => {
        if (!dragging)
            return;
        const a = pointerAngle(e);
        let d = a - lastA;
        if (d > 180)
            d -= 360;
        if (d < -180)
            d += 360;
        const now = performance.now();
        speed = (d / Math.max(1, now - lastT)) * 16;
        angle += d;
        lastA = a;
        lastT = now;
    });
    const end = () => { dragging = false; vinyl.classList.remove("is-scratching"); };
    vinyl.addEventListener("pointerup", end);
    vinyl.addEventListener("pointercancel", end);
    // keyboard: panah kiri/kanan memutar manual
    vinyl.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") {
            speed += 10;
            e.preventDefault();
        }
        if (e.key === "ArrowLeft") {
            speed -= 10;
            e.preventDefault();
        }
    });
    const frame = () => {
        if (!dragging) {
            const cruise = playing ? BASE : 0;
            speed += (cruise - speed) * 0.04;
            angle += speed;
        }
        vinyl.style.transform = `rotate(${angle}deg)`;
        if (vinyl.isConnected)
            requestAnimationFrame(frame);
    };
    setPlaying(playing);
    requestAnimationFrame(frame);
}
