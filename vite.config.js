// path: vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // <- remove tailwindcss()
  server: { port: 5173, host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  // You don't need custom esbuild JSX loaders with @vitejs/plugin-react.
  // If you really want them, keep—but they’re redundant.
});
