import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Gymapp/',
  server: {
    host: true, // Expone el servidor en la red local para abrirlo directamente en el móvil
    port: 5173,
  },
})
