// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',            // ensure it’s pointing at client folder
  server: { port: 3000 } // or whatever port you prefer
})
