import React, { useState, useEffect } from 'react';
import { Settings, Instagram, Linkedin, Moon, Sun, Languages, X } from 'lucide-react';

export default function FloatingMenu({ lang = "es" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(!document.documentElement.classList.contains('light'));
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const targetUrl = lang === 'es' ? '/en' : '/';

  // Social URLs
  const instagramUrl = "https://www.instagram.com/aabj_cx";
  const linkedinUrl = "https://www.linkedin.com/in/brayan-antonio/";

  const toggleMenu = () => setIsOpen(!isOpen);

  // Menu items config
  const menuItems = [
    {
      id: 'lang',
      icon: <Languages size={20} />,
      label: lang === 'es' ? 'EN' : 'ES',
      href: targetUrl
    },
    {
      id: 'theme',
      icon: isDark ? <Sun size={20} /> : <Moon size={20} />,
      label: isDark ? 'Light' : 'Dark',
      onClick: toggleTheme
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={20} />,
      href: linkedinUrl
    },
    {
      id: 'instagram',
      icon: <Instagram size={20} />,
      href: instagramUrl
    }
  ];

  return (
    <div className="md:hidden fixed bottom-[100px] right-5 z-[9999] flex flex-col items-center">
      {/* Overlay opcional para tapar cuando está abierto, lo omitimos para mantenerlo sutil */}

      {/* Menu Options */}
      <div
        className={`flex flex-col-reverse items-center gap-3 mb-4 transition-all duration-300 ease-in-out origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
          }`}
      >
        {menuItems.map((item, i) => {
          const ItemTag = item.href ? 'a' : 'button';
          return (
            <ItemTag
              key={item.id}
              href={item.href}
              onClick={item.onClick}
              target={item.href && item.id !== 'lang' ? "_blank" : undefined}
              rel={item.href ? "noreferrer" : undefined}
              className={`group flex items-center justify-center w-[48px] h-[48px] rounded-full shadow-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:scale-110 transition-all duration-200 focus:outline-none`}
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.icon}
              {item.label && (
                <span className="absolute right-14 px-2 py-1 rounded-md bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border-primary)] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </ItemTag>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleMenu}
        aria-label="Abrir menú de ajustes rápidos"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--color-neon-blue)] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--accent-glow)] z-10"
      >
        {/* Glow de fondo */}
        <div className="absolute inset-0 rounded-full bg-inherit blur-md opacity-50 -z-10"></div>
        {isOpen ? <X size={26} className="animate-in spin-in-90 duration-300" /> : <Settings size={26} className="animate-in zoom-in duration-300" />}
      </button>

      <style>{`
        /* Animaciones para el icono de Settings/Close */
        .animate-in {
          animation-fill-mode: both;
        }
        @keyframes spin-in-90 {
          from { transform: rotate(-90deg) scale(0); opacity: 0; }
          to { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .spin-in-90 { animation: spin-in-90 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .zoom-in { animation: zoom-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
}
