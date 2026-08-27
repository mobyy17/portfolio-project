# Kenta Portfolio — React + Tailwind

Website portfolio CV bertema street Tokyo (dark/light mode) untuk developer.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk production

```bash
npm run build
npm run preview
```

## Struktur project

```
src/
  App.jsx              # Merangkai semua section
  data.js              # SEMUA konten (nama, experience, project, skill) — edit di sini
  index.css            # Warna tema (light/dark) & animasi custom
  components/
    Header.jsx          # Navbar + toggle theme
    Hero.jsx             # Section utama
    Shared.jsx           # Marquee & SectionLabel reusable
    Profile.jsx          # Section about/profile
    Experience.jsx       # Timeline experience + projects
    Skills.jsx           # Progress bar skill
    Contact.jsx          # Form kontak
    Footer.jsx
    ThemeToggle.jsx
```

## Cara ganti konten

Buka `src/data.js` dan ganti:
- `profile` → nama, role, email, dll
- `EXPERIENCE` → riwayat kerja
- `PROJECTS` → project unggulan
- `SKILLS` → tech stack & level
- `STATS` → angka statistik di section Profile
- `SOCIALS` → link GitHub/LinkedIn/Instagram

## Cara ganti warna

Buka `src/index.css`, edit variabel di `:root` (dark mode) dan `html.light` (light mode):
- `--red` → warna aksen merah
- `--gold` → warna aksen emas
- `--bg` / `--ink` → warna background & teks dasar

## Deploy

Project ini bisa langsung di-deploy ke Vercel, Netlify, atau GitHub Pages setelah `npm run build` (hasil ada di folder `dist/`).
