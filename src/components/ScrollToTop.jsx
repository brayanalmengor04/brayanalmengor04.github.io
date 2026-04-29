import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop({ lang = "es" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Usamos window.pageYOffset para mejor compatibilidad móvil
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        const progressPercentage = (scrolled / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, progressPercentage)));
      }
      
      // Mostrar botón después de 300px de scroll
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Ejecución inicial para detectar posición actual
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed z-[10001] left-5 md:left-auto md:right-8 bottom-[100px] md:bottom-10"
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] shadow-2xl hover:border-[var(--accent-primary)] transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-md"
            aria-label={lang === "es" ? "Volver arriba" : "Scroll to top"}
          >
            {/* Círculo de Progreso SVG con Viewbox para mayor precisión */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--border-primary)"
                strokeWidth="4"
                className="opacity-10"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{ 
                   filter: 'drop-shadow(0 0 4px var(--accent-glow))'
                }}
              />
            </svg>

            {/* Icono con animación de hover */}
            <div className="relative z-10">
              <ArrowUp 
                size={22} 
                className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] group-hover:-translate-y-1 transition-all duration-300 ease-out" 
              />
            </div>
            
            {/* Efecto de fondo al pasar el mouse */}
            <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            {/* Glow exterior */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-md bg-[var(--accent-primary)] -z-10 transition-opacity duration-300" />
          </button>

          {/* Label Tooltip (Solo Desktop) */}
          <span className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl transform translate-x-2 group-hover:translate-x-0">
             {lang === "es" ? "Subir" : "Go Up"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
