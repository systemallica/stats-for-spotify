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

export default {
  name: "GenrePie",
  props: ["genres"],
  components: {
    apexchart: VueApexCharts
  },
  methods: {
    aggregateGenres: function(genres, granularity) {},
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
    const genresSorted = this.sortGenresByCount(this.genres)
    this.series = genresSorted.values
    this.chartOptions.labels = genresSorted.keys
  },
  data: function() {
    return {
      series: undefined,
      chartOptions: {
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
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
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
