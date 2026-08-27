export function Marquee() {
  const text = 'FULL STACK DEVELOPER + BASED IN JAKARTA + NO SLEEP TILL DEPLOY + RUN WITH CLEAN CODE +';
  return (
    <div className="overflow-hidden whitespace-nowrap border-y py-3" style={{ background: 'var(--red)', borderColor: 'var(--red-dim)' }}>
      <div className="inline-flex gap-10 marquee-track">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#f4ecd8' }}>
          {text} {text}
        </span>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#f4ecd8' }}>
          {text} {text}
        </span>
      </div>
    </div>
  );
}

export function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-3.5 mb-11">
      <span className="font-mono text-xs font-bold" style={{ color: 'var(--ink)' }}>{num}</span>
      <span className="h-px w-10" style={{ background: 'var(--line)' }}></span>
      <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{label}</span>
    </div>
  );
}
