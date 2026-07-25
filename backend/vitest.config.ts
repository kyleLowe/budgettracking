import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.vitest.{ts,js}'],
    setupFiles: ['dotenv/config'],
    globals: false
  }
});