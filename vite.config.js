// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'tailwindcss';`, // Use @use directive to include Tailwind CSS
      },
    },
  },
  plugins: [tailwindcss()], // Ensure Tailwind CSS plugin is included as a function in the plugins array
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'), // Specify the entry point for Vite
      },
    },
  },
});
