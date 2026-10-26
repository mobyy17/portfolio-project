// UI LAYER — komponen murni: data masuk, string HTML keluar.
import { icon, socialIcon, orgAvatar } from "./icons.js";
import { t } from "../core/i18n.js";

export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

const external = url => /^https?:/.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";

/* ---------- pintu ke halaman lain ---------- */
export function door(route, num, summary) {
  return `
    <a class="card door" href="${esc(route.href)}" data-tilt="5" style="--acc:${route.acc}">
      <div class="door__top">
        <span class="door__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${route.icon}</svg></span>
        ${route.badge ? `<span class="pill pill--acc door__badge">${esc(route.badge)}</span>` : `<span class="door__num">${String(num).padStart(2, "0")}</span>`}
      </div>
      <h3 class="door__title">${esc(route.title)}</h3>
      <p class="door__desc">${esc(route.sub)}</p>
      <div class="door__meta"><span>${esc(summary || t("door.open"))}</span>${icon.arrow}</div>
    </a>`;
}

/* ---------- pendidikan ---------- */
export function eduItem(edu) {
  const prestasi = Array.isArray(edu.prestasi) && edu.prestasi.length
    ? `<div class="achievements">
         <h4>Prestasi & penghargaan</h4>
         <ul>${edu.prestasi.map(p => `<li>${icon.trophy}<span>${esc(p)}</span></li>`).join("")}</ul>
       </div>`
    : "";
  return `
    <div class="tl-item" data-reveal>
      <span class="tl-item__dot" aria-hidden="true"></span>
      <article class="card" data-tilt="2">
        <div class="tl-card__head">
          ${edu.logo ? `<img class="tl-card__logo" src="${esc(edu.logo)}" alt="" width="56" height="56" loading="lazy" onerror="this.remove()">` : ""}
          <div class="tl-card__main">
            <h2 class="tl-card__title">${esc(edu.institusi)}</h2>
            <div class="tl-card__role">${esc(edu.gelar)}</div>
          </div>
          <span class="pill pill--acc">${esc(edu.periode)}</span>
        </div>
        <div class="tl-card__meta">
          ${edu.ipk ? `<span class="pill">${esc(edu.ipk)}</span>` : ""}
          ${edu.lokasi ? `<span class="pill">${icon.pin.replace("<svg", '<svg width="14" height="14"')}${esc(edu.lokasi)}</span>` : ""}
        </div>
        ${edu.deskripsi ? `<p class="tl-card__desc">${esc(edu.deskripsi)}</p>` : ""}
        ${prestasi}
      </article>
    </div>`;
}

/* ---------- organisasi ---------- */
export function orgCard(org) {
  const period = org.durasi ? `${org.periode} · ${org.durasi}` : org.periode;
  const roles = Array.isArray(org.roles) && org.roles.length
    ? `<div class="subroles">${org.roles.map(r => `
        <div class="subrole">
          <div class="subrole__head">
            <span class="subrole__role">${esc(r.posisi)}</span>
            <span class="subrole__period">${esc(r.periode)}${r.durasi ? " · " + esc(r.durasi) : ""}</span>
          </div>
          ${r.tipe ? `<span class="pill" style="margin-top:6px">${esc(r.tipe)}</span>` : ""}
          ${r.deskripsi ? `<p>${esc(r.deskripsi)}</p>` : ""}
        </div>`).join("")}</div>`
    : "";
  return `
    <article class="card org-card" data-tilt="3">
      ${orgAvatar(org.icon, org.nama, org.logo)}
      <div class="org-card__body">
        <h3 class="org-card__name">${esc(org.nama)}</h3>
        ${org.posisi ? `<div class="org-card__role">${esc(org.posisi)}</div>` : ""}
        <div class="org-card__meta">
          ${period ? `<span class="pill pill--acc">${esc(period)}</span>` : ""}
          ${org.tipe ? `<span class="pill">${esc(org.tipe)}</span>` : ""}
          ${org.lokasi ? `<span class="pill">${esc(org.lokasi)}</span>` : ""}
        </div>
        ${org.deskripsi ? `<p class="org-card__desc">${esc(org.deskripsi)}</p>` : ""}
        ${roles}
      </div>
    </article>`;
}

