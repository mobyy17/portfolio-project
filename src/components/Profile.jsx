import { SectionLabel } from './Shared.jsx';
import Reveal from './Reveal.jsx';
import { profile, STATS } from '../data.js';

export default function Profile() {
  const idRows = [
    ['Nama', profile.name],
    ['Peran', profile.role],
    ['Domisili', profile.location],
    ['Status', profile.status],
    ['Kode', profile.code],
  ];

  return (
    <section id="profile" className="py-28">
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto">
        <SectionLabel num="01" label="Profile" />
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
          <Reveal className="relative border p-6" style={{ borderColor: 'var(--line)', background: 'var(--card)' }}>
            <div
              className="absolute -top-3 left-5 font-jp font-bold text-xs px-2.5 py-1 tracking-widest"
              style={{ background: 'var(--gold)', color: '#1a1712' }}
            >
              開発者証
            </div>
            <div
              className="w-full aspect-square border mt-2 flex items-center justify-center font-display text-5xl id-photo-bg"
              style={{ borderColor: 'var(--line)', color: 'rgba(255,255,255,.85)' }}
            >
              {profile.name.charAt(0)}.
            </div>
            <div className="mt-5 font-mono text-xs">
              {idRows.map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5 border-b border-dashed" style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}>
                  <span>{k}</span>
                  <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</b>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="font-display uppercase leading-[0.86]" style={{ fontSize: 'clamp(2.6rem,6vw,4.6rem)' }}>
              Bikin sistem
              <br />
              <span style={{ color: 'var(--red)' }}>yang tahan banting.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
              Saya membangun aplikasi web dari nol — dari arsitektur backend sampai interface yang enak dipakai. Suka
              kerja di ruang abu-abu antara "ide gila" dan "kode yang benar-benar jalan di production".
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
              Selain ngoding, saya suka riset performance, ngulik automasi, dan bikin developer experience yang nggak
              bikin stres.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-11 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
              {STATS.map(([n, l]) => (
                <div key={l}>
                  <span className="block font-display text-4xl" style={{ color: 'var(--gold)' }}>{n}</span>
                  <small className="font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--ink-dim)' }}>{l}</small>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}