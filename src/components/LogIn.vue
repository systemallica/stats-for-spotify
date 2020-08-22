<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span v-bind:title="msg">
      Hover your mouse over me for a few seconds to see my dynamically bound
      title!
    </span>
    <p>
      For a guide and recipes on how to configure / customize this project,
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <div v-if="loggedIn">
      User is logged in
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
