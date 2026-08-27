# Rafiif Portfolio — React + Tailwind

Website portfolio CV bertema street Tokyo/ITB (dark/light mode) untuk Muhammad Rafiif Ansyadya.

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
public/
images/
fotojamal.jpeg 
src/
App.jsx # Merangkai semua section
data.js # SEMUA konten (profil, activities, achievements, skill) — edit di sini
index.css # Warna tema (light/dark) & animasi custom
components/
Header.jsx # Navbar + toggle theme
Hero.jsx # Section utama, pakai foto full-bleed
Reveal.jsx # Wrapper animasi fade-in scroll
Shared.jsx # Marquee & SectionLabel reusable
Profile.jsx # Section about/profile
Experience.jsx # Timeline leadership & activities + achievements
Skills.jsx # Progress bar skill
Contact.jsx # Form kontak
Footer.jsx
ThemeToggle.jsx


## Cara ganti konten

Buka `src/data.js` dan ganti:
- `profile` → nama, role, email, no HP, dll
- `EXPERIENCE` → riwayat organisasi/leadership/activities
- `PROJECTS` → achievement & pendidikan
- `SKILLS` → tech stack & level
- `STATS` → angka statistik di section Profile
- `SOCIALS` → link GitHub/LinkedIn/Instagram

## Cara ganti foto hero

Ganti file di `public/images/rafiif-hero.jpg` dengan foto lain (nama file harus sama, atau ubah juga path `src` di `Hero.jsx`).

## Cara ganti warna

Buka `src/index.css`, edit variabel di `:root` (dark mode) dan `html.light` (light mode):
- `--red` → warna aksen merah
- `--gold` → warna aksen emas
- `--bg` / `--ink` → warna background & teks dasar

## Deploy

Project ini bisa langsung di-deploy ke Vercel, Netlify, atau GitHub Pages setelah `npm run build` (hasil ada di folder `dist/`).