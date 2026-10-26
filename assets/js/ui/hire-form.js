// UI — dialog "Hire me?" (nama, email, deskripsi) + notifikasi "Pesanmu sudah terkirim!".
// Animasi memakai Motion (Framer Motion versi DOM).
import { animate, stagger } from "motion";
import { sendHireMessage, validate } from "../core/mailer.js";
import { t } from "../core/i18n.js";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DRAFT_KEY = "hire-draft";
const SEND_TIMEOUT = 15000;
const esc = (s) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const svg = {
    close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
};
let dialog = null;
let closing = false;
function field(id, label, control, hint = "") {
    return `
    <div class="field" data-field="${id}">
      <label for="hire-${id}">${label}</label>
      ${control}
      <p class="field__err" id="hire-${id}-err"></p>
      ${hint}
    </div>`;
}
function build(to) {
    const d = document.createElement("dialog");
    d.className = "hire";
    d.setAttribute("aria-labelledby", "hire-title");
    d.innerHTML = `
    <div class="hire__scrim" data-close></div>
    <form class="hire__panel" novalidate>
      <button class="hire__close" type="button" aria-label="${t("hire.close")}" data-close>${svg.close}</button>
      <span class="hire__eyebrow" data-in>${t("hire.cta")}</span>
      <h2 class="hire__title" id="hire-title" data-in>${t("hire.title")}</h2>
      <div data-in>${field("name", t("hire.name"), '<input id="hire-name" name="name" type="text" autocomplete="name" required aria-describedby="hire-name-err">')}</div>
      <div data-in>${field("email", t("hire.email"), '<input id="hire-email" name="email" type="email" inputmode="email" autocomplete="email" required aria-describedby="hire-email-err">')}</div>
      <div data-in>${field("message", t("hire.message"), `<textarea id="hire-message" name="message" rows="5" maxlength="2000" required aria-describedby="hire-message-err hire-message-count" placeholder="${t("hire.message.ph")}"></textarea>`, '<span class="field__count" id="hire-message-count">0 / 2000</span>')}</div>
      <input class="hire__trap" name="_honey" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="hire__status" role="status" aria-live="polite"></p>
      <div class="hire__actions" data-in>
        <button class="btn btn--acc hire__submit" type="submit">
          <span class="hire__submitText">${t("hire.send")}</span>${svg.send}<span class="spinner" aria-hidden="true"></span>
        </button>
        <span class="hire__note">${t("hire.or")} <a href="mailto:${esc(to)}">${esc(to)}</a></span>
      </div>
    </form>`;
    document.body.append(d);
    const form = d.querySelector("form");
    const counter = d.querySelector(".field__count");
    const textarea = d.querySelector("#hire-message");
    d.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => close()));
    // Esc: tutup dengan animasi, bukan langsung hilang
    d.addEventListener("cancel", e => { e.preventDefault(); close(); });
    const readForm = () => {
        const fd = new FormData(form);
        return {
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            message: String(fd.get("message") ?? ""),
            trap: String(fd.get("_honey") ?? ""),
        };
    };
    // validasi per field saat keluar dari input; error hilang begitu diperbaiki
    form.addEventListener("focusout", e => {
        const t = e.target;
        if (!t.name || t.name === "_honey" || !t.value)
            return;
        showErrors(d, pick(validate(readForm()), t.name));
    });
    form.addEventListener("input", e => {
        const t = e.target;
        const box = d.querySelector(`[data-field="${t.name}"]`);
        if (box?.classList.contains("is-invalid") && !validate(readForm())[t.name]) {
            showErrors(d, pick({}, t.name));
        }
        counter.textContent = `${textarea.value.length} / 2000`;
        saveDraft(readForm());
    });
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = readForm();
        const errors = validate(msg);
        showErrors(d, errors, true);
        if (Object.keys(errors).length) {
            d.querySelector(".is-invalid input, .is-invalid textarea")?.focus();
            return;
        }
        setBusy(d, true);
        setStatus(d, "");
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), SEND_TIMEOUT);
        const result = await sendHireMessage(to, msg, ctrl.signal);
        clearTimeout(timer);
        setBusy(d, false);
        if (result.ok) {
            form.reset();
            counter.textContent = "0 / 2000";
            clearDraft();
            await close();
            celebrate(msg.name.trim());
        }
        else if (result.reason === "activation") {
            setStatus(d, t("hire.activation", { to }), "warn");
        }
        else {
            setStatus(d, t("hire.fail"), "error");
        }
    });
    return d;
}
function pick(errors, name) {
    return { ...errors, __only: name };
}
function showErrors(d, errors, shake = false) {
    ["name", "email", "message"].forEach(name => {
        if (errors.__only && errors.__only !== name)
            return;
        const box = d.querySelector(`[data-field="${name}"]`);
        const input = box.querySelector("input, textarea");
        const err = errors[name] ?? "";
        box.querySelector(".field__err").textContent = err;
        input.setAttribute("aria-invalid", String(!!err));
        const wasInvalid = box.classList.contains("is-invalid");
        box.classList.toggle("is-invalid", !!err);
        if (err && (shake || !wasInvalid) && !reduce) {
            animate(box, { x: [0, -8, 7, -5, 3, 0] }, { duration: 0.42, ease: "easeOut" });
        }
    });
}
function setBusy(d, busy) {
    const btn = d.querySelector(".hire__submit");
    btn.disabled = busy;
    btn.classList.toggle("is-busy", busy);
    btn.querySelector(".hire__submitText").textContent = busy ? t("hire.sending") : t("hire.send");
    d.querySelector("form").setAttribute("aria-busy", String(busy));
}
function setStatus(d, text, tone = "") {
    const el = d.querySelector(".hire__status");
    el.textContent = text;
    el.dataset.tone = tone;
    if (text && !reduce)
        animate(el, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.3 });
}
/* ---------- draft: isi form tidak hilang kalau tidak sengaja tertutup ---------- */
function saveDraft(msg) {
    try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ name: msg.name, email: msg.email, message: msg.message }));
    }
    catch { }
}
function clearDraft() {
    try {
        sessionStorage.removeItem(DRAFT_KEY);
    }
    catch { }
}
function restoreDraft(d) {
    try {
        const raw = sessionStorage.getItem(DRAFT_KEY);
        if (!raw)
            return;
        const draft = JSON.parse(raw);
        ["name", "email", "message"].forEach(k => {
            const el = d.querySelector(`[name="${k}"]`);
            if (el && draft[k] && !el.value)
                el.value = draft[k];
        });
        d.querySelector(".field__count").textContent = `${(draft.message ?? "").length} / 2000`;
    }
    catch { }
}
/* ---------- buka / tutup ---------- */
export async function open(to) {
    dialog ??= build(to);
    const d = dialog;
    if (d.open)
        return;
    restoreDraft(d);
    d.showModal();
    d.querySelector("#hire-name").focus();
    if (reduce)
        return;
    animate(d.querySelector(".hire__scrim"), { opacity: [0, 1] }, { duration: 0.3 });
    animate(d.querySelector(".hire__panel"), { opacity: [0, 1], y: [48, 0], scale: [0.94, 1] }, { type: "spring", bounce: 0.32, visualDuration: 0.5 });
    animate(d.querySelectorAll("[data-in]"), { opacity: [0, 1], y: [14, 0] }, { delay: stagger(0.05, { startDelay: 0.12 }), duration: 0.45, ease: [0.16, 1, 0.3, 1] });
}
export async function close() {
    const d = dialog;
    if (!d?.open || closing)
        return;
    closing = true;
    if (!reduce) {
        await Promise.all([
            animate(d.querySelector(".hire__panel"), { opacity: 0, y: 24, scale: 0.97 }, { duration: 0.2, ease: "easeIn" }),
            animate(d.querySelector(".hire__scrim"), { opacity: 0 }, { duration: 0.22 }),
        ]);
    }
    d.close();
    closing = false;
}
/* ---------- notifikasi sukses ---------- */
export function celebrate(name) {
    document.querySelector(".sent")?.remove();
    const title = t("sent.title");
    const el = document.createElement("div");
    el.className = "sent";
    el.setAttribute("role", "status");
    el.innerHTML = `
    <span class="sent__burst" aria-hidden="true">${Array.from({ length: 16 }, () => "<i></i>").join("")}</span>
    <span class="sent__badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="sent__check" d="M5 12.5l4.5 4.5L19 7.5"/></svg>
    </span>
    <span class="sent__text">
      <strong class="sent__title" aria-label="${title}">${[...title].map(c => `<span aria-hidden="true">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("")}</strong>
      <span class="sent__sub">${t("sent.sub", { name: name ? `, ${esc(name)}` : "" })}</span>
    </span>
    <button class="sent__close" type="button" aria-label="${t("sent.close")}">${svg.close}</button>
    <span class="sent__bar" aria-hidden="true"></span>`;
    document.body.append(el);
    const DURATION = 6;
    let gone = false;
    const dismiss = async () => {
        if (gone)
            return;
        gone = true;
        if (!reduce)
            await animate(el, { opacity: 0, y: -30, scale: 0.95 }, { duration: 0.25, ease: "easeIn" });
        el.remove();
    };
    el.querySelector(".sent__close").addEventListener("click", dismiss);
    if (reduce) {
        setTimeout(dismiss, DURATION * 1000);
        return;
    }
    animate(el, { opacity: [0, 1], y: [-120, 0], scale: [0.8, 1] }, { type: "spring", bounce: 0.45, visualDuration: 0.6 });
    animate(el.querySelector(".sent__badge"), { scale: [0, 1.25, 1], rotate: [-90, 0] }, { duration: 0.6, delay: 0.15, ease: "easeOut" });
    animate(el.querySelector(".sent__check"), { strokeDashoffset: [24, 0] }, { duration: 0.45, delay: 0.4, ease: "easeOut" });
    animate(el.querySelectorAll(".sent__title span"), { opacity: [0, 1], y: [12, 0], rotate: [8, 0] }, { delay: stagger(0.025, { startDelay: 0.25 }), type: "spring", bounce: 0.5, visualDuration: 0.4 });
    animate(el.querySelector(".sent__sub"), { opacity: [0, 1] }, { delay: 0.8, duration: 0.4 });
    // ledakan partikel dari badge
    el.querySelectorAll(".sent__burst i").forEach((p, k) => {
        const angle = (k / 16) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 50 + Math.random() * 60;
        animate(p, { x: [0, Math.cos(angle) * dist], y: [0, Math.sin(angle) * dist], scale: [1, 0], opacity: [1, 0] }, { duration: 0.9 + Math.random() * 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] });
    });
    const bar = animate(el.querySelector(".sent__bar"), { scaleX: [1, 0] }, { duration: DURATION, ease: "linear" });
    bar.then(dismiss);
    // berhenti sebentar saat disorot mouse
    el.addEventListener("pointerenter", () => bar.pause());
    el.addEventListener("pointerleave", () => bar.play());
}
/** Pasang ke semua tombol pemicu "Hire me?" */
export function mountHireMe(triggers, to) {
    for (const t of triggers) {
        t.addEventListener("click", e => {
            e.preventDefault();
            open(to);
        });
    }
}
