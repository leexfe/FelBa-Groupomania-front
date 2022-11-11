// main.js est appelé dans index.html

//Importe la bibliothèque vue.js:
import { createApp } from "vue";
// Importe la bibliothèque BootstrapVue3:
import BootstrapVue3 from "bootstrap-vue-3";
// Importe la variable router:
import {router} from "./routes/router"
// Importe le fichier App.vue :
import App from "./App.vue";

// Importe ensemble des règles css:
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

// Créer une instance vue et l'attache à l'élément app qui va contenir l'application Vue.js:
//Ne prend encharge que les balises component  de vueJS
const app = createApp(App);

// Utilise la variable router comme routeur pour l'application Vue.js
app.use(router);

// Utilise la bibliothèque BootstrapVue3 pour l'application Vue.js.
app.use(BootstrapVue3);

//injecte dans la div avec selecteur id="app" sue la page index.html :
app.mount("#app");




