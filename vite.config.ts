import { defineConfig, mergeConfig } from 'vite'
import { UserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const vitestConfig: UserConfig = {
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: "happy-dom",
    setupFiles: './src/setupTests.ts'
  }
};

// https://vitejs.dev/config/
export default mergeConfig(vitestConfig, defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  base: "/shopping-list/"
}));
