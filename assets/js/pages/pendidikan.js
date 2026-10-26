// Halaman 02 — Pendidikan
import { eduItem } from "../ui/components.js";

export function render(data, root) {
  const list = data.pendidikan || [];
  root.innerHTML = `
    <div class="timeline">
      <div class="timeline__rail" aria-hidden="true"><div class="timeline__fill"></div></div>
      ${list.map(eduItem).join("")}
    </div>`;
}
