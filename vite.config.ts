import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  assetsInclude: ["**/*.xlsx", "**/*.png"],
  define: {
    global: "window",
  },
});
