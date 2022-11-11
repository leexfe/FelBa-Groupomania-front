<script>
import axios from 'axios'
import { url } from './../services/fetchOptions'

export default {
  name: 'LoginPage',

  data: function () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      hasInvalidCredentials: false,
      error: null,
      isLoginMode: true,
    }
  },
  methods: {
    submitForm: sendTologUser,
    isFormValid,
    toggleLoginMode() {
      this.isLoginMode = !this.isLoginMode
    },
    // Inscrire utilisateur :
    //On définit l'URL du serveur et les options de requête HTTP à utiliser lors de l'envoi de la requête d'inscription au serveur:
    sendTosignUp: async function () {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
      const body = JSON.stringify({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      try {
        // Utilise la fonction axios.post () pour envoyer la requête d'inscription au serveur:
        const res = await axios.post(url + 'auth/signup', body, options)
        console.log('res:', res)
        //si succès redirige l'utilisateur vers la page d'accueil:
        this.$router.go('/')
      } catch (err) {
        //fait remonter l'erreur à l'objet data:
        const error = err.response.data.error
        this.error = error
        console.log('error: ', error)
        throw new Error('failed to signup:' + error)
      }
    },
  },
  // watch observe et déclenche une fonction chaque fois qu'une propriété réactive change:
  watch: {
    email(value) {
      const isValueEmpty = value === ''
      this.isFormValid(!isValueEmpty)
      this.error = null
    },
    password(value) {
      const isValueEmpty = value === ''
      this.isFormValid(!isValueEmpty)
      this.error = null
    },
  },
}  

// Vérifie si le formulaire est valide:
function isFormValid(boolean) {
  //booléen faux si le form est valid
  this.hasInvalidCredentials = !boolean
}

// Envoyer vers la Connexion d'un utilisateur connu:
// Si réponse positive,récupère token d'authentification puis redirige vers la page home(via router) sinon message d'erreur.
//passe router en param pour rediriger le client sur la page home dans la réponse:
function sendTologUser(email, password, router) {
  // Définis l'adresse du serveur et le port sur lesquels logUser va se connecter
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }
  fetch(url + 'auth/login', options)
    .then((res) => {
      if (res.ok) return res.json()
      res.text().then((err) => {
        const { error } = JSON.parse(err)
        console.log('message:', error)
        this.error = error
        throw new Error()
      })
    })
    .then((res) => {
      //on stocke dans localStorage: token et isAdmin:
      console.log('res', res)
      const token = res.token
      localStorage.setItem('token', token)
      const isAdmin = res.user.isAdmin
      localStorage.setItem('isAdmin', isAdmin)

      router.push('/home')
    })
    .catch((err) => {
      console.error(err)
      this.error = JSON.stringify(err)
    })
}
</script>

<template>
  <div>
    <main class="form-signin w-100 m-auto">
      <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
        <div class="border-vue">
          <img
            class="mb-4 mt-4 d-block mx-auto"
            src="../../public/vue.jpg"
            alt=""
            width="90"
            height="80"
          />
        </div>
        <h1 class="h3 mb-3 mt-3 h1-text-color text-center">
          {{
            this.isLoginMode
              ? 'Veuillez vous identifier'
              : 'Veuillez vous inscrire '
          }}
        </h1>

        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="email"
            required="true"
            @invalid="isFormValid"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="password"
            required="true"
            @invalid="isFormValid"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div v-if="!isLoginMode" class="form-floating">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="confirmPassword"
            required="true"
            @invalid="isFormValid"
          />
          <label for="floatingPassword">Confirm Password</label>
        </div>
        <div v-if="hasInvalidCredentials" class="error-msg">
          Attention! Le formulaire n'est pas rempli correctement!
        </div>
        <div v-if="!hasInvalidCredentials && error" class="error-msg">
          {{ error }}
        </div>

        <button
          v-if="isLoginMode"
          class="w-100 btn btn-lg signin-color mt-1"
          type="submit"
          @click.prevent="
            () => submitForm(this.email, this.password, this.$router)
          "
          :disabled="hasInvalidCredentials"
        >
          Sign in
        </button>

        <button
          v-if="!isLoginMode"
          class="w-100 btn btn-lg signin-color mt-1"
          type="submit"
          @click.prevent="sendTosignUp"
          :disabled="hasInvalidCredentials"
        >
          Register
        </button>

        <p class="mt-2 mb-2 text-muted" @click.prevent="toggleLoginMode">
          <a href="">
            {{
              this.isLoginMode
                ? 'Nouveau sur ce site? Veuillez vous inscrire'
                : 'Retour sur Sign in pour vous identifier'
            }}
          </a>
        </p>
      </form>
    </main>
  </div>
</template>

<style scoped>
.border-vue {
  border: 1px solid #ced4da;
  border-radius: 5px;
}
.h1-text-color {
  color: #4e5166;
}

.signin-color {
  font-family: 'Lato', sans-serif;
  color: #4e5166;
  font-weight: 600;
  background-color: #ffd7d7;
  border: 1px solid #4e5166;
}
.signin-color:hover {
  background-color: #e79f9f;
 
}

.hasErrors input {
  border: 2px solid red;
  position: relative;
}
.error-msg {
  color: red;
}
h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: var(--bs-indigo);
}
/* Primaire : #FD2D01
  Secondaire : #FFD7D7
  Tertiaire : #4E516 */

html,
body {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  height: 100%;
}


body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
a{
  font-family: 'Lato', sans-serif;
  font-weight: 600;
}


.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  /* margin-bottom: 10px; */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


</style>
