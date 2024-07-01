import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  base: "/shopping-list/",
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: "happy-dom",
    setupFiles: './src/setupTests.ts'
  }
})
