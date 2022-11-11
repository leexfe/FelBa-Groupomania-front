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
</div>
</template>



<style scoped>
 
</style>
