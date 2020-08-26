<template>
  <div class="container">
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
      <h3>Here's a chart with your most listened genres:</h3>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">Aggregate genres</label>
      <GenrePie
        v-bind:genres="this.$store.state.user.genres"
        v-bind:aggregate="checked"
      />
      <h3>Here are your top tracks:</h3>
      <TopTracks v-bind:tracks="this.$store.state.user.tracks" />
      <h3>Here are your top artists:</h3>
      <TopArtists v-bind:artists="this.$store.state.user.artists" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import qs from "qs"

import GenrePie from "./GenrePie.vue"
import TopArtists from "./TopArtists.vue"
import TopTracks from "./TopTracks.vue"

const root = "https://accounts.spotify.com/authorize"
const responseType = "code"
const clientId = process.env.VUE_APP_CLIENTID
const clientSecret = process.env.VUE_APP_CLIENTSECRET
const scope = "user-read-private user-read-email user-top-read"
const redirectUri = `${process.env.VUE_APP_ROOT}/dashboard/`

export default {
  name: "Dashboard",
  components: {
    GenrePie,
    TopArtists,
    TopTracks
  },
  computed: {
    checked: {
      get() {
        return this.$store.state.checked
      },
      set(value) {
        this.$store.commit("updateChecked", value)
      }
    }
  },
  data: function() {
    return {
      code: undefined,
      state: undefined,
      url: `${root}?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`
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
        redirect_uri: redirectUri
      }
      const apiToken = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: qs.stringify(data),
        auth: {
          username: clientId,
          password: clientSecret
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      return apiToken.data["access_token"]
    },
    getUserProfile: function(accessToken) {
      return axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    getTop: async function(accessToken, mode) {
      return await axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/top/${mode}`,
        params: {
          limit: 50
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    getTopGenres: function(topArtists) {
      // Get genres from top artists
      const genres = topArtists.data.items.reduce((genreDict, item) => {
        for (const genre of item.genres) {
          if (genreDict[genre]) {
            genreDict[genre] += 1
          } else {
            genreDict[genre] = 1
          }
        }
        return genreDict
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
        const accessToken = await this.getToken()

        // Request data
        // Get genres from top artists
        const artists = await this.getTop(accessToken, "artists")
        const genres = this.getTopGenres(artists)

        // Top tracks
        const tracks = await this.getTop(accessToken, "tracks")

        // User profile
        const profile = await this.getUserProfile(accessToken)

        this.$store.commit("saveUser", { artists, genres, profile, tracks })
        this.$router.push({ path: "/" })
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.login-btn {
  background-color: #1db954;
  font-size: 16px;
  border-radius: 500px;
  text-decoration: none;
  padding: 19px 56px 21px;
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
}
.login-btn:hover {
  color: #fff;
  background-color: #1ed760;
}
.profile-picture {
  width: 200px;
  border-radius: 50%;
}
</style>
