// I18N — bahasa Indonesia / English.
// • Teks antarmuka: kamus STRINGS di bawah, dipanggil lewat t("kunci").
// • Isi data/portfolio.json: field "x_en" di sebelah "x" otomatis dipakai saat bahasa EN (lihat localize()).
// • Teks statis di HTML: atribut data-i18n="kunci" (isi teks) / data-i18n-aria="kunci" (aria-label).

export type Lang = "id" | "en";
const KEY = "lang";

const STRINGS = {
  // umum
  "nav.aria": { id: "Navigasi halaman", en: "Page navigation" },
  "skip": { id: "Lewati ke konten", en: "Skip to content" },
  "brand.aria": { id: "Rafiif — kembali ke Biodata", en: "Rafiif — back to Profile" },
  "lang.aria": { id: "Bahasa", en: "Language" },
  "loading": { id: "Memuat…", en: "Loading…" },
  "load.fail": {
    id: "Konten gagal dimuat. Jika membuka file langsung (file://), jalankan lewat server lokal: python tools/serve.py",
    en: "Content failed to load. If you opened the file directly (file://), run a local server: python tools/serve.py",
  },
  "copied.email": { id: "Email tersalin", en: "Email copied" },
  "copy.fail": { id: "Gagal menyalin — salin manual ya", en: "Couldn't copy — please copy it manually" },
  "theme.auto": { id: "Otomatis (ikuti perangkat)", en: "Automatic (follow device)" },
  "theme.light": { id: "Light mode", en: "Light mode" },
  "theme.dark": { id: "Dark mode", en: "Dark mode" },
  "theme.aria": { id: "Mode tampilan: {cur}. Klik untuk {next}", en: "Display mode: {cur}. Click for {next}" },

  // kepala halaman (HTML statis)
  "head.pendidikan.eyebrow": { id: "Riwayat studi", en: "Education history" },
  "head.pendidikan.title": { id: "Pendidikan", en: "Education" },
  "head.pendidikan.lead": {
    id: "Dari olimpiade matematika di SMA sampai Teknik Informatika ITB — fondasi analitis yang saya bawa ke setiap proyek.",
    en: "From high-school math olympiads to Informatics at ITB — the analytical foundation I bring to every project.",
  },
  "head.organisasi.eyebrow": { id: "Pengalaman", en: "Experience" },
  "head.organisasi.title": { id: "Organisasi", en: "Organizations" },
  "head.organisasi.lead": {
    id: "Rekam jejak kepanitiaan, asisten praktikum, komunitas kampus ITB, dan kegiatan sekolah.",
    en: "Committees, teaching assistantships, ITB campus communities, and school activities.",
  },
  "head.skill.eyebrow": { id: "Keahlian", en: "Expertise" },
  "head.skill.title": { id: "Skill", en: "Skills" },
  "head.skill.lead": {
    id: "Teknologi yang saya pakai untuk membangun produk: dari antarmuka, server & database, sampai desain. Geser pita logo di bawah.",
    en: "The technology I build products with: interfaces, servers & databases, and design. Drag the logo strip below.",
  },
  "head.proyek.eyebrow": { id: "Karya", en: "Work" },
  "head.proyek.title": { id: "Proyek", en: "Projects" },
  "head.proyek.lead": { id: "Eksperimen algoritma dan aplikasi yang sudah saya bangun.", en: "Algorithm experiments and applications I have built." },
  "head.kontak.eyebrow": { id: "Kontak", en: "Contact" },
  "head.kontak.title": { id: "Mari berkolaborasi", en: "Let's collaborate" },
  "head.kontak.lead": { id: "Instagram, GitHub, LinkedIn, atau email.", en: "Instagram, GitHub, LinkedIn, or email." },
  "head.musik.eyebrow": { id: "Selera musik · ongoing", en: "Music taste · ongoing" },
  "head.musik.title": { id: "Musik", en: "Music" },
  "head.musik.lead": { id: "Lagu dan artis yang menemani saya ngoding. Halaman ini masih uji coba.", en: "Songs and artists that keep me company while coding. This page is still a work in progress." },

  // biodata
  "home.status": { id: "Terbuka untuk kolaborasi & peluang", en: "Open for collaborations & opportunities" },
  "home.hello": { id: "Halo, saya", en: "Hi, I'm" },
  "home.intro.aria": { id: "Perkenalan", en: "Introduction" },
  "home.photos.aria": { id: "Foto {name}", en: "Photos of {name}" },
  "home.cta.projects": { id: "Lihat proyek", en: "View projects" },
  "home.biodata": { id: "Biodata", en: "Profile" },
  "bio.name": { id: "Nama lengkap", en: "Full name" },
  "bio.major": { id: "Program studi", en: "Major" },
  "bio.univ": { id: "Universitas", en: "University" },
  "bio.class": { id: "Angkatan {year}", en: "Class of {year}" },
  "bio.gpa": { id: "IPK", en: "GPA" },
  "bio.gpa.of": { id: "dari 4.00", en: "out of 4.00" },
  "bio.domicile": { id: "Domisili", en: "Location" },
  "bio.email": { id: "Email", en: "Email" },
  "bio.copy": { id: "Salin", en: "Copy" },
  "stat.gpa": { id: "IPK kumulatif", en: "Cumulative GPA" },
  "stat.org": { id: "Organisasi & kepanitiaan", en: "Organizations & committees" },
  "stat.skill": { id: "Teknologi dikuasai", en: "Technologies" },
  "stat.awards": { id: "Prestasi olimpiade", en: "Olympiad awards" },
  "stat.focus": { id: "Fokus minat", en: "Focus areas" },
  "home.explore": { id: "Jelajahi", en: "Explore" },
  "home.pages": { id: "{n} halaman", en: "{n} pages" },
  "door.open": { id: "Buka halaman", en: "Open page" },
  "sum.pendidikan": { id: "{n} jenjang · {a} prestasi", en: "{n} levels · {a} awards" },
  "sum.organisasi": { id: "{k} kuliah · {s} SMA", en: "{k} university · {s} high school" },
  "sum.skill": { id: "{n} teknologi · {c} kategori", en: "{n} technologies · {c} categories" },
  "sum.proyek": { id: "{n} proyek", en: "{n} projects" },
  "sum.kontak": { id: "{n} kanal", en: "{n} channels" },
  "sum.musik": { id: "Sedang dibangun · uji coba", en: "Under construction · testing" },

  // foto
  "photo.hint": { id: "Geser foto", en: "Swipe photo" },
  "photo.prev": { id: "Foto sebelumnya", en: "Previous photo" },
  "photo.next": { id: "Foto berikutnya", en: "Next photo" },
  "photo.alt": { id: "{name} — foto {n}", en: "{name} — photo {n}" },
  "photo.pause": { id: "Jeda slideshow foto", en: "Pause photo slideshow" },
  "photo.play": { id: "Putar slideshow foto", en: "Play photo slideshow" },

  // pendidikan & organisasi
  "edu.awards": { id: "Prestasi & penghargaan", en: "Awards & honors" },
  "org.filter.aria": { id: "Filter organisasi", en: "Filter organizations" },
  "org.all": { id: "Semua", en: "All" },
  "org.uni": { id: "Kuliah", en: "University" },
  "org.hs": { id: "SMA", en: "High school" },
  "org.drag": { id: "Geser pill untuk memfilter", en: "Drag the pill to filter" },
  "org.group.uni": { id: "Organisasi & pengalaman kuliah", en: "University organizations & experience" },
  "org.group.hs": { id: "Organisasi SMA", en: "High school organizations" },
  "org.count": { id: "{n} pengalaman", en: "{n} experiences" },

  // proyek
  "proj.more.title": { id: "Proyek lainnya sedang dibangun", en: "More projects in progress" },
  "proj.more.desc": { id: "Repositori, eksperimen, dan tugas besar terbaru ada di GitHub.", en: "Latest repositories, experiments, and coursework are on GitHub." },

  // kontak
  "contact.email": { id: "Email", en: "Email" },
  "contact.write": { id: "Tulis pesan", en: "Write a message" },
  "contact.visit": { id: "Kunjungi", en: "Visit" },

  // form hire me
  "hire.cta": { id: "Hire me?", en: "Hire me?" },
  "hire.title": { id: "Ayo kerja bareng", en: "Let's work together" },
  "hire.name": { id: "Nama", en: "Name" },
  "hire.email": { id: "Email", en: "Email" },
  "hire.message": { id: "Pesan", en: "Message" },
  "hire.message.ph": { id: "Tulis pesanmu di sini...", en: "Write your message here..." },
  "hire.send": { id: "Kirim pesan", en: "Send message" },
  "hire.sending": { id: "Mengirim…", en: "Sending…" },
  "hire.or": { id: "atau email ke", en: "or email" },
  "hire.close": { id: "Tutup form", en: "Close form" },
  "hire.err.name": { id: "Tulis nama kamu (minimal 2 huruf).", en: "Please enter your name (at least 2 letters)." },
  "hire.err.email": { id: "Format email belum benar, contoh: nama@gmail.com.", en: "That email doesn't look right, e.g. name@gmail.com." },
  "hire.err.message": { id: "Pesan minimal 10 karakter.", en: "Message must be at least 10 characters." },
  "hire.activation": {
    id: "Form ini baru aktif setelah dikonfirmasi pemilik website. Untuk Rafiif: cek inbox {to} dan klik “Activate Form”, lalu kirim ulang.",
    en: "This form becomes active once the site owner confirms it. For Rafiif: check the inbox of {to}, click “Activate Form”, then resend.",
  },
  "hire.fail": {
    id: "Pesan belum terkirim, sepertinya koneksi bermasalah. Coba lagi, atau kirim lewat email langsung di bawah.",
    en: "Your message wasn't sent — the connection seems to have failed. Try again, or use the email link below.",
  },
  "sent.title": { id: "Pesanmu sudah terkirim!", en: "Your message has been sent!" },
  "sent.sub": { id: "Terima kasih{name}! Saya akan membalas ke email kamu secepatnya.", en: "Thank you{name}! I'll reply to your email as soon as I can." },
  "sent.close": { id: "Tutup notifikasi", en: "Close notification" },

  // Bizarre's
  "tbc.aria": { id: "Lanjut ke halaman berikutnya: {title}", en: "Continue to the next page: {title}" },

  // musik
  "music.ongoing": { id: "Halaman ini masih dalam pengembangan dan uji coba.", en: "This page is still under development and testing." },
  "music.player": { id: "Pemutar", en: "Player" },
  "music.vinyl": { id: "Piringan hitam. Seret memutar dengan mouse.", en: "Vinyl record. Drag to spin it with the mouse." },
  "music.now": { id: "Sedang diputar", en: "Now playing" },
  "music.none": { id: "Belum ada lagu", en: "No songs yet" },
  "music.none.sub": { id: "Tambahkan lagu favorit di data/portfolio.json", en: "Add favorite songs in data/portfolio.json" },
  "music.prev": { id: "Lagu sebelumnya", en: "Previous song" },
  "music.next": { id: "Lagu berikutnya", en: "Next song" },
  "music.pause": { id: "Jeda putaran", en: "Pause" },
  "music.play": { id: "Putar", en: "Play" },
  "music.hint": { id: "Seret piringannya untuk “scratch”. Belum ada audio, ini masih uji coba.", en: "Drag the record to “scratch” it. No audio yet — still testing." },
  "music.genres": { id: "Genre favorit", en: "Favorite genres" },
  "music.artists": { id: "Artis yang sering diputar", en: "Most played artists" },
  "music.playlist": { id: "Playlist", en: "Playlist" },
  "music.slot": { id: "Slot kosong", en: "Empty slot" },
  "music.slot.fill": { id: "isi di", en: "fill in" },
} satisfies Record<string, { id: string; en: string }>;

