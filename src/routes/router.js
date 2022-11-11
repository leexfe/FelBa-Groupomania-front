import NewsPage from "../pages/News/NewsPage.vue";
import LoginPage from "../pages/LoginPage.vue";


// Instance de vueRouteur qui permet de faire la navigation entre les différentes routes de l'application :
import { createRouter, createWebHistory } from "vue-router";

//Définis les différentes routes auxquelles on assigne une page spécifique représentée par son component :
const routes = [
  { path: "/login", component: LoginPage }, //page publique
  { path: "/signup", component: LoginPage }, //page publique
  { path: "/home", component: NewsPage }, //page privée
  { path: "/", redirect: "/home" },//page privée
];

// Créer un router : createWebHistory() pour créer l'historique du router et la fonction createRouter() pour créer le router:
const router = createRouter({
  history: createWebHistory(),
  routes: routes, // short for `routes: routes`
});

//Fonction de gardes de navigation:
// Vérifie si l'utilisateur est connecté avant de lui permettre d'accéder à une page.
// to: l'emplacement de l'itinéraire cible vers lequel vous naviguez.
// from: l'emplacement actuel de l'itinéraire à partir duquel vous naviguez.
router.beforeEach((to, from) => {
  console.log(
    "from : l'emplacement actuel de l'itinéraire à partir duquel vous naviguez.",
    from
  );
  console.log(
    "to: l'emplacement de l'itinéraire cible vers lequel vous naviguez",
    to
  );
  // console.log("not public page");
  // Ramène sur la page Login si la connexion est requise et que isLoginRequired vaut pour true:
  if (isLoginRequired(to)) {
    return router.push("/login");
  }
});

// Empèche le routeur d'accéder aux autres pages (tout ce qui n'est pas login n'es pas résolu)
//ne fonctionne que pour acceder à login
// Vérifie si une page est privée ou non puis vérifie si un token est présent dans le cache. Si aucun token n'est présent, elle retourne true donc l'utilisateur doit s'authentifier pour accéder à la page.

function isLoginRequired(to) {
  //si on n'est pas sur une page privée retourne faux et stoppe
  if (!isPrivatePage(to)) return false;
  //si on est sur une page privee (on est pas sur une page publique) et qu'on a pas de token ds le cache:
  if (!isTokenInCache()) return true; //retourne true pour il n y a pas de token dans le cache
  //si le token pas valide renvoie vers login:
  return false; //au final retourne false dans router.beforeEach si toute les conditions sont résolues
  // - La fonction isLoginRequired vérifie si une page est privée ou non.
  // - Si la page est privée, elle vérifie si le token est présent dans le cache.
  // - Si le token n'est pas présent dans le cache, cela signifie que l'utilisateur n'est pas connecté et qu'il doit donc se connecter pour accéder à la page.

  //if (!isTokenInCache()) return alert ("token not valid")
  //console.log("OK! we are on a public page or we have token valid ! ");
}

// Définit ce que représente une page privée:
function isPrivatePage(to) {
  const publicPages = ["/login", "/signup"];
  // Les pages privées sont celles qui ne sont pas incluses dans la liste(array) des pages publiques
  // methode array.includes:
  return !publicPages.includes(to.path); // if (to.path !== "/login" && to.path !== "/signup")
}

// Vérifie si le token est dans le cache et renvoie un booléen.
function isTokenInCache() {
  return localStorage.getItem("token") != null;
  //retourne le token si different de null donc isTokenInCache() considéré comme true (vrai)
}

//export router est accessible depuis n'importe où avec export
export { router };
