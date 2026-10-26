// Halaman 06 — Kontak: Instagram, GitHub, LinkedIn, dan Email.
// Kartu Email membuka form "Hire me?" (pesan langsung masuk inbox), fallback ke mailto.
import { contactCard } from "../ui/components.js";

const ORDER = ["instagram", "github", "linkedin", "gmail"];

export function render(data, root) {
  const kontak = data.kontak || [];
  const list = ORDER.map(id => kontak.find(k => k.icon === id)).filter(Boolean);
  root.innerHTML = `
    <div class="contact-grid contact-grid--4" data-stagger="90">${list.map(contactCard).join("")}</div>`;
}
