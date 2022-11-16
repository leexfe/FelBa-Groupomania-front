<script>
  import AppNavbar from "./components/layout/AppNavbar.vue";

  export default {
    name: "App",
    components: {
       AppNavbar
    }
  }
</script>

<template>
<div>
  <!-- <h1>BIENVENUE SUR GROUPOMANIA</h1> -->
  <AppNavbar/>
  <!-- le routeur résout et injecte tout le contenu de la navbar -->
 <router-view></router-view>
 <!-- définit la zone de la page dans laquelle apparaîtra le composant que nous définissons dans chaque route -->
 <!-- important si on imbrique des vues les unes dans les autres -->
</div>
</template>

<style scoped>
</style>
