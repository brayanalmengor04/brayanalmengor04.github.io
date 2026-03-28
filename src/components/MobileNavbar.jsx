import React, { useState, useEffect } from "react";
import { Home, Briefcase, Code, Award, FolderHeart, Mail } from "lucide-react";

export default function MobileNavbar({ activeLink, handleLinkClick, lang }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Muestra si sube, oculta si baja (después de 50px de tolerancia inicial)
      if (currentScrollY > prevScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY) {
        setIsVisible(true);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: lang === "es" ? "Inicio" : "Home", id: "home", icon: Home },
    { name: lang === "es" ? "Experiencia" : "Experience", id: "experience-services", icon: Briefcase },
    { name: lang === "es" ? "Habilidades" : "Skill", id: "skill", icon: Code },
    { name: lang === "es" ? "Certificados" : "Certifications", id: "certifications", icon: Award },
    { name: lang === "es" ? "Portafolio" : "Portfolio", id: "portfolio", icon: FolderHeart },
    { name: lang === "es" ? "Contacto" : "Contact", id: "contact", icon: Mail },
  ];

  return (
    <div
      className="md:hidden fixed bottom-6 z-[9999]"
      style={{
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '120px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
        width: 'min(95vw, 400px)',
        pointerEvents: 'none',
        // Nunca desbordarse horizontalmente
        maxWidth: '100vw',
      }}
    >
      <nav
        className="flex justify-between items-center rounded-[2rem] px-2 py-2 shadow-2xl border transition-all duration-300"
        style={{
          background: "var(--bg-secondary)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "var(--border-secondary)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
          pointerEvents: 'auto',
          width: '100%',
        }}
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeLink === link.id;

          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative flex flex-col items-center justify-center rounded-full transition-all duration-500 ease-out cursor-pointer ${isActive ? "scale-110 shadow-lg" : "hover:scale-105 opacity-60 hover:opacity-100"}`}
              style={{
                background: isActive ? "var(--accent-primary)" : "transparent",
                color: isActive ? "#ffffff" : "var(--text-primary)",
                width: '3rem',
                height: '3.2rem',
                flexShrink: 0,
              }}
              aria-label={link.name}
            >
              <Icon
                size={isActive ? 20 : 24}
                className={`transition-all duration-500 ease-out ${isActive ? "translate-y-[-0.4rem]" : "translate-y-0"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <span
                  className="text-[0.6rem] font-bold absolute bottom-1.5 opacity-100 transition-opacity duration-500 tracking-wide"
                  style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {link.name.substring(0, 5)}...
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
