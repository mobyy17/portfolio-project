// Daftar halaman portfolio — satu sumber kebenaran untuk dock navigasi.
// href relatif terhadap root website; base path diatur lewat data-base di elemen dock.
// label_en / title_en / sub_en dipakai saat bahasa English aktif.
// inDock: false -> halaman tidak tampil di dock kecuali sedang dibuka (dipakai untuk halaman uji coba).
window.MENISCUS_ROUTES = [
  {
    id: "home",
    href: "index.html",
    label: "Biodata",
    title: "Biodata",
    sub: "Siapa saya, singkatnya.",
    label_en: "Profile",
    title_en: "Profile",
    sub_en: "Who I am, in short.",
    acc: "#c9f24a",
    icon: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="11" r="2.4"/><path d="M5.6 16.8c.6-1.7 1.9-2.6 3.4-2.6s2.8.9 3.4 2.6M15 9.8h3.2M15 13.2h3.2"/>'
  },
  {
    id: "pendidikan",
    href: "pendidikan.html",
    label: "Pendidikan",
    title: "Pendidikan",
    sub: "ITB dan perjalanan sebelumnya.",
    label_en: "Education",
    title_en: "Education",
    sub_en: "ITB and the road before it.",
    acc: "#8fa8ff",
    icon: '<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.3V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.7M22 9.5V15"/>'
  },
  {
    id: "organisasi",
    href: "organisasi.html",
    label: "Organisasi",
    title: "Organisasi",
    sub: "Kepanitiaan, asisten, komunitas.",
    label_en: "Organizations",
    title_en: "Organizations",
    sub_en: "Committees, assistantships, communities.",
    acc: "#f9a83b",
    icon: '<circle cx="9" cy="8" r="3.4"/><path d="M2.6 20c0-3.6 2.9-6 6.4-6s6.4 2.4 6.4 6M16 4.7a3.4 3.4 0 0 1 0 6.6M18.6 14.6c1.8.8 2.9 2.7 2.9 5.4"/>'
  },
  {
    id: "skill",
    href: "skill.html",
    label: "Skill",
    title: "Skill",
    sub: "Frontend, backend, dan desain.",
    label_en: "Skills",
    title_en: "Skills",
    sub_en: "Frontend, backend, and design.",
    acc: "#4fe0c8",
    icon: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.6 4l-3.2 16"/>'
  },
  {
    id: "proyek",
    href: "proyek.html",
    label: "Proyek",
    title: "Proyek",
    sub: "Hal-hal yang sudah saya bangun.",
    label_en: "Projects",
    title_en: "Projects",
    sub_en: "Things I have built.",
    acc: "#ff4f7b",
    icon: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 10h18"/>'
  },
  {
    id: "kontak",
    href: "kontak.html",
    label: "Kontak",
    title: "Kontak",
    sub: "Mari ngobrol dan berkolaborasi.",
    label_en: "Contact",
    title_en: "Contact",
    sub_en: "Let's talk and collaborate.",
    acc: "#b98bff",
    icon: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>'
  },
  {
    id: "musik",
    href: "musik.html",
    label: "Musik",
    title: "Musik",
    sub: "Selera musik saya — masih uji coba.",
    label_en: "Music",
    title_en: "Music",
    sub_en: "My music taste — still testing.",
    acc: "#f5c542",
    badge: "Ongoing",
    inDock: false,
    icon: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'
  }
];
