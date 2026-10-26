// BOOTSTRAP — menyambungkan layer: data -> page -> UI/motion.
// Halaman aktif ditentukan oleh <body data-page="...">.
// Modul yang memakai Motion (Framer Motion, dari CDN via import map) dimuat dinamis,
// jadi kalau CDN gagal, halaman tetap tampil tanpa efek tambahan.
import { loadData } from "./core/data.js";
import { initTheme } from "./ui/theme.js";
import { initAtmosphere, initReveal, initPointerFx } from "./ui/motion.js";
import { t, localize, applyStatic, initLangSwitch, restoreScroll } from "./core/i18n.js";

const PAGES = {
  home: () => import("./pages/home.js"),
  pendidikan: () => import("./pages/pendidikan.js"),
  organisasi: () => import("./pages/organisasi.js"),
  skill: () => import("./pages/skill.js"),
  proyek: () => import("./pages/proyek.js"),
  kontak: () => import("./pages/kontak.js"),
  musik: () => import("./pages/musik.js"), // ongoing — TypeScript, lihat src/ts/pages/musik.ts
};

const root = document.documentElement;
const pageId = document.body.dataset.page;
const content = document.getElementById("content");
// label halaman dalam bahasa aktif (title_en, sub_en, ... saat English)
const routes = localize(window.MENISCUS_ROUTES || []);
window.MENISCUS_ROUTES_LOCAL = routes;
const route = routes.find(r => r.id === pageId);

// teks statis HTML diterjemahkan sebelum judul dipecah per huruf
applyStatic();
document.title = `${route?.title || ""} · Muhammad Rafiif Ansyadya`;
initLangSwitch();
initTheme();
const refreshScroll = initAtmosphere();
document.getElementById("tahun").textContent = new Date().getFullYear();

// judul statis langsung beranimasi selagi data dimuat
initReveal();
root.classList.add("ready");

let data = null;
try {
  const [d, page] = await Promise.all([loadData(), (PAGES[pageId] || PAGES.home)()]);
  data = localize(d);
  page.render(data, content);
} catch (err) {
  console.error(err);
  content.innerHTML = `<p class="notice">${t("load.fail")}</p>`;
}

root.classList.add("content-ready");
initReveal(content);
initPointerFx();
refreshScroll();
restoreScroll();

// ---- lapisan efek Motion (opsional) ----
const word = pageId === "home" ? "RAFIIF" : (route?.title || "").toUpperCase();
import("./ui/scroll-fx.js").then(m => m.initScrollFx(word)).catch(err => console.warn("Efek scroll dilewati:", err));
import("./ui/bizarre.js").then(m => m.initBizarre(routes, pageId)).catch(err => console.warn("Tema Bizarre's dilewati:", err));

// tombol "Hire me?" di halaman mana pun
const hireTriggers = document.querySelectorAll("[data-hire]");
if (hireTriggers.length && data?.profil?.email) {
  import("./ui/hire-form.js")
    .then(m => m.mountHireMe(hireTriggers, data.profil.email))
    .catch(err => {
      // tanpa Motion: tombol tetap berguna sebagai link email biasa
      console.warn("Form Hire me dilewati:", err);
      hireTriggers.forEach(t => t.setAttribute("href", `mailto:${data.profil.email}`));
    });
}
