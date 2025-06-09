import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  // Ajout pour dev
  esbuild: {
    sourcemap: false
  },
  server: {
    // désactive sourcemap en dev aussi (pas officiel mais ça aide parfois)
    sourcemap: false
  }
})

