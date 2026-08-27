export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[74px] overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Grid pattern hanya di sisi kiri (area teks), gak numpuk foto */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[45%] opacity-20 hero-grid-bg pointer-events-none"
      ></div>

      {/* Foto full-bleed di kanan */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        <img
          src="/images/fotojamal.jpeg"
          alt="Muhammad Rafiif Ansyadya"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(15%) contrast(1.05)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 75%, transparent) 18%, transparent 45%), linear-gradient(0deg, color-mix(in srgb, var(--bg) 55%, transparent), transparent 40%)',
          }}
        ></div>
        <div className="absolute inset-0 md:hidden" style={{ background: 'color-mix(in srgb, var(--bg) 55%, transparent)' }}></div>
      </div>
      <div
        className="hidden md:block absolute right-9 top-28 z-10 font-jp font-bold text-base tracking-[0.3em] opacity-80"
        style={{ writingMode: 'vertical-rl', color: 'var(--gold)' }}
      >
        情 報 工 学
      </div>

      <div className="relative z-10 w-[min(1180px,calc(100%-48px))] mx-auto py-16 md:py-24">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }}></span>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
            Open to opportunities · Bekasi, Indonesia
          </span>
        </div>

        <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--ink-dim)' }}>
          Hello, my name is
        </p>

        <h1 className="font-display uppercase leading-[0.86] max-w-2xl" style={{ fontSize: 'clamp(3.2rem, 9vw, 7.4rem)' }}>
          <span className="block">MUHAMMAD</span>
          <span className="block" style={{ color: 'var(--gold)' }}>RAFIIF.</span>
        </h1>

        <p className="mt-5 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--ink-dim)' }}>
          Informatics Student — Institut Teknologi Bandung
        </p>

        <p className="mt-7 max-w-md text-base leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
          Mahasiswa Informatika ITB dengan latar belakang kompetisi matematika dan problem solving —
          membawa ketelitian analitis ke dunia teknologi dengan mental jalanan Tokyo malam hari.
          No gods, no gatekeepers, just clean logic.
        </p>

        <div className="flex flex-wrap gap-5 mt-10">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 font-mono font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-sm transition-transform hover:-translate-y-1"
            style={{ background: 'var(--gold)', color: '#1a1712' }}
          >
            Lihat Perjalanan ↓
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-mono font-bold text-xs tracking-widest uppercase py-4 border-b transition-all hover:gap-4"
            style={{ borderColor: 'var(--ink)' }}
          >
            Download CV ↗
          </a>
        </div>
      </div>

      <div
        className="relative z-10 md:absolute bottom-6 inset-x-0 w-[min(1180px,calc(100%-48px))] mx-auto flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] tracking-widest uppercase pb-6 md:pb-0"
        style={{ color: 'var(--ink-dim)' }}
      >
        <span>001 / 004 · <b style={{ color: 'var(--gold)' }}>ITB STYLE</b></span>
        <span>-6.8915°S / 107.6107°E</span>
        <span>STATUS: <b style={{ color: 'var(--gold)' }}>ONLINE</b></span>
      </div>
    </section>
  );
}