import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base MUST match your GitHub repo name exactly — GitHub Pages serves
// project sites at username.github.io/<repo-name>/, not at the root, so
// every asset path needs that prefix baked in at build time.
// e.g. if your repo is "anukulthakursongs-frontend", base is:
export default defineConfig({
  base: "/anukulthakursongs-frontend/",
  plugins: [react()]
});