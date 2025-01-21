import { defineConfig, loadEnv } from 'vite';
import * as dotenv from 'dotenv';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const MODE = process.env.NODE_ENV || 'production';

  const host = process.env.HOST;
  const port = +(process.env.PORT || 5000);
  const playMode = process.env.PLAY_MODE || 'single';

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      'process.env': {
        MODE,
      },
    },
    server: {
      host,
      port,
      playMode,
    },
    base: mode === 'development' ? '/' : '/plat-game-template/',
    build: {
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        keep_classnames: true,
      },
    },
    plugins: [tsconfigPaths()],
  };
});
