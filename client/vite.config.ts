import react from "@vitejs/plugin-react-swc";
import * as dotenv from "dotenv";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

const ReactCompilerConfig = {
  target: "19", // '17' | '18' | '19'
};

dotenv.config({
  path: path.join(path.resolve(), ".env"),
});

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const MODE = process.env.NODE_ENV || "production";

  const host = process.env.HOST;
  const port = +(process.env.PORT || 5000);
  const VERSION = pkg.version;

  const SOCKET_URL =
    MODE === "production" ? process.env.SOCKET_URL : "ws://localhost:9001";

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        MODE,
        SOCKET_URL,
        VERSION,
      },
    },
    server: {
      host,
      port,
    },
    base: mode === "development" ? "/" : "/plat-game-template/",
    build: {
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        keep_classnames: true,
      },
    },
    plugins: [
      react({
        // @ts-ignore
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
      tsconfigPaths(),
    ],
  };
});
