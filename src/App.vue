<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <LogIn msg="Welcome to Stats for Spotify" />
  </div>
</template>

<script>
import LogIn from "./components/LogIn.vue"

export default {
  name: "App",
  components: {
    LogIn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
