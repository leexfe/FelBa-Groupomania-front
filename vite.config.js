// Vite utilise l'ESM natif pour regrouper les fichiers JavaScript et les ressources d'application. Et cela permet à Vite de charger des codes instantanément, quelle que soit la taille du fichier.
//Vite utilise le navigateur pour accélérer les rechargements de page complète en exploitant les en-têtes HTTP
//Vite est utilisé pour échafauder une large gamme d'applications frontales car il prend en charge Vue
//Vite est un outil de build qui permet de délivrer le code front-end en utilisant les modules EcmaScript natif et qui utilise Rollup pour le build de production.

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
