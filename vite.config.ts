import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// ✅ Full optimized config for your Attendance Management web app
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['placeholder.svg', 'robots.txt'],
      manifest: {
        name: 'Attendance Management System',
        short_name: 'Attendance',
        description: 'Bangla Attendance Tracker Web App (Offline Ready)',
        theme_color: '#22c55e',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        orientation: 'portrait',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,txt}'],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],

  // ✅ Path alias for "@"
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ✅ Ensures correct base path for GitHub Pages or local hosting
  base: './',

  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
