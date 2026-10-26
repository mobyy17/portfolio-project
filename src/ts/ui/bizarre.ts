// Tema "Bizarre's" — penghormatan samar untuk JoJo's Bizarre Adventure.
// Sengaja tipis: orang awam melihat ornamen, penggemar mengenali referensinya.
import { animate, inView, scroll, stagger } from "motion";
import { t } from "../core/i18n.js";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Route { id: string; href: string; title: string; inDock?: boolean }

/** Aura "ゴゴゴ" (menacing) melayang di samping judul halaman */
function menacing() {
  const host = document.querySelector<HTMLElement>(".page-head, .hero-intro");
  if (!host) return;
  const aura = document.createElement("div");
  aura.className = "menacing";
  aura.setAttribute("aria-hidden", "true");
  aura.innerHTML = Array.from({ length: 4 }, (_, i) => `<span style="--i:${i}">ゴ</span>`).join("");
  host.append(aura);
  if (reduce) return;

  const glyphs = aura.querySelectorAll<HTMLElement>("span");
  animate(glyphs, { opacity: [0, 1] }, { delay: stagger(0.25, { startDelay: 1.2 }), duration: 0.8 });
  glyphs.forEach((g, i) => {
    animate(g,
      { y: [0, -10, 0], rotate: [-6 + i * 3, 4 - i * 2, -6 + i * 3], scale: [1, 1.08, 1] },
      { duration: 2.4 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 });
  });
  // aura menguat saat judul disorot mouse
  host.addEventListener("pointerenter", () => aura.classList.add("is-tense"));
  host.addEventListener("pointerleave", () => aura.classList.remove("is-tense"));
  scroll(animate(aura, { y: [0, 140] }, { ease: "linear" }), { target: host, offset: ["start start", "end start"] });
}

/** Panah "To Be Continued" di ujung halaman — sekaligus tombol ke halaman berikutnya */
function toBeContinued(routes: Route[], pageId: string) {
  const foot = document.querySelector<HTMLElement>(".foot");
  if (!foot || routes.length < 2) return;
  const i = routes.findIndex(r => r.id === pageId);
  const next = routes[(i + 1) % routes.length];

  const link = document.createElement("a");
  link.className = "tbc";
  link.href = next.href;
  link.setAttribute("aria-label", t("tbc.aria", { title: next.title }));
  link.innerHTML = `<span class="tbc__arrow"><span class="tbc__text">To Be Continued</span></span><span class="tbc__next">${next.title}</span>`;
  foot.prepend(link);

  link.addEventListener("click", e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    document.documentElement.classList.add("is-leaving");
    setTimeout(() => location.assign(link.href), reduce ? 0 : 320);
  });

  if (reduce) return;
  link.style.opacity = "0";
  inView(link, () => {
    animate(link, { opacity: [0, 1], x: [-160, 0], skewX: [-12, 0] }, { type: "spring", bounce: 0.35, visualDuration: 0.6 });
  }, { amount: 0.6 });
}

export function initBizarre(routes: Route[], pageId: string) {
  document.documentElement.dataset.flavor = "bizarre";
  menacing();
  toBeContinued(routes.filter(r => r.inDock !== false), pageId);
}
