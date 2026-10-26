// Halaman 05 — Proyek
import { esc, projectCard } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { projects } from "../core/selectors.js";
import { t } from "../core/i18n.js";

export function render(data, root) {
  const list = projects(data);
  const github = (data.kontak || []).find(k => k.icon === "github");

  root.innerHTML = `
    <div class="projects" data-stagger="110">
      ${list.map(projectCard).join("")}
      ${github ? `
        <a class="card project project--more" href="${esc(github.url)}" target="_blank" rel="noopener noreferrer" data-tilt="4">
          <span class="door__icon">${icon.plus}</span>
          <h2 class="project__title">${t("proj.more.title")}</h2>
          <p class="project__desc">${t("proj.more.desc")}</p>
          <span class="door__meta" style="margin-top:8px">${esc(github.label)} ${icon.arrowUpRight}</span>
        </a>` : ""}
    </div>`;
}
