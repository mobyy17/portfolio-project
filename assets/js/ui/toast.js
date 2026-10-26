import { t } from "../core/i18n.js";

let el, timer;

export function toast(message) {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add("is-on");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("is-on"), 2200);
}

export async function copyText(text, label = "Tersalin") {
  try {
    await navigator.clipboard.writeText(text);
    toast(`${label} ✓`);
  } catch {
    toast(t("copy.fail"));
  }
}
