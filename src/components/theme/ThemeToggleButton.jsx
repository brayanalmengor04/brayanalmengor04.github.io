import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize based on document state if available
    if (typeof window !== 'undefined') {
      return !document.documentElement.classList.contains('light')
    }
    return true // default to dark
  })
  const [isAnimating, setIsAnimating] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    // Function to apply theme
    const applySystemTheme = (prefersDark) => {
      const darkMode = savedTheme ? savedTheme === 'dark' : prefersDark
      setIsDark(darkMode)
      updateTheme(darkMode)
    }

    // Apply initial theme
    applySystemTheme(systemPrefersDark.matches)

    // Listen for system theme changes (only if user hasn't set a preference)
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches)
        updateTheme(e.matches)
      }
    }

    systemPrefersDark.addEventListener('change', handleSystemThemeChange)

    return () => {
      systemPrefersDark.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const updateTheme = (dark) => {
    const root = document.documentElement
    if (dark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
  }

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = !isDark

    setIsDark(newTheme)
    updateTheme(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')

    // Reset animation after delay
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <div className="flex flex-col items-center space-y-4 group relative mb-10 z-50">
      {/* Hide "Mode" text and divider on mobile - Show only on desktop */}
      <p className="hidden md:block text-sm rotate-90 text-secondary transition-colors group-hover:text-primary">
        Mode
      </p>
      <div className="hidden md:block w-px h-12 bg-border-secondary"></div>

      <button
        onClick={toggleTheme}
        className={`
          relative p-3 rounded-full 
          transition-all duration-500 ease-out
          transform cursor-pointer
          ${isAnimating ? 'rotate-180' : 'hover:rotate-12'}
          ${isDark
            ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700'
            : 'bg-gradient-to-br from-[#e77a5f] via-[#c85a3f] to-[#a84832]'
          }
          hover:shadow-2xl
          active:scale-95
        `}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className={`transition-all duration-500 ${isAnimating ? 'rotate-180 scale-75' : ''}`}>
          {isDark ? (
            <SunIcon
              className="w-5 h-5 text-amber-100 drop-shadow-glow animate-pulse"
              strokeWidth={2.5}
            />
          ) : (
            <MoonIcon
              className="w-5 h-5 text-orange-50 drop-shadow-glow animate-pulse"
              strokeWidth={2.5}
            />
          )}
        </div>

        {/* Glow effect */}
        <div
          className={`
            absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            ${isDark
              ? 'bg-gradient-to-r from-purple-400 to-indigo-400 blur-xl'
              : 'bg-gradient-to-r from-[#e77a5f]/60 to-[#c85a3f]/60 blur-xl'
            }
            -z-10
          `}
        ></div>
      </button>
    </div>
  )
}
