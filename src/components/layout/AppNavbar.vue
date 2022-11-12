<script>
import LogoVue from '../ui/Logo.vue'
export default {
  name: 'AppNavbar',
  components: { LogoVue },
  //Les méthodes déclarées sont directement accessibles sur l'instance de composant //Évitez d'utiliser des fonctions fléchées dans methods
  methods: {
    //Supprime le token du localStorage et redirige l'utilisateur vers la page de login:
    logout() {
      localStorage.removeItem('token')
       localStorage.removeItem('isAdmin')
       localStorage.removeItem('userId')
      
      this.$router.go('/login')
    },
  },
}
</script>

<template>
  <header class="p-3 bg-grey">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-around justify-content-lg-start"
      >
        <router-link
          to="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <LogoVue
            class="bi"
            width="200"
            height="32"
            role="img"
            aria-label="Bootstrap"
          />
        </router-link>

        <ul
          class="nav col-12 align-middle col-lg-auto me-lg-auto px-5 mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link
              to="/home"
              class=" deco-none d-flex p-2 margin-left home-color-text"
            >
              Home
            </router-link>
          </li>
        </ul>

        <div class="text-end">

          <button
            @click="logout"
            type="button"
            class="btn btn-outline-light"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

.btn {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  
}
li .margin-left {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  margin-left: 0px;
}

.bg-grey {
  color: #ffffff;
  background-color: #4e5166;
}

.home-color-text {
  color: #ffffff;
  font-weight: 500;
}
.home-color-text:hover {
  color: #ffd7d7;
}

.deco-none {
  text-decoration: none;
}

</style>
