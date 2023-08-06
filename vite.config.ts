import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/in-browser-markdown-editor/",
  plugins: [vue()],
});
