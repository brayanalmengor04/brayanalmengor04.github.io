import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return !document.documentElement.classList.contains('light')
    }
    return true
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    const applySystemTheme = (prefersDark) => {
      const darkMode = savedTheme ? savedTheme === 'dark' : prefersDark
      setIsDark(darkMode)
      updateTheme(darkMode)
    }

    applySystemTheme(systemPrefersDark.matches)

    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches)
        updateTheme(e.matches)
      }
    }

    systemPrefersDark.addEventListener('change', handleSystemThemeChange)
    return () => systemPrefersDark.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const updateTheme = (dark) => {
    const root = document.documentElement
    if (dark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
  }

  const toggleTheme = async (event) => {
    const newTheme = !isDark;

    // Fallback: If browser doesn't support View Transitions or user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setIsDark(newTheme);
      updateTheme(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return;
    }

    // Getting the click position for the circular wipe
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;

    // Calculate distance to furthest corner = max radius
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      // DOM updates inside transition
      setIsDark(newTheme);
      updateTheme(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    });

    await transition.ready;

    // The animation creates a circle growing from the click coordinates
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 group relative mb-10 z-50">
      {/* Label — solo desktop */}
      <p className="hidden md:block text-[11px] rotate-90 tracking-widest uppercase opacity-50 transition-opacity group-hover:opacity-80"
        style={{ color: isDark ? '#a5b4fc' : '#5b6abf' }}>
        Mode
      </p>
      <div className="hidden md:block w-px h-10 opacity-20"
        style={{ background: isDark ? '#583ebc' : '#5b6abf' }} />

      {/* Switch pill */}
      <button
        onClick={toggleTheme}
        role="switch"
        aria-checked={!isDark}
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        style={{
          width: '44px',
          height: '80px',
          borderRadius: '999px',
          padding: '4px',
          position: 'relative',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          transition: 'background 0.4s ease, box-shadow 0.3s ease',
          background: isDark
            ? 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)'
            : 'linear-gradient(180deg, #ccfbf1 0%, #e6f7f5 50%, #f0fdf9 100%)',
          boxShadow: isDark
            ? '0 2px 12px rgba(88, 62, 188, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 2px 10px rgba(13, 148, 136, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* Ícono superior — Sol (light) */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: isDark ? 0.25 : 1,
            transition: 'opacity 0.35s ease',
          }}
        >
          <SunIcon
            style={{
              width: '14px',
              height: '14px',
              color: isDark ? '#6366f1' : '#0d9488',
            }}
            strokeWidth={2}
          />
        </div>

        {/* Knob deslizante */}
        <div
          style={{
            position: 'absolute',
            left: '5px',
            right: '5px',
            height: '30px',
            borderRadius: '999px',
            transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease, box-shadow 0.3s ease',
            top: isDark ? 'calc(100% - 35px)' : '5px',
            background: isDark
              ? 'linear-gradient(135deg, #583ebc 0%, #7c3aed 100%)'
              : 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
            boxShadow: isDark
              ? '0 2px 8px rgba(88, 62, 188, 0.5)'
              : '0 2px 8px rgba(13, 148, 136, 0.3)',
          }}
        />

        {/* Ícono inferior — Luna (dark) */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: isDark ? 1 : 0.3,
            transition: 'opacity 0.35s ease',
          }}
        >
          <MoonIcon
            style={{
              width: '14px',
              height: '14px',
              color: isDark ? '#c4b5fd' : '#6b8f8f',
            }}
            strokeWidth={2}
          />
        </div>
      </button>
    </div>
  )
}
