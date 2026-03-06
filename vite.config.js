import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'd3-vendor': ['d3', 'topojson-client'],
          'animation-vendor': ['gsap', 'gsap/ScrollTrigger', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
