<template>
  <div>
    <div class="login" v-if="!this.$store.state.user">
      <h2>First, log in to Spotify</h2>
      <a class="login-btn" v-bind:href="url">Log in</a>
    </div>
    <div class="user" v-else>
      <img
        class="profile-picture"
        v-bind:src="this.$store.state.user.profile.data.images[0].url"
        alt="Profile picture"
      />
      <h2>Hello {{ this.$store.state.user.profile.data.display_name }}!</h2>
      Here's a chart with your most listened genres:
      <GenrePie v-bind:genres="this.$store.state.user.genres" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import qs from "qs"

import GenrePie from "./GenrePie.vue"

const root = "https://accounts.spotify.com/authorize"
const response_type = "code"
const client_id = process.env.VUE_APP_CLIENTID
const client_secret = process.env.VUE_APP_CLIENTSECRET
const scope = "user-read-private user-read-email user-top-read"
const redirect_uri = `${process.env.VUE_APP_ROOT}/dashboard/`

export default {
  name: "Dashboard",
  components: {
    GenrePie
  },
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
    },
    getToken: async function() {
      const data = {
        code: this.code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri
      }
      const api_token = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: qs.stringify(data),
        auth: {
          username: client_id,
          password: client_secret
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      return api_token.data.access_token
    },
    getUserProfile: function(access_token) {
      return axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      })
    },
    getTopGenres: async function(access_token) {
      const top_artists = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me/top/artists",
        params: {
          limit: 50
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      })
      // Get genres from top artists
      const genres = top_artists.data.items.reduce((genre_dict, item) => {
        for (const genre of item.genres) {
          if (genre_dict[genre]) {
            genre_dict[genre] += 1
          } else {
            genre_dict[genre] = 1
          }
        }
        return genre_dict
      }, {})
      return genres
    }
  },
  created: async function() {
    if (!this.$store.state.user) {
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
        const access_token = await this.getToken()

        // Request data
        // Get genres from top artists
        const genres = await this.getTopGenres(access_token)

        // User profile
        const profile = await this.getUserProfile(access_token)

        this.$store.commit("saveUser", { genres, profile })
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.login-btn {
  background-color: #42b983;
  border-radius: 5px;
  text-decoration: none;
  padding: 8px 18px;
  color: white;
}
.profile-picture {
  width: 200px;
  border-radius: 50%;
}
</style>
