import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
