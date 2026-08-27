import { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { NAV } from '../data.js';

export default function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md border-b"
      style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', borderColor: 'var(--line)' }}
    >
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto flex items-center justify-between h-[74px]">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 font-display text-xl tracking-wide">
          <span className="text-2xl -skew-x-[15deg] inline-block" style={{ color: 'var(--red)' }}>/</span>
          <div className="text-left">
            <div>RAFIIF.</div>
            <small className="block font-mono text-[10px] tracking-[0.2em] uppercase -mt-1" style={{ color: 'var(--ink-dim)' }}>
              Dev Pemula :V
            </small>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-mono text-xs tracking-widest uppercase pb-1 nav-underline"
              style={{ color: 'var(--ink-dim)' }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex font-mono text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--red)', color: '#fff' }}
          >
            Hire Me
          </button>
          <button className="md:hidden text-xl" onClick={() => setOpen(!open)} aria-label="Menu" style={{ color: 'var(--ink)' }}>
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-5 px-6 pb-6 border-b" style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--ink-dim)' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
