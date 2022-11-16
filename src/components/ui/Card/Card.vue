<script>
import axios from 'axios'
import AvatarVue from '../Avatar.vue'
import CommentVue from './Comment.vue'
import { url } from './../../../services/fetchOptions'

export default {
  name: 'Card',
  components: {
    CommentVue,
    AvatarVue,
  },

  //props represente pour les attributs nommés entre les balises du composant <cardVue> sur la page NewsPage.vue:
  props: [
    'currentUser',
    'email',
    'content',
    'url',
    'comments',
    'id',
    'postingId',
    'likes',
    'userIdPosting',
    'usersLiker',
    'userIdLiker',
  ],

  data() {
    return {
      userId: localStorage.getItem('userId'),
      isAdmin: localStorage.getItem('isAdmin'),
      currentComment: null,
      isActive: false,
      isLiked: '',
      selectedModifImage: null,
      usersLiker: this.$props.usersLiker,
      liked:'',
    }
  },

  beforeCreate() {
    // Récupère token d'authentification, userId, isAdmin dans localStorage:
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    //redirige l'uilisateur vers la page de connexion si pas de token:
    if (token == null) {
      this.$router.push('/login')
    }
  },

  methods: {
    // Envoie la data au serveur pour crér un nouveau commentaire puis récupère la réponse dans le DOM:
    sendToCreateComment() {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          comment: this.currentComment,
        }),
      }
      //postId: this.$props.id n'est pas dans body car on le passe en param dans l'url
      fetch(url + 'posts/' + this.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error('Failed to fetch posts')
          }
        })
        .then((res) => {
          console.log('res from sendToCreateComment:', res)
          //rafraichit la page pour afficher le nouveau commentaire:
          this.$router.go()
        })
        .catch((err) => console.log('err:', err))
    },

    // Manipule et ajoute une nouvelle image dans this.selectedImage:
    handleModifImageFile(event) {
      const file = event.target.files[0]
      this.selectedModifImage = file
    },

    // Envoie la data(contenu texte + nouvelle image) au serveur et Met à jour le post modifié puis récupère la réponse dans le DOM :
    sendToUpdatePost() {
      const formData = new FormData()
      // Ajoute les valeurs du contenu dans 'content':
      formData.append('content', this.content)
      // Ajoute les valeurs du contenu dans 'image':
      formData.append('image', this.selectedModifImage)
      const options = {
        // pas de content-type : 'multipart/form-data' dans headers car middleware upload-image utilise déjà multer pour lire les données en Form/Data:
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
        method: 'PUT',
        body: formData,
      }
      //postId: this.$props.id passé en param dans l'url:
      fetch(url + 'posts/' + this.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error('Failed to fetch posts')
          }
        })
        .then((res) => {
          console.log('res from sendToUpdatePost:', res)
          //rafraichit la page pour afficher le com:
          this.$router.go()
        })
        .catch((err) => console.log('err:', err))
    },

    // Envoie au serveur l'id du post à delete:
    sendTodeletePost() {
      fetch(url + 'posts/' + this.$props.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'DELETE',
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error('Failed to delete post')
          }
        })
        .then((res) => {
          console.log('res:', res)
          this.$router.go()
        })
        .catch((err) => console.log('err:', err))
    },

    sendToLikePost(e) {
      const isLiked = this.isLiked
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/`

      if (isLiked) {
        this.usersLiker.push(this.userId)
      } else {
        this.usersLiker = this.usersLiker.filter((id) => id !== this.userId)
      }

      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
      }
      //postId: this.$props.id n'est dans le body car on le passe en param dans l'url
      fetch(url + 'posts/' + this.id + '/like', options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error('Failed to fetch posts')
          }
        })
        .then((res) => {
          console.log('res from sendToLike:', res)
        })
        .catch((err) => console.log('err:', err))
    },
    generateInputId(id) {
      return 'inputFile' + id
    },
  },
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-header d-flex">
      <img
        src="./../../../assets/avatar-circle.png"
        class="rounded-circle shadow-4 mt-1 mb-1"
        style="width: 30px;"
        alt="Avatar"
      />
      <div class="bold">{{ email }} a posté :</div>
    </div>
    <div class="card-body">
      <p class="card-text dispost pt-1 pb-3">
        {{ content }}
      </p>

      <button
        v-if="currentUser === email || isAdmin == 'true'"
        type="button"
        class="btn bg-color ms-auto rounded-pill center-vert me-4 mb-1"
        @click="isActive = !isActive"
      >
        <i class="bi bi-pencil-square"></i>
        Modifier le Post
      </button>

      <button
        v-if="currentUser === email || isAdmin == 'true'"
        type="button"
        class="btn bg-color ms-auto rounded-pill center-vert mb-1"
        @click="sendTodeletePost"
      >
        <i class="bi bi-trash"></i>
        Supprimer
      </button>

      <!----------- div Modif -------------- -->
      <div>
        <p class="card-text border-comment"></p>
        <div class="mt-4" v-show="isActive">
          <div class="d-flex bold">
            <p>Modifiez votre Post ci-dessous :</p>
            <i class="bi bi-arrow-down-square ms-2"></i>
          </div>

          <div class="content-empty">
            <input
              class="form-control mb-3"
              v-model="content"
              placeholder="Modifiez votre post..."
              aria-label="Modifiez votre post..."
            />
          </div>

          <div class="d-flex mb-4">
            <label
              :for="generateInputId(postingId)"
              class="modif-style btn btn-secondary mt-1 me-1"
            >
              Modifier l'image
            </label>
            <input
              :id="generateInputId(postingId)"
              type="file"
              ref="fileToUpload"
              @change="handleModifImageFile($event)"
            />

            <button
              @click="sendToUpdatePost"
              type="button"
              class="btn bg-color mt-1"
            >
              Envoyer le post modifié
            </button>

            <span class="span" v-if="selectedModifImage">
              {{ selectedModifImage.name }}
            </span>
          </div>
        </div>
      </div>
      <!-- ------ fin div Modif ----------------------- -->
    </div>

    <img v-if="url" :src="url" class="card-img-top" alt="..." />
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="card-icons">
            <div class="like-container center-vert">
              <input
                type="checkbox"
                name="checkbox"
                v-bind:id="this.$props.id"
                :value="this.$props.id"
                v-model="liked"
                @click="sendToLikePost"
              />

              <label v-bind:for="this.$props.id">
                <div @click="isLiked = !isLiked">
                  <i class="icon-heart fas fa-heart"></i>
                </div>
              </label>
            </div>
          </div>
          <!-- ------- affichage j'aime -------------- -->

          <p class="text-like" v-if="isLiked"><b>J'aime</b></p>
        </div>
        <div class="bold">likes: {{ usersLiker.length }}</div>
      </div>
      <div v-for="comment in comments" v-bind:key="comment">
        <CommentVue
          class="mb-1"
          :email="comment.user.email"
          :content="comment.content"
        ></CommentVue>
      </div>
    </div>
    <div class="d-flex gap-1 m-2 center-vert">
      <AvatarVue></AvatarVue>
      <input
        type="text"
        class="form-control police"
        placeholder="Écrivez votre commentaire..."
        aria-label="Écrivez votre commentaire..."
        v-model="currentComment"
      />
      <button
        v-if="currentComment"
        type="button"
        class="btn bg-color ms-auto rounded-pill"
        @click="sendToCreateComment"
      >
        Envoyer
      </button>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Lato', sans-serif;
}

.police {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
}
.icon-heart {
  padding: 3px 5px;
  transition: 0.2s;
  cursor: pointer;
}

.icon-heart:hover {
  color: rgba(251, 38, 38, 0.5);
}

.like-container input {
  display: none;
}
.like-container input:checked + label i {
  color: #fb2626;
  animation: heart 1.3s forwards ease;
}

.modif-style {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  background-color: #e79f9f;
  color: #4e5166;
  border: 1px solid #4e5166;
}
.modif-style:hover {
  background-color: #4e5166;
  color: #ffff;
}

.dispost {
  margin-bottom: 0rem;
}
.bold {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
}
.logo-text-contain {
  width: 200px;
  margin-bottom: 4px;
}
.text-like {
  color: #fb2626;
  padding-left: 10px;
}
.like-container input {
  display: none;
}
input[type='checkbox'] + label {
  cursor: pointer;
}
.like-container {
  color: #4E5166;
  border: 1px solid #4E5166;
  border-radius: 5px;
}

.span {
  font-size: 0.8rem;
  padding-top: 14px;
  padding-left: 5px;
}

.center-vert {
  align-items: center;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
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

@media (min-width: 768px) {
  .card {
    width: 60%;
    margin: auto;
  }
}
</style>
