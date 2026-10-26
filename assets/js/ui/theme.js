// Mode tampilan: "auto" (ikuti setting light/dark perangkat pengunjung), "light", atau "dark".
// Tombol berputar auto -> light -> dark -> auto. Tema awal dipasang di <head> agar tidak berkedip.
import { t } from "../core/i18n.js";

const ORDER = ["auto", "light", "dark"];
const LABEL = pref => t(`theme.${pref}`);

export function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const media = matchMedia("(prefers-color-scheme: dark)");

  const readPref = () => {
    try {
      const v = localStorage.getItem("tema");
      return v === "light" || v === "dark" ? v : "auto";
    } catch { return "auto"; }
  };
  const resolve = pref => (pref === "auto" ? (media.matches ? "dark" : "light") : pref);

  let pref = readPref();

  function apply() {
    root.setAttribute("data-theme", resolve(pref));
    root.setAttribute("data-theme-pref", pref);
    if (btn) {
      const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
      btn.setAttribute("aria-label", t("theme.aria", { cur: LABEL(pref), next: LABEL(next) }));
    }
  }

  // pergantian tema: crossfade lembut seluruh halaman (View Transitions bila didukung)
  function applyAnimated() {
    const willChange = root.getAttribute("data-theme") !== resolve(pref);
    if (willChange && document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-swapping");
      document.startViewTransition(apply).finished.finally(() => root.classList.remove("theme-swapping"));
    } else apply();
  }

  apply();

  btn?.addEventListener("click", () => {
    pref = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    try {
      if (pref === "auto") localStorage.removeItem("tema");
      else localStorage.setItem("tema", pref);
    } catch {}
    applyAnimated();
  });

  // mode otomatis: ikut berubah langsung saat setting perangkat diganti
  media.addEventListener("change", () => { if (pref === "auto") applyAnimated(); });

  // sinkron antar tab yang terbuka
  addEventListener("storage", e => {
    if (e.key === "tema") { pref = readPref(); apply(); }
  });
}
