<script>
export default {
  name: 'PostForm',
  data: function () {
    return {
      content: '',
      selectedImage: null,
    }
  },
  methods: {
    // manipule et ajoute une nouvelle image dans this.selectedImage:
    handleNewImageFile: function (event) {
      const file = event.target.files[0]
      console.log('file', file)
      this.selectedImage = file
    },

    // Envoie les donées au serveur pour créer un nouveau post:
    sendToCreatePost: function () {
      //importe et recupère server address et port dans fichier .env (variable environnement):
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
      //définis l'url du POST:
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
      // Créer une nouvelle instance de FormData (vide).
      const formData = new FormData()
      // Ajoute les valeurs du contenu dans 'content'('clé', valeur):
      formData.append('content', this.content)
      // Ajoute les valeurs de l'image selectionnée dans 'image':
      formData.append('image', this.selectedImage)
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
        method: 'POST',
        body: formData,
      }
      fetch(url, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error('Failed to fetch posts')
          }
        })
        .then((res) => {
          console.log('res dans PostForm:', res)
          //reload la page pour afficher tout les posts récupérés :
          this.$router.go()
        })
        .catch((err) => console.log('err:', err))
    },
  },
}
</script>

<template>
  <!-- Formulaire -->
  <div class="mt-4">
    <!-- affiche le contenu du post en simultané  avec v-model="content"-->
    <div class="content-empty">
      <input
        text="text"
        class="form-control police pb-5 mb-3"
        v-model="content"
        placeholder="Postez vos News..."
        aria-label="Postez vos News..."
      />
    </div>

    <div class="d-flex">
      <label for="file-input" class="btn btn-secondary mt-1 me-1">
        Ajouter une image
      </label>
      <!-- @change écoute et met à jour le fichier ajouté (l'image sélectionnée)  -->
      <input id="file-input" type="file" @change="handleNewImageFile" />
      <button
        v-if="content || selectedImage"
        type="button"
        class="btn bg-color mt-1"
        @click="sendToCreatePost"
      >
        Envoyer
      </button>
      <!-- affiche et informe quelle image a été sélectionnée :  -->
      <span class="span" v-if="selectedImage">{{ selectedImage.name }}</span>
    </div>
  </div>
</template>

<style>
.police {
  font-family: 'Lato', sans-serif;
  font-weight: 600!important;
}
.span {
  font-size: 0.8rem;
  padding-top: 14px;
  padding-left: 5px;
}

.form-control {
  font-weight: 600;
  height: auto;
  min-height: 2rem;
}
div.form-control:empty:not(:focus)::before {
  content: attr(data-text);
  color: #a0a0a0;
  display: block;
  position: absolute;
}

label[for='file-input'] {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  background-color: #e79f9f;
  color: #4e5166;
  border: 1px solid #4e5166;
}

label[for='file-input']:hover {
  background-color: #4e5166;
  color: #ffff;
}

input {
  display: none;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
}

button.bg-color {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  background-color: #ffd7d7;
  color: #4e5166;
  border: 1px solid #4e5166;
}
button.bg-color:hover {
  background-color: #4e5166;
  color: #ffff;
}
</style>
