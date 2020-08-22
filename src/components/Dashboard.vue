<template>
  <div>
    <div class="login" v-if="!code">
      <h2>First, log in to Spotify</h2>
      <button><a v-bind:href="url">Log in</a></button>
    </div>
    <div class="loading" v-else-if="!user">
      <h2>Loading...</h2>
    </div>
    <div class="user" v-else>
      <h2>Hello {{ this.user.data.display_name }}!</h2>
      <img v-bind:src="user.data.images[0].url" alt="Profile picture" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import qs from "qs"

const root = "https://accounts.spotify.com/authorize"
const response_type = "code"
const client_id = process.env.VUE_APP_CLIENTID
const client_secret = process.env.VUE_APP_CLIENTSECRET
const scope = "user-read-private user-read-email playlist-read-private"
const redirect_uri = "http://localhost:8080/dashboard/"

export default {
  name: "Dashboard",
  data: function() {
    return {
      code: undefined,
      state: undefined,
      url: `${root}?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`,
      user: undefined
    }
  },
  methods: {
    generateRandomState: function(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },
  created: async function() {
    const localStorage = window.localStorage

    // If first time, create state, otherwise read it
    const storedState = localStorage.getItem("state")
    if (storedState === null) {
      this.state = this.generateRandomState(1, 100000)
      localStorage.setItem("state", this.state)
    } else {
      this.state = localStorage.getItem("state")
    }
    this.url += `&state=${this.state}`

    // Read state and code from route, retourned by spotify after login
    const routeState = this.$route.query.state
    this.code = this.$route.query.code

    // If both states match, request token and user data
    if (routeState === this.state) {
      // Request token
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: client_id,
          password: client_secret
        }
      }
      const data = {
        code: this.code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri
      }

      const api_token = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        options
      )

      const access_token = api_token.data.access_token

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      }

      const user_data = await axios.get("https://api.spotify.com/v1/me", {
        headers
      })
      console.log(
        await axios.get("https://api.spotify.com/v1/me", {
          headers
        })
      )
      this.user = user_data
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
