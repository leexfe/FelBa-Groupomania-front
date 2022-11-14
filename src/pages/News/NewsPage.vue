<script>
import CardVue from '../../components/ui/Card/Card.vue'
import PostFormVue from './PostForm.vue'

export default {
  //composant racine NewsPage:
  name: 'NewsPage',
  components: { CardVue, PostFormVue },
  // data à l'initialisation du projet
  data() {
    return {
      userId: localStorage.getItem('userId'),
      isAdmin: localStorage.getItem('isAdmin'),
      posts: [],
      currentUser: null, //currentUser (utilisateur actuel) représente pour l'email
      users:[],
    }
  },
  // beforeCreate() initialise toutes les données et événements réactifs et s'exécute avant que le composant ne soit créé avant d'avoir acces aux données:
  beforeCreate() {
    // Récupère token d'authentification,userId, isAdmin dans localStorage:
    const token = localStorage.getItem('token')
    //redirige l'uilisateur vers la page de connexion si pas de token:
    if (token == null) {
      this.$router.push('/login')
    }
  },

  // MOUNTED permet d’avoir un accès total au composant réactif, aux modèles et au DOM rendu:
  mounted() {
    const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
    }
    // Monte l'appli en faisant un getPosts et récupère tout les posts de l'API pour les afficher sur la page NewsPage:
    fetch(url, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('echec sur le fetch posts')
        }
      })
      .then((res) => {
        //On récupère dans la réponse et on stocke les posts et l'email dans des variables locales:
        const posts = res.posts
        const email = res.email
        console.log('posts du GET:', posts)
        //commenter this.post = posts pour simuler si pas de contenu (DOM vide) et afficher message informatif:
        this.posts = posts
        // affecte la valeur email à la propriété currentUser :
        this.currentUser = email
      })
      .catch((err) => console.log('err:', err))
  },
}
</script>

<template>
  <!-- Affichage de la page NewsPage -->
  <!-- si on a un currentUser(email) affiche la section -->
  <section v-if="currentUser">
    <div class="container-md">
      <h1 class="titre-news text-center mt-3">News</h1>
      <div class="col-sm-12">
        <h2 class="text-center">Bienvenue: {{ currentUser }}</h2>
       
        <div v-if="isAdmin == 'true'">
          <h2 class="text-center">administrateur: {{ isAdmin }}</h2>
        </div>
      </div>
      <!-- Composant du formulaire PostFormVue appelé-->
      <PostFormVue></PostFormVue>
      <div class="ligne_horizontal mt-4 mb-4"></div>
      <!-- si le tableau des posts est nul affiche : "pas de contenu" -->
      <div v-if="posts.length === 0">
        Pas de contenu pour l'instant, exprimez-vous !
      </div>

      <!-- Pour chaque post dans posts, injecte la data récupérée dans les posts de CardVue rendus avec v-for-->
      <div v-for="post in posts" v-bind:key="post">
        <!--  lier les données de l'élément post à l'élément CardVue dynamiquement avec ":" pour BINDER -->
        <CardVue
          :currentUser="currentUser"
          :email="post.user.email"
          :userIdLiker="post.user.id"
          :content="post.content"
          :url="post.imageUrl"
          :comments="post.comments"
          :id="post.id"
          :postingId="post.id"
          :likes="post.likes"
          :userIdPosting="post.userIdPosting"
          :usersLiker="post.usersLiker"
        ></CardVue>
      </div>
    </div>
  </section>
</template>

<style scoped>
body {
	font-family: 'Lato', sans-serif;
}
h1 {
	font-family: 'Lato', sans-serif;
}
h2 {
  font-family: 'Lato', sans-serif;
  font-size: 1em;
  font-weight: bold;
  color: #4e5166;
  margin-block: 0.5em; /*margin vertical */
}
.titre-news {
  font-weight: 700;
  color: #4e5166;
}

.ligne_horizontal {
  display: flex;
  flex-direction: row;
}

.ligne_horizontal:before,
.ligne_horizontal:after {
  content: '';
  flex: 1 1;
  border-bottom: 1px solid #4e5166;
  margin: auto;
}
</style>
