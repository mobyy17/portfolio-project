export default function Footer() {
  return (
    <footer className="py-8 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="w-[min(1180px,calc(100%-48px))] mx-auto flex flex-wrap justify-between items-center gap-3">
        <small className="font-mono text-[11px] tracking-wide" style={{ color: 'var(--ink-dim)' }}>
          © 2025 KENTA WIJAYA — BUILT WITH CODE & COFFEE
        </small>
        <small className="font-mono text-[11px] tracking-wide" style={{ color: 'var(--ink-dim)' }}>
          TOKYO STYLE · MADE AFTER MIDNIGHT
        </small>
      </div>
    </footer>
  );
}