export type StringKey = keyof typeof STRINGS;

/* ---------- bahasa aktif ---------- */
export function getLang(): Lang {
  const l = document.documentElement.lang;
  return l === "en" ? "en" : "id";
}

/** Teks antarmuka. {var} diganti dari vars. */
export function t(key: StringKey, vars: Record<string, string | number> = {}): string {
  const entry = STRINGS[key];
  const s: string = entry ? entry[getLang()] : key;
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}

/** Ambil field terjemahan: obj.x_en saat EN (bila ada), selain itu obj.x */
export function pick<T extends Record<string, unknown>>(obj: T, key: string): unknown {
  return getLang() === "en" && obj[`${key}_en`] !== undefined ? obj[`${key}_en`] : obj[key];
}

/** Salinan data dengan semua field "x_en" menggantikan "x" (saat EN); field _en dibuang. */
export function localize<T>(value: T, lang: Lang = getLang()): T {
  if (Array.isArray(value)) return value.map(v => localize(v, lang)) as T;
  if (!value || typeof value !== "object") return value;
  const src = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(src)) {
    if (k.endsWith("_en")) continue;
    const en = src[`${k}_en`];
    out[k] = localize(lang === "en" && en !== undefined ? en : v, lang);
  }
  return out as T;
}

/** Terjemahkan teks statis HTML ([data-i18n], [data-i18n-aria]) */
export function applyStatic(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n as StringKey);
  });
  root.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach(el => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria as StringKey));
  });
}

/** Pemilih bahasa di topbar: ID | EN */
export function initLangSwitch() {
  const box = document.querySelector<HTMLElement>(".lang");
  if (!box) return;
  const current = getLang();
  box.setAttribute("aria-label", t("lang.aria"));
  box.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === current));
    btn.addEventListener("click", () => {
      const next = btn.dataset.lang as Lang;
      if (next === getLang()) return;
      box.dataset.active = next;
      try {
        localStorage.setItem(KEY, next);
        sessionStorage.setItem("lang-scroll", String(scrollY));
      } catch {}
      // pill bergeser dulu, konten larut, lalu muat ulang dalam bahasa baru
      document.documentElement.classList.add("is-leaving");
      setTimeout(() => location.reload(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320);
    });
  });
  box.dataset.active = current;
}

/** Setelah ganti bahasa: kembali ke posisi scroll sebelumnya */
export function restoreScroll() {
  try {
    const y = sessionStorage.getItem("lang-scroll");
    if (y === null) return;
    sessionStorage.removeItem("lang-scroll");
    scrollTo({ top: Number(y), behavior: "instant" as ScrollBehavior });
  } catch {}
}
