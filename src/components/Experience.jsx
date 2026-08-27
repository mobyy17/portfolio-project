import { SectionLabel } from './Shared.jsx';
import Reveal from './Reveal.jsx';
import { EXPERIENCE, PROJECTS } from '../data.js';

export default function Experience() {
  return (
    <section id="experience" className="py-28 border-y" style={{ background: 'var(--bg2)', borderColor: 'var(--line)' }}>
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto">
        <SectionLabel num="02" label="Experience" />
        <h2 className="font-display uppercase leading-[0.86]" style={{ fontSize: 'clamp(2.6rem,6vw,4.6rem)' }}>
          Jejak <span style={{ color: 'var(--red)' }}>perjalanan.</span>
        </h2>

        <div className="max-w-3xl mt-12">
          {EXPERIENCE.map((item, i) => (
            <Reveal key={i} delay={i * 80} className="relative pl-9 pb-10 last:pb-0 border-l" style={{ borderColor: 'var(--line)' }}>
              <span
                className="absolute -left-[6.5px] top-0.5 w-3 h-3 rounded-full border-2"
                style={{ background: 'var(--bg2)', borderColor: 'var(--red)' }}
              ></span>
              <div className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{item.date}</div>
              <div className="font-jp font-bold text-2xl mt-1.5">{item.role}</div>
              <div className="font-mono text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>{item.co}</div>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{item.copy}</p>
              <div className="flex flex-wrap gap-2 mt-3.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wide uppercase border px-2.5 py-1"
                    style={{ borderColor: 'var(--line)', color: 'var(--ink-dim)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <SectionLabel num="03" label="Selected Projects" />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 100}
                className="border transition-transform hover:-translate-y-1.5 group"
                style={{ borderColor: 'var(--line)', background: 'var(--card)' }}
              >
                <div
                  className="h-[150px] flex items-center justify-center"
                  style={{ backgroundImage: 'repeating-linear-gradient(135deg, var(--line) 0 2px, transparent 2px 18px)' }}
                >
                  <div className="w-4/5 border font-mono text-xs p-3" style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--gold)' }}>
                    <div className="flex gap-1.5 mb-2">
                      <i className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--red)' }}></i>
                      <i className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--red)' }}></i>
                      <i className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--red)' }}></i>
                    </div>
                    {p.term[0]}
                    <br />
                    {p.term[1]}
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{p.tag}</span>
                  <h3 className="font-jp font-bold text-xl mt-2">{p.name}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{p.desc}</p>
                  <a href="#" className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                    Lihat detail ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}