import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { profile, SOCIALS } from '../data.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-28">
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto grid md:grid-cols-[1fr_0.85fr] gap-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>05 / Get in touch</span>
          <h2 className="font-display uppercase leading-[0.86] mt-4" style={{ fontSize: 'clamp(2.6rem,7vw,5.2rem)' }}>
            Punya proyek
            <br />
            <span style={{ color: 'var(--red)' }}>yang gila?</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
            Ceritakan idenya, sekalipun masih berantakan. Saya suka mulai dari sana.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 mt-6 font-mono text-sm border-b pb-1.5"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
          >
            {profile.email} ↗
          </a>
          <div className="flex gap-3 mt-9">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border flex items-center justify-center font-mono text-xs transition-all hover:-translate-y-1 hover:bg-[var(--red)] hover:border-[var(--red)] hover:text-white"
                style={{ borderColor: 'var(--line)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="border-t pt-2" style={{ borderColor: 'var(--line)' }}>
            <div className="mt-6">
              <label className="block font-mono text-[11px] uppercase tracking-wide mb-2" style={{ color: 'var(--ink-dim)' }}>
                Nama kamu
              </label>
              <input
                required
                type="text"
                placeholder="Panggil saya..."
                className="w-full bg-transparent border-b py-2.5 outline-none"
                style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>
            <div className="mt-6">
              <label className="block font-mono text-[11px] uppercase tracking-wide mb-2" style={{ color: 'var(--ink-dim)' }}>
                Email
              </label>
              <input
                required
                type="email"
                placeholder="kamu@email.com"
                className="w-full bg-transparent border-b py-2.5 outline-none"
                style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>
            <div className="mt-6">
              <label className="block font-mono text-[11px] uppercase tracking-wide mb-2" style={{ color: 'var(--ink-dim)' }}>
                Pesan
              </label>
              <textarea
                required
                rows="3"
                placeholder="Ceritakan proyeknya..."
                className="w-full bg-transparent border-b py-2.5 outline-none resize-none"
                style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-7 font-mono font-bold text-xs tracking-widest uppercase px-6 py-3.5 transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--red)', color: '#fff' }}
            >
              Kirim Pesan →
            </button>
            {sent && (
              <p className="mt-4 font-mono text-xs" style={{ color: 'var(--gold)' }}>
                ✓ Pesan terkirim. Saya balas secepatnya.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}