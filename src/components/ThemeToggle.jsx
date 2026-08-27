export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-9 h-9 rounded-full border flex items-center justify-center transition-transform hover:rotate-[20deg] hover:border-[var(--gold)]"
      style={{ borderColor: 'var(--line)' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  );
}
