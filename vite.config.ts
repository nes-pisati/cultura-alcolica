import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      injectRegister: false,
      injectManifest: {
        globPatterns: ['**/*.{js,mjs,css,html,svg,png,ico,woff2,json,pbf}'],
        globIgnores: ['**/tiles/**', '**/audio/**'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      manifest: {
        id: '/',
        name: 'Cultura Alcolica — Bacaro Tour Venezia',
        short_name: 'Bacaro Tour',
        description: 'Guida a piedi tra i bacari di Venezia, con mappa e audioguida offline.',
        lang: 'it',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f5efe6',
        theme_color: '#7b1f2b',
        icons: [
          { src: '/icone/icona-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icone/icona-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icone/icona-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
})