/* ---------- skill ---------- */
export function chip(s) {
  const initials = esc((s.nama || "?").slice(0, 2));
  // logo gagal dimuat -> ganti badge inisial, jadi tidak pernah "kosong"
  const logo = s.logo
    ? `<img src="${esc(s.logo)}" alt="" width="26" height="26" loading="lazy" ${s.mono ? "data-mono" : ""}
         onerror="this.outerHTML='<span class=&quot;chip__fallback&quot;>${initials}</span>'">`
    : `<span class="chip__fallback">${initials}</span>`;
  const note = s.catatan ? ` title="${esc(s.catatan)}"` : "";
  return `<span class="chip" data-magnetic="0.25"${note}>${logo}<span>${esc(s.nama)}</span></span>`;
}

const GROUP_ICON = { frontend: icon.monitor, backend: icon.server, design: icon.pen, language: icon.code };

export function skillGroup(group, variant = "") {
  return `
    <section class="card skill-group ${variant}" data-tilt="2" aria-labelledby="sg-${esc(group.id)}">
      <div class="skill-group__head">
        <span class="skill-group__icon">${GROUP_ICON[group.icon] || icon.code}</span>
        <div>
          <h2 class="skill-group__title" id="sg-${esc(group.id)}">${esc(group.kategori)} <span class="pill">${group.items.length}</span></h2>
          ${group.deskripsi ? `<p class="skill-group__desc">${esc(group.deskripsi)}</p>` : ""}
        </div>
      </div>
      <div class="chips">${group.items.map(chip).join("")}</div>
    </section>`;
}

/* ---------- proyek ---------- */
// pola grid dekoratif — diturunkan dari judul supaya tiap proyek punya pola sendiri
function pattern(seed) {
  let h = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return Array.from({ length: 21 }, () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return `<span class="${(h >>> 16) % 4 === 0 ? "on" : ""}"></span>`;
  }).join("");
}

export function projectCard(p, i) {
  return `
    <article class="card project" data-tilt="4">
      <div class="project__visual" aria-hidden="true"><div class="project__grid">${pattern(p.judul)}</div></div>
      <div class="project__head">
        <h2 class="project__title">${esc(p.judul)}</h2>
        <span class="pill pill--acc">${esc(p.tanggal || String(i + 1).padStart(2, "0"))}</span>
      </div>
      <p class="project__desc">${esc(p.deskripsi)}</p>
      ${Array.isArray(p.tools) ? `<div class="project__tags">${p.tools.map(t => `<span class="pill">${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="project__links">
        ${p.link_github ? `<a class="btn" href="${esc(p.link_github)}"${external(p.link_github)} data-magnetic>${socialIcon("github")}Repository</a>` : ""}
        ${p.link_demo ? `<a class="btn btn--acc" href="${esc(p.link_demo)}"${external(p.link_demo)} data-magnetic>Live demo ${icon.arrowUpRight}</a>` : ""}
      </div>
    </article>`;
}

/* ---------- kontak ---------- */
export function contactCard(k) {
  const isMail = /^mailto:/.test(k.url);
  // kartu email membuka form pesan (data-hire); tanpa JS tetap jadi link mailto
  return `
    <a class="card contact-card" href="${esc(k.url)}"${external(k.url)}${isMail ? " data-hire" : ""} data-tilt="6">
      <span class="contact-card__icon ci-${esc(k.icon)}">${socialIcon(k.icon)}</span>
      <div>
        <div class="contact-card__platform">${isMail ? t("contact.email") : esc(k.platform)}</div>
        <div class="contact-card__label">${esc(k.label).replace("@", "<wbr>@")}</div>
      </div>
      <div class="contact-card__go"><span>${isMail ? t("contact.write") : t("contact.visit")}</span>${icon.arrowUpRight}</div>
    </a>`;
}

export function socialLink(k) {
  return `<a href="${esc(k.url)}"${external(k.url)} aria-label="${esc(k.platform)}" title="${esc(k.platform)}" data-magnetic="0.4">${socialIcon(k.icon)}</a>`;
}
