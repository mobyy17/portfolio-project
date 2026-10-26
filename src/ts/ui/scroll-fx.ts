// Efek scroll dengan Motion: judul menjauh, kata raksasa bergeser, garis label tergambar,
// pita logo terdorong kecepatan scroll. Semua mati bila "kurangi animasi" aktif.
import { animate, scroll } from "motion";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initScrollFx(pageTitle: string) {
  if (reduce) return;
  const page = document.querySelector<HTMLElement>(".page");
  if (!page) return;

  // 1) judul halaman perlahan menjauh & memudar saat dilewati
  const head = document.querySelector<HTMLElement>(".page-head, .hero-intro");
  if (head) {
    scroll(
      animate(head, { y: [0, -90], opacity: [1, 0.2] }, { ease: "linear" }),
      { target: head, offset: ["start 90px", "end start"] },
    );
  }

  // 2) kata raksasa bergaris tepi di belakang konten, bergeser horizontal sepanjang halaman
  const word = document.createElement("div");
  word.className = "scroll-word";
  word.setAttribute("aria-hidden", "true");
  word.textContent = pageTitle;
  page.prepend(word);
  scroll(animate(word, { x: ["8%", "-38%"] }, { ease: "linear" }));

  // 3) garis di bawah label section tergambar saat masuk layar
  document.querySelectorAll<HTMLElement>(".section-label").forEach(label => {
    scroll((p: number) => label.style.setProperty("--line-p", p.toFixed(3)), {
      target: label,
      offset: ["start end", "start 60%"],
    });
  });

  // 4) kecepatan scroll diteruskan ke pita logo Skill (ikut terdorong saat halaman di-scroll)
  if (document.querySelector(".marquee")) {
    scroll((_progress: number, info: { y: { velocity: number } }) => {
      document.dispatchEvent(new CustomEvent("fx:velocity", { detail: info.y.velocity }));
    });
  }
}
