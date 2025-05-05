import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    console.log("isDark:", isDark); 
    
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev); 
    console.log("click aqui")
  }

  return (
    <div className="flex flex-col items-center space-y-4 group relative mb-10 z-10122222212030123001241204021"
    >
      <p className="text-sm rotate-90 text-gray-300 group-hover:text-white transition">Mode</p>
      <div className="w-px h-12 bg-gray-500"></div>

      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-full bg-white transition-all duration-300 transform hover:scale-125 hover:rotate-6 hover:shadow-lg hover:bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer"
      >
        {isDark ? (
          <SunIcon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300 animate-pulse" />
        ) : (
          <MoonIcon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300 animate-pulse" />
        )}
      </button>
    </div>
  )
}
