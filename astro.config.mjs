// @ts-check
import './console-logger.mjs';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],

  vite: {
    cacheDir: '.vite-cache',
    plugins: [/** @type {any} */ (tailwindcss())],
    ssr: {
      noExternal: ['gsap'],
    },
  },

  adapter: netlify(),
});