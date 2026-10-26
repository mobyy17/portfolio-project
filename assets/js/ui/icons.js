// Ikon SVG (tanpa emoji). Semua ikon garis memakai stroke="currentColor".
const line = d =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const icon = {
  arrow: line('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowLeft: line('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  arrowUpRight: line('<path d="M7 17 17 7M8 7h9v9"/>'),
  copy: line('<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/>'),
  trophy: line('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h2.5a1.5 1.5 0 0 1 1.5 1.5c0 2.5-2 4.5-4.5 4.5M7 5H4.5A1.5 1.5 0 0 0 3 6.5C3 9 5 11 7.5 11"/>'),
  cap: line('<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.3V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.7M22 9.5V15"/>'),
  school: line('<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5M12 10.5h.01"/>'),
  monitor: line('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7.5 9l2 1.5-2 1.5M12 12h3"/>'),
  server: line('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6"/>'),
  pen: line('<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>'),
  code: line('<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.6 4l-3.2 16"/>'),
  folder: line('<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>'),
  plus: line('<path d="M12 5v14M5 12h14"/>'),
  pin: line('<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  calendar: line('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  mail: line('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
};

export function socialIcon(type) {
  switch (type) {
    case "github":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
    case "gmail":
      // logo resmi Gmail (sumber: Wikimedia Commons, "Gmail icon (2020).svg"); salinan file: assets/icons/gmail.svg
      return `<svg class="logo-gmail" viewBox="52 42 88 66" aria-hidden="true"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>`;
    case "linkedin":
      return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`;
    case "instagram":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>`;
    default:
      return icon.arrowUpRight;
  }
}

// avatar organisasi: [teks atau svg, title]
const ORG = {
  hmif: ['<span>IF</span>', "Himpunan Mahasiswa Informatika ITB"],
  arkavidia: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 23c-4.97 0-9-3.8-9-8.5C3 8.8 8.6 3.1 9.9 1.8c.4-.4 1-.2 1.1.3.6 2.3 2.1 4.5 3.5 5.7 1.8-2 2-3.8 2-4.8 0-.4.5-.7.8-.4 2.8 2.5 5.7 7.2 5.7 11.9 0 4.7-4.03 8.5-9 8.5zm0-2c3.87 0 7-3.13 7-7 0-3.3-2-6.9-4.2-9.2-.3 1.5-1.1 3.5-2.7 5.1-.3.3-.8.2-.9-.2-.7-1.7-1.3-3.2-1.6-4.5C7.3 7.8 5 11.8 5 14.5c0 3.87 3.13 7 7 7z"/></svg>', "Arkavidia ITB"],
  itb: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.5l-7-3.82V17c0 3.31 3.13 6 7 6s7-2.69 7-6v-4.32l-7 3.82z"/></svg>', "Institut Teknologi Bandung"],
  gdg: ['<svg viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 21 12 15 6" stroke="#4285F4"/><polyline points="9 6 3 12 9 18" stroke="#EA4335"/></svg>', "Google Developer Groups on Campus ITB"],
  oskm: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>', "OSKM ITB"],
  stei: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 3H7v2H5c-1.1 0-2 .9-2 2v2H1v2h2v2H1v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7V3zm8 14H7V7h10v10zm-2-8H9v6h6V9z"/></svg>', "STEI-K ITB"],
  ogg: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>', "OGG FITB ITB"],
  osn: ['<span class="math">Σ</span>', "OSN Matematika"],
  spectasoed: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>', "SPECTASOED 7.0"],
  badminton: ['<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a5 5 0 0 0-5 5c0 1.97 1.15 3.68 2.8 4.51L8 20a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5l-1.8-8.49A5.006 5.006 0 0 0 17 7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3c0 .87-.37 1.66-.97 2.21l-.53.48.33.64 1.48 6.67h-6.62l1.48-6.67.33-.64-.53-.48A2.99 2.99 0 0 1 9 7a3 3 0 0 1 3-3z"/></svg>', "Badminton Club"],
};

export function orgAvatar(key, name, logo) {
  const [inner, title] = ORG[key] || [`<span>${(name || "O").slice(0, 2).toUpperCase()}</span>`, name];
  const cls = ORG[key] ? `org-badge-${key}` : "org-badge-default";
  if (logo) {
    // logo asli; kalau gagal dimuat, kembali ke badge ikon
    return `<div class="org-avatar org-avatar--logo" title="${title}" aria-hidden="true" data-fallback="${cls}">
      <img src="${logo}" alt="" width="52" height="52" loading="lazy"
        onerror="const a=this.parentNode;a.classList.remove('org-avatar--logo');a.classList.add(a.dataset.fallback);a.innerHTML=a.querySelector('template').innerHTML">
      <template>${inner}</template>
    </div>`;
  }
  return `<div class="org-avatar ${cls}" title="${title}" aria-hidden="true">${inner}</div>`;
}
