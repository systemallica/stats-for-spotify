<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h1>Stats for Spotify</h1>
    <router-view />
  </div>
</template>

<style>
body {
  font-family: Circular, Helvetica, Arial, sans-serif;
  line-height: 1.15;
}
h1 {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.04em;
}
h2 {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.04em;
}
h3 {
  font-size: 24px;
  font-weight: 900;
  margin: 25px;
  letter-spacing: -0.04em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #1db954;
}
</style>
