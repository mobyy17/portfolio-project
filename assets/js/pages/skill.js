// Halaman 04 — Skill: pita logo yang bisa digeser + grup frontend / backend / desain / bahasa
import { chip, skillGroup } from "../ui/components.js";
import { mountMarquee } from "../ui/marquee.js";
import { allSkills } from "../core/selectors.js";

// lebar kolom bento (grid 6 kolom) mengikuti urutan kategori
const VARIANTS = ["", "", "skill-group--third", "skill-group--twothird"];

export function render(data, root) {
  const groups = (data.skill || []).filter(g => Array.isArray(g.items));
  root.innerHTML = `
    <div class="marquee" aria-hidden="true" data-reveal></div>
    <div class="skill-groups" data-stagger="100">
      ${groups.map((g, i) => skillGroup(g, VARIANTS[i] || "")).join("")}
    </div>`;

  mountMarquee(root.querySelector(".marquee"), allSkills(data).map(chip).join(""));
}
