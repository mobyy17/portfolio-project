// Halaman 03 — Organisasi & pengalaman, dengan filter yang pill-nya bisa digeser
import { esc, orgCard } from "../ui/components.js";
import { icon } from "../ui/icons.js";
import { orgLists } from "../core/selectors.js";
import { replay } from "../ui/motion.js";
import { t } from "../core/i18n.js";

const GROUPS = [
  { id: "kuliah", title: "org.group.uni", inst: "Institut Teknologi Bandung", icon: icon.cap, logo: "assets/images/organisasi/itb.webp" },
  { id: "sma", title: "org.group.hs", inst: "SMA Islam PB. Soedirman 1 Kota Bekasi", icon: icon.school, logo: "assets/images/organisasi/soedirman.webp" },
];

export function render(data, root) {
  const lists = orgLists(data);
  const total = lists.kuliah.length + lists.sma.length;
  const filters = [
    { id: "all", label: t("org.all"), n: total },
    ...GROUPS.map(g => ({ id: g.id, label: g.id === "kuliah" ? t("org.uni") : t("org.hs"), n: lists[g.id].length })),
  ];

  root.innerHTML = `
    <div class="org-toolbar" data-reveal>
      <div class="seg" role="group" aria-label="${t("org.filter.aria")}">
        <span class="seg__pill" aria-hidden="true"></span>
        ${filters.map((f, i) => `
          <button class="seg__btn" type="button" data-filter="${f.id}" aria-pressed="${i === 0}">
            ${f.label} <span class="n">${f.n}</span>
          </button>`).join("")}
      </div>
      <span class="pill">${t("org.drag")}</span>
    </div>
    ${GROUPS.filter(g => lists[g.id].length).map(g => `
      <section class="org-group" data-cat="${g.id}" aria-labelledby="og-${g.id}">
        <div class="org-group__head" data-reveal>
          <span class="org-group__icon${g.logo ? " org-group__icon--logo" : ""}">${g.logo
            ? `<img src="${g.logo}" alt="" width="44" height="44"
                 onerror="const b=this.parentNode;b.classList.remove('org-group__icon--logo');b.innerHTML=b.querySelector('template').innerHTML"><template>${g.icon}</template>`
            : g.icon}</span>
          <div>
            <h2 class="org-group__title" id="og-${g.id}">${esc(t(g.title))}</h2>
            <span class="org-group__inst">${esc(g.inst)} · ${t("org.count", { n: lists[g.id].length })}</span>
          </div>
        </div>
        <div class="org-grid" data-stagger="70">${lists[g.id].map(orgCard).join("")}</div>
      </section>`).join("")}`;

  initFilter(root);
}

function initFilter(root) {
  const seg = root.querySelector(".seg");
  const pill = seg.querySelector(".seg__pill");
  const btns = [...seg.querySelectorAll(".seg__btn")];
  const groups = [...root.querySelectorAll(".org-group")];
  let active = 0;

  const place = (i, px) => {
    const b = btns[i];
    seg.style.setProperty("--pill-w", `${b.offsetWidth}px`);
    seg.style.setProperty("--pill-x", `${px ?? b.offsetLeft}px`);
  };

  function apply(i) {
    place(i);
    if (i === active) return;
    active = i;
    btns.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    const f = btns[i].dataset.filter;
    groups.forEach(g => g.classList.toggle("is-filtered-out", f !== "all" && g.dataset.cat !== f));
    const shown = groups.filter(g => !g.classList.contains("is-filtered-out"));
    replay(shown.flatMap(g => [g.querySelector(".org-group__head"), ...g.querySelectorAll(".org-grid > *")]));
  }

  btns.forEach((b, i) => b.addEventListener("click", () => { if (!moved) apply(i); }));

  // pill bisa diseret: ikut pointer, lepas = pilih tombol terdekat
  let down = null, moved = false;
  seg.addEventListener("pointerdown", e => { down = e.clientX; moved = false; });
  seg.addEventListener("pointermove", e => {
    if (down === null) return;
    if (!moved && Math.abs(e.clientX - down) > 6) {
      moved = true;
      seg.setPointerCapture(e.pointerId);
      pill.style.transition = "width .3s ease";
    }
    if (!moved) return;
    const r = seg.getBoundingClientRect();
    const w = btns[active].offsetWidth;
    const first = btns[0], last = btns[btns.length - 1];
    const px = Math.max(first.offsetLeft, Math.min(last.offsetLeft + last.offsetWidth - w, e.clientX - r.left - w / 2));
    seg.style.setProperty("--pill-x", `${px}px`);
  });
  const end = e => {
    if (down === null) return;
    down = null;
    if (!moved) return;
    pill.style.transition = "";
    const r = seg.getBoundingClientRect();
    const x = e.clientX - r.left;
    let best = 0;
    btns.forEach((b, k) => {
      const c = b.offsetLeft + b.offsetWidth / 2;
      if (Math.abs(c - x) < Math.abs(btns[best].offsetLeft + btns[best].offsetWidth / 2 - x)) best = k;
    });
    apply(best);
    place(best);
    setTimeout(() => { moved = false; }, 0);
  };
  seg.addEventListener("pointerup", end);
  seg.addEventListener("pointercancel", end);

  new ResizeObserver(() => place(active)).observe(seg);
  place(0);
}
