<template>
  <div class="chart">
    <apexchart
      type="donut"
      width="680"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts"

const chartOptions = {
  labels: undefined,
  legend: {
    formatter: function(seriesName, opts) {
      return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 380
        },
        legend: {
          height: 80,
          position: "bottom"
        }
      }
    }
  ]
}

export default {
  name: "GenrePie",
  props: ["genres", "aggregate"],
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    aggregateGenres: function() {
      const categories = [
        "rock",
        "indie",
        "pop",
        "metal",
        "jazz",
        "hip hop",
        "reggae",
        "r&b",
        "latin",
        "reggaeton",
        "punk",
        "electronic",
        "dance",
        "soul",
        "grunge"
      ]
      let countTotal = 0
      let countAgg = 0
      return Object.keys(this.genres).reduce((aggGenres, genre) => {
        countTotal += this.genres[genre]
        for (const category of categories) {
          if (genre.indexOf(category) != -1) {
            countAgg += this.genres[genre]
            if (aggGenres[category]) {
              aggGenres[category] += this.genres[genre]
            } else {
              aggGenres[category] = this.genres[genre]
            }
          }
        }
        aggGenres["others"] = countTotal - countAgg
        return aggGenres
      }, {})
    }
  },
  methods: {
    sortGenresByCount: function(genres) {
      const keysSorted = Object.keys(genres).sort(function(a, b) {
        return genres[b] - genres[a]
      })
      const valuesSorted = keysSorted.map(key => {
        return genres[key]
      })
      return { keys: keysSorted, values: valuesSorted }
    }
  },
  created: function() {
    let genres = this.genres
    if (this.aggregate) {
      genres = this.aggregateGenres
    }
    const genresSorted = this.sortGenresByCount(genres)
    this.series = genresSorted.values
    this.chartOptions = { ...chartOptions, labels: genresSorted.keys }
  },
  data: function() {
    return {
      series: undefined,
      chartOptions: chartOptions
    }
  },
  watch: {
    aggregate: function() {
      let genres = this.genres
      if (this.aggregate) {
        genres = this.aggregateGenres
      }
      const genresSorted = this.sortGenresByCount(genres)
      this.series = genresSorted.values
      this.chartOptions = { ...chartOptions, labels: genresSorted.keys }
    }
  }
}
</script>

<style scoped>
.chart {
  display: flex;
  justify-content: center;
}
</style>
