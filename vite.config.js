import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: 'http://127.0.0.1:8080'
  },
  plugins: [svelte()]
})
