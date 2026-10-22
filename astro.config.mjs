// @ts-check
import './console-logger.mjs';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

const ghPages = process.env.ASTRO_GH_PAGES === "true";

// https://astro.build/config
export default defineConfig({
  site: "https://brayanalmengor04.github.io",
  integrations: [react(), icon()],
  ...(ghPages ? { output: "static" } : { adapter: netlify() }),

  vite: {
    cacheDir: '.vite-cache',
    plugins: [/** @type {any} */ (tailwindcss())],
    ssr: {
      noExternal: ['gsap'],
    },
  },
});