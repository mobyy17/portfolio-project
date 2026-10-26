# Rafiif.portfolio

Portfolio pribadi **Muhammad Rafiif Ansyadya**, mahasiswa Teknik Informatika ITB. Website ini terdiri dari beberapa halaman dengan dock navigasi interaktif "Meniscus", tersedia dalam dua bahasa (ID/EN), dan memakai tema *Bizarre's*.

## Fitur

- **Dock Meniscus**: navigasi antar halaman berbasis fisika pegas. Bead-nya bisa diseret dengan mouse atau jari, dan bisa dipakai dengan keyboard.
- **7 halaman**: Biodata, Pendidikan, Organisasi, Skill, Proyek, Kontak, dan Musik (masih *ongoing*).
- **Dua bahasa (ID/EN)**: teks antarmuka diambil dari kamus `i18n`, sedangkan isi konten memakai field `*_en` di data.
- **Mode tampilan**: Otomatis (mengikuti perangkat), Light, atau Dark.
- **Form "Hire me?"**: pesan dikirim langsung ke inbox lewat FormSubmit.
- **Animasi**: [Motion](https://motion.dev) (Framer Motion versi DOM) untuk efek scroll, reveal, dan micro-interaction. Semua animasi menghormati `prefers-reduced-motion`.
- **Aksesibilitas**: target sentuh minimal 44px, kontras teks ≥ 4.5:1 di kedua tema, fokus keyboard terlihat jelas, dan slideshow bisa dijeda.

## Struktur

```
├── index.html … musik.html   halaman (satu file per halaman)
├── data/
│   └── portfolio.json        seluruh isi konten (profil, organisasi, skill, proyek, …)
├── src/ts/                   sumber TypeScript (core, ui, pages)
├── assets/
│   ├── css/                  tokens · base · components · dock · hire · effects · music
│   ├── js/
│   │   ├── core/             data, selector, i18n, mailer
│   │   ├── ui/               komponen, ikon, animasi, tema
│   │   ├── pages/            satu modul per halaman
│   │   ├── dock/             dock Meniscus + daftar halaman
│   │   └── main.js           bootstrap
│   ├── icons/
│   └── images/               profil/ · organisasi/
├── package.json
└── tsconfig.json
```

Lapisannya mengalir **data → core → ui → pages**. Hanya `core/data.js` yang tahu dari mana data berasal.

## Menjalankan

Website ini statis: tidak perlu proses build untuk melihatnya. Karena konten dimuat lewat `fetch`, website harus dibuka lewat server lokal, bukan `file://`.

```bash
npm run serve        # http://localhost:8000
```

## Mengubah konten

- **Teks, organisasi, skill, proyek**: edit `data/portfolio.json`. Untuk versi English, isi field `*_en` di sebelah field aslinya (contoh: `deskripsi` dan `deskripsi_en`).
- **Teks antarmuka**: edit `src/ts/core/i18n.ts`.
- **Warna dan tema**: edit `assets/css/tokens.css`.

## TypeScript

Sumbernya ada di `src/ts/`, dan hasil kompilasinya (`assets/js/`) ikut di-commit supaya website langsung jalan tanpa build.

```bash
npm install
npm run build        # atau: npm run dev (watch)
```

## Form kontak

Form "Hire me?" memakai [FormSubmit](https://formsubmit.co). Kiriman pertama memicu email aktivasi ke alamat tujuan. Setelah tautan **Activate Form** di email itu diklik, pesan berikutnya langsung masuk ke inbox.
