/// <reference types="vitest" />
import path from "path"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { defineConfig as defineConfigVitest } from 'vitest/config';

export default defineConfigVitest({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
