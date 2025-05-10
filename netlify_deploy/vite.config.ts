import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Config for Netlify static deployment
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
      "@shared": path.resolve("./shared"),
      "@assets": path.resolve("./attached_assets"),
    },
  },
  root: path.resolve("./client"),
  // Configure build to output to dist directory
  build: {
    outDir: path.resolve("./dist"),
    emptyOutDir: true,
  },
});
