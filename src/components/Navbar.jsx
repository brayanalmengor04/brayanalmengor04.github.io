import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Estado para rastrear el enlace activo

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Service", id: "service" },
    { name: "Skill", id: "skill" },
    { name: "Resume", id: "portfolio" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id) => {
    setActiveLink(id); // Actualiza el enlace activo
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 w-full flex justify-center font-medium z-40">
      <nav className="w-[90%] flex items-center bg-secondary border-3 rounded-full px-2 py-2 mt-6 relative" style={{ borderColor: 'var(--border-secondary)' }}>
        {/* Menú para escritorio */}
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
              {/* Imagen de fondo */}
              <img
                src="/logo/logo.png"
                alt="Logo"
                className="absolute p-1 rounded-full object-cover transition-opacity duration-300"
              />
              {/* Overlay con "BA" que aparece al hacer hover */}
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

        {/* Menú para móvil */}
        <div className="md:hidden flex w-full justify-between items-center px-4">
          <span
            onClick={() => handleLinkClick("home")}
            className="relative w-12 h-12 bg-theme-magenta-blue text-white flex items-center justify-center rounded-full p-2 font-bold cursor-pointer overflow-hidden"
          >
            {/* Imagen de fondo */}
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="absolute p-1 rounded-full object-cover transition-opacity duration-300"
            />
            {/* Overlay con "BA" que aparece al hacer hover */}
            <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black/60 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
              BA
            </span>
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-white focus:outline-none"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
        {/* Menú desplegable en móvil */}
        {isOpen && (
          <ul className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[95%] rounded-xl shadow-2xl p-5 flex flex-col gap-4 md:hidden transition-all duration-300" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)' }}>
            {navLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => handleLinkClick(link.id)}
                className={`text-center rounded-lg p-3 cursor-pointer transition-all duration-300 ${activeLink === link.id ? "scale-105 text-white" : "text-theme-primary"
                  }`}
                style={{
                  background: activeLink === link.id ? "var(--accent-primary)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "var(--accent-primary)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.id) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
              >
                <span>{link.name}</span>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
