import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Service", id: "service" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];
  // Cierra el menú móvil al hacer clic en un enlace
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="fixed top-0 w-full flex justify-center font-medium z-40">
      <nav className="w-[90%] flex items-center bg-primary-light border-3 border-[var(--color-theme-dark-light)] rounded-full px-2 py-2 mt-6 relative">
        {/* Menú para escritorio */}
        <ul className="w-full flex items-center justify-between text-white md:flex hidden">
          {navLinks.slice(0, 3).map((link, index) => (
            <li
              key={index}
              className={`flex-1 text-center rounded-full p-3 cursor-pointer ${
                index === 0 ? "bg-theme-magenta-blue" : "hover:bg-theme-magenta-blue"
              }`}
            >
              <a href={`#${link.id}`} className="px-5 py-5 text-white">
                {link.name}
              </a>
            </li>
          ))}
          {/* BA en el centro, vinculado a "Home" */}
          <li className="flex-1 flex justify-center cursor-pointer">
            <a
              href="#home"
              className="bg-theme-magenta-blue text-white flex items-center justify-center rounded-full p-2 font-extrabold"
            >
              BA
            </a>
          </li>
          {navLinks.slice(3).map((link, index) => (
            <li
              key={index}
              className="flex-1 text-center hover:bg-theme-magenta-blue rounded-full p-3 cursor-pointer"
            >
              <a href={`#${link.id}`}>{link.name}</a>
            </li>
          ))}
        </ul>
        {/* Menú para móvil */}
        <div className="md:hidden flex w-full justify-between items-center px-4">
          <a
            href="#home"
            className="w-12 h-12 bg-theme-magenta-blue text-white flex items-center justify-center rounded-full p-2 font-bold"
          >
            BA
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-white focus:outline-none"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
        {isOpen && (
          <ul className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[95%] bg-primary-light/90 backdrop-blur-md rounded-xl shadow-2xl p-5 flex flex-col gap-4 md:hidden transition-all duration-300">
            {navLinks.map((link, index) => (
              <li
                key={index}
                onClick={handleLinkClick}
                className="text-center text-white hover:bg-theme-magenta-blue hover:scale-105 transition-all duration-200 rounded-lg p-3 cursor-pointer"
              >
                <a href={`#${link.id}`}>{link.name}</a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
