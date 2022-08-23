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
      fileName: (ext) => `index.${ext}.js`,
      // for UMD name: 'GlobalName'
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
    },
    target: "es2015",
    sourcemap: true,
  },
});
