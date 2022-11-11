import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import "dotenv/config";
console.log(process.env);
console.log(process.env.VITE_SERVER_ADDRESS);
console.log(process.env.VITE_SERVER_PORT);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
