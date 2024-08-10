
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // base: './', // Ruta base relativa, útil para GitHub Pages o Netlify
  plugins: [react()],
  base: "/brayanalmengor04.github.io/",
})
