// Halaman 01 — Biodata (muka website)
import { esc, door, socialLink } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { mountPhotoStack } from "../ui/photo-stack.js";
import { copyText } from "../ui/toast.js";
import { stats, routeSummaries } from "../core/selectors.js";
import { t } from "../core/i18n.js";

function nameMarkup(nama) {
  const words = esc(nama).split(" ");
  const last = words.pop();
  return `${words.join(" ")} <span class="accent">${last}</span>`;
}

function bioRows(p) {
  const rows = [
    [t("bio.name"), esc(p.nama)],
    [t("bio.major"), `${esc(p.prodi)}<span class="sub">${esc(p.fakultas)}</span>`],
    [t("bio.univ"), `${esc(p.universitas)}<span class="sub">${t("bio.class", { year: esc(p.tahun_masuk) })}</span>`],
    [t("bio.gpa"), `${esc(p.ipk)} <span class="sub">${t("bio.gpa.of")}</span>`],
    [t("bio.domicile"), esc(p.lokasi)],
    [t("bio.email"), `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a><button class="copy-btn" type="button" data-copy="${esc(p.email)}">${t("bio.copy")}</button>`],
  ];
  return rows
    .filter(([, v]) => v && !v.startsWith("<span"))
    .map(([k, v]) => `<div class="bio-row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
}

export function render(data, root) {
  const p = data.profil;
  const s = stats(data);
  const summaries = routeSummaries(data);
  const routes = (window.MENISCUS_ROUTES_LOCAL || window.MENISCUS_ROUTES || []).filter(r => r.id !== "home");

  root.innerHTML = `
    <section class="bio-hero" aria-label="${t("home.intro.aria")}">
      <div class="photo-stack" id="photo-stack" tabindex="0" role="group"
           aria-roledescription="carousel" aria-label="${t("home.photos.aria", { name: esc(p.nama) })}" data-reveal="scale"></div>

      <div class="hero-intro">
        <div class="status" data-reveal style="--d:100"><span class="status__dot" aria-hidden="true"></span>${t("home.status")}</div>
        <p class="hero-hello" data-reveal style="--d:160">${t("home.hello")}</p>
        <h1 class="hero-name" data-split>${nameMarkup(p.nama)}</h1>
        <p class="hero-role" data-reveal style="--d:450">${esc(p.jabatan)}</p>
        <p class="hero-bio" data-reveal style="--d:550">${esc(p.bio)}</p>
        <div class="hero-cta" data-reveal style="--d:650">
          <a class="btn btn--acc" href="proyek.html" data-magnetic>${t("home.cta.projects")} <span class="arrow">${icon.arrow}</span></a>
          <a class="btn btn--hire" href="kontak.html" data-hire data-magnetic><span class="hire-dot" aria-hidden="true"></span>Hire me?</a>
        </div>
        <div class="socials" data-stagger="70">${(data.kontak || []).map(socialLink).join("")}</div>
      </div>
    </section>

    <h2 class="section-label" data-reveal>${t("home.biodata")}</h2>
    <div class="bio-layout">
      <div class="card biodata" data-reveal="left"><dl>${bioRows(p)}</dl></div>
      <div class="stats" data-stagger="90">
        <div class="card stat" data-tilt="6"><span class="stat__val" data-count="${esc(s.ipk)}">0</span><span class="stat__label">${t("stat.gpa")}</span></div>
        <div class="card stat" data-tilt="6"><span class="stat__val" data-count="${s.organisasi}">0</span><span class="stat__label">${t("stat.org")}</span></div>
        <div class="card stat" data-tilt="6"><span class="stat__val" data-count="${s.skill}">0</span><span class="stat__label">${t("stat.skill")}</span></div>
        <div class="card stat" data-tilt="6"><span class="stat__val" data-count="${s.prestasi}">0</span><span class="stat__label">${t("stat.awards")}</span></div>
        <div class="card stat stat--wide" data-tilt="3">
          <span class="stat__label" style="margin:0">${t("stat.focus")}</span>
          <div class="focus-tags">${(p.minat || []).map(m => `<span class="pill pill--acc">${esc(m)}</span>`).join("")}</div>
        </div>
      </div>
    </div>

    <h2 class="section-label" data-reveal>${t("home.explore")} <span class="count">${t("home.pages", { n: routes.length })}</span></h2>
    <div class="doors" data-stagger="80">
      ${routes.map((r, i) => door(r, i + 2, summaries[r.id])).join("")}
    </div>`;

  mountPhotoStack(root.querySelector("#photo-stack"), (p.foto || []).filter(Boolean), p.nama);

  root.querySelectorAll("[data-copy]").forEach(b =>
    b.addEventListener("click", () => copyText(b.dataset.copy, t("copied.email"))));
}
