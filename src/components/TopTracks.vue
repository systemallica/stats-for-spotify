<template>
  <div class="container">
    <div class="card" v-for="track in tracks.data.items" :key="track.id">
      <img v-bind:src="track.album.images[2].url" alt="Album cover" />
      <div class="track-info">
        <div>{{ track.name }}</div>
        <div>
          {{ millisToMinutesAndSeconds(track.duration_ms) }}
        </div>
        <div>
          {{ track.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopTracks",
  props: ["tracks"],
  computed: {},
  created: function() {
    console.log(this.tracks.data.items[0])
  },
  data: function() {
    return {}
  },
  methods: {
    millisToMinutesAndSeconds: function(ms) {
      var minutes = Math.floor(ms / 60000)
      var seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
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
  display: flex;
  width: 300px;
  align-items: center;
  margin: 5px;
  border-radius: 16px;
  border: 1px solid #ccc;
}
.track-info {
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
