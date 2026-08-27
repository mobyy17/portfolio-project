import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Marquee } from './components/Shared.jsx';
import Profile from './components/Profile.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('kenta-theme') || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('kenta-theme', theme);
  }, [theme]);

  return (
    <div className="grain">
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Marquee />
      <Profile />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
