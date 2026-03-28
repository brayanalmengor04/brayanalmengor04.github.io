import React, { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";

export default function Navbar({ lang = "es" }) {
  const [activeLink, setActiveLink] = useState("home");
  const [currentLang, setCurrentLang] = useState(lang);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const navLinks = [
    { name: lang === "es" ? "Inicio" : "Home", id: "home" },
    { name: lang === "es" ? "Experiencia" : "Experience", id: "experience-services" }, // Updated label
    { name: lang === "es" ? "Habilidades" : "Skill", id: "skill" },
    { name: lang === "es" ? "Certificaciones" : "Certifications", id: "certifications" }, // New Certifications link
    { name: lang === "es" ? "Portafolio" : "Portfolio", id: "portfolio" },
    { name: lang === "es" ? "Contacto" : "Contact", id: "contact" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -45% 0px", // Adjusts the "active" area to be around the center-top
      threshold: [0, 0.1, 0.2, 0.5], // Multiple thresholds for better granularity
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) observer.unobserve(section);
      });
    };
  }, [navLinks]);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hidden md:flex fixed top-0 w-full justify-center font-medium z-40">
        <nav className="w-[90%] flex items-center bg-secondary border-3 rounded-full px-2 py-2 mt-6 relative" style={{ borderColor: 'var(--border-secondary)' }}>
          {/* Desktop Menu */}
          <ul className="w-full flex items-center justify-between text-theme-primary md:flex hidden">
            {navLinks.slice(0, 3).map((link, index) => (
              <li
                key={index}
                onClick={() => handleLinkClick(link.id)}
                className={`flex-1 text-center rounded-full p-3 cursor-pointer transition-all duration-300 ${activeLink === link.id ? "scale-105" : ""
                  }`}
                style={{
                  background: activeLink === link.id ? "var(--accent-primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "var(--accent-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="px-5 py-5">{link.name}</span>
              </li>
            ))}

            <li className="flex-1 flex justify-center cursor-pointer relative">
              <span
                onClick={() => handleLinkClick("home")}
                className="relative w-13 h-13 bg-theme-magenta-blue text-white flex items-center justify-center rounded-full p-2 font-extrabold relative overflow-hidden"
              >
                <img
                  src="/logo/logo.png"
                  alt="Logo"
                  className="absolute p-1 rounded-full object-cover transition-opacity duration-300"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black/60 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                  BA
                </span>
              </span>
            </li>

            {navLinks.slice(3).map((link, index) => (
              <li
                key={index}
                onClick={() => handleLinkClick(link.id)}
                className={`flex-1 text-center rounded-full p-3 cursor-pointer transition-all duration-300 ${activeLink === link.id ? "scale-105" : ""
                  }`}
                style={{
                  background: activeLink === link.id ? "var(--accent-primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "var(--accent-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="px-5 py-5">{link.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Application Bottom Navigation */}
      <MobileNavbar activeLink={activeLink} handleLinkClick={handleLinkClick} lang={lang} />
    </>
  );
}
