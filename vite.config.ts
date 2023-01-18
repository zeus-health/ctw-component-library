import plugin from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [
    plugin({
      jsxRuntime: "classic",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["es", "cjs"],
      fileName: (ext) => (ext === "es" ? `index.${ext}.js` : `index.${ext}`),
      // for UMD name: 'GlobalName'
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
      ],
    },
    target: "es2015",
    sourcemap: true,
  },
  server: {
    // The host and port must match an allowed callback origin of the Auth0 app.
    host: "localhost",
    port: 3000,
    strictPort: true,
  },
});
