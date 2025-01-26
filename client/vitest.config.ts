import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    workspace: [
      {
        extends: true,
        test: {
          environment: 'jsdom',
        },
      },
    ],
  },
  plugins: [tsconfigPaths()],
});
