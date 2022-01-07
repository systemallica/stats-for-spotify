<template>
  <div class="container">
    <div
      @click="toggleAudio(track.preview_url)"
      v-for="track in tracks.data.items"
      :key="track.id"
    >
      <div v-if="track.album.images[2]" class="clickable card">
        <img
          v-if="track.preview_url"
          class="media-btn"
          :src="getBtnImage(track.preview_url)"
          alt="Media button"
        />
        <div class="dummy" v-else></div>
        <img
          @click="openUri(track.album.uri)"
          class="clickable cover"
          v-bind:src="track.album.images[2].url"
          alt="Album cover"
        />
        <div class="track-info">
          <a class="clickable" @click="openUri(track.uri)">
            {{ track.name }}
          </a>
          <div>
            {{ millisToMinutesAndSeconds(track.duration_ms) }}
          </div>
          <a class="clickable" @click="openUri(track.artists[0].uri)">
            {{ track.artists[0].name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopTracks",
  props: ["tracks"],
  data: function() {
    return { audio: undefined, nowPlaying: undefined }
  },
  methods: {
    getBtnImage: function(url) {
      var images = require.context("../assets/", false, /\.png$/)
      if (this.nowPlaying === url) {
        return images("./" + "pause" + ".png")
      } else {
        return images("./" + "play" + ".png")
      }
    },
    millisToMinutesAndSeconds: function(ms) {
      var minutes = Math.floor(ms / 60000)
      var seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    },
    openUri: function(uri) {
      window.open(uri)
    },
    toggleAudio: function(url) {
      if (this.nowPlaying === url) {
        if (this.audio.paused) {
          this.audio.play()
          this.nowPlaying = url
        } else {
          this.audio.pause()
          this.nowPlaying = undefined
        }
      } else if (this.audio) {
        this.audio.pause()
        this.createAudio(url)
      } else {
        this.createAudio(url)
      }
    },
    createAudio: function(url) {
      this.nowPlaying = url
      this.audio = new Audio(url)
      this.audio.play()
      this.audio.loop = true
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
.card:hover {
  background-color: #f1f1f1;
}
.dummy {
  width: 32px !important;
}
.media-btn {
  height: 24px;
  width: 24px !important;
  margin-left: 6px;
}
.track-info {
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
}
.cover {
  margin: 6px 0px 6px 8px;
  height: 64px;
}
.clickable {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
}
a.clickable:hover {
  text-decoration: underline;
}
</style>
