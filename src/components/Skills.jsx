import { SectionLabel } from './Shared.jsx';
import Reveal from './Reveal.jsx';
import { SKILLS } from '../data.js';

export default function Skills() {
  return (
    <section id="skills" className="py-28 border-b" style={{ background: 'var(--bg2)', borderColor: 'var(--line)' }}>
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto">
        <SectionLabel num="04" label="Toolkit" />
        <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-14">
          <Reveal>
            <h2 className="font-display uppercase leading-[0.86]" style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>
              Senjata
              <br />
              <span style={{ color: 'var(--red)' }}>andalan.</span>
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
              Stack yang saya pakai buat bangun produk dari ide sampai production, cepat dan stabil.
            </p>
          </Reveal>
          <Reveal delay={120}>
            {SKILLS.map((s) => (
              <div key={s.name} className="mb-6">
                <div className="flex justify-between font-mono text-xs mb-2" style={{ color: 'var(--ink-dim)' }}>
                  <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{s.name}</b>
                  <span>{s.level}%</span>
                </div>
                <div className="h-1.5" style={{ background: 'var(--line)' }}>
                  <div className="h-full bar-fill" style={{ width: `${s.level}%` }}></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}