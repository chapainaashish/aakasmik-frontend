import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';



const manifestForPlugIn: Partial<VitePWAOptions> = { 
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: 'Aakasmik',
    short_name: 'Aakasmik',
    description: 'Search and Find Emergency Contacts Near You',
    icons: [
        {
            src: 'public/pwa-64x64.png',
            sizes: '64x64', 
            type: 'image/png',
            purpose:'favicon'
        },
        {
            src: 'public/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
        },
        {
            src: 'public/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose:'apple touch icon',
        },
        {
            src: 'public/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: 'public/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
        }
    ],
    theme_color:'#171717',
    background_color:'#f0e7db',
    display:"standalone",
    scope:'/',
    start_url:"/",
    orientation:'portrait'
  }, 
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  envDir: '.', 
})
