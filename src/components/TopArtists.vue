<template>
  <div class="container">
    <div
      v-for="artist in artists.data.items"
      :key="artist.id"
      class="card"
      @click="openUri(artist.uri)"
    >
      <img
        :src="artist.images[2].url"
        alt="Artist picture"
      >
      <div class="artist-info">
        <div>{{ artist.name }}</div>
        <div>Popularity score: {{ artist.popularity }}</div>
        <div>
          {{ artist.genres[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopArtists",
  props: {
    artists: {
      type: Object,
      required: true
    }
  },
  methods: {
    openUri: function(uri) {
      window.open(uri)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.card {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  display: flex;
  width: 300px;
  align-items: center;
  margin: 5px;
  border-radius: 16px;
  border: 1px solid #ccc;
}
.card:hover {
  background-color: #f1f1f1;
}
.artist-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
}
img {
  margin: 6px 0px 6px 8px;
  height: 64px;
}
</style>
