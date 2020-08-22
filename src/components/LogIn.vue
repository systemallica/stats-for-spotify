<template>
  <div id="login">
    <h1>First, log in to spotify</h1>
    <button><a v-bind:href="url">Log in</a></button>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data: function() {
    return {
      url:
        "https://accounts.spotify.com/authorize?" +
        "response_type=code&" +
        "client_id=2d88e8cf069d40a69e97bc7a0db990a1&" +
        "scope=user-read-private user-read-email playlist-read-private&" +
        "redirect_uri=http://192.168.0.156:8081/logged/&" +
        "state=123"
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
