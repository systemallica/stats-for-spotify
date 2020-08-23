<template>
  <div class="chart">
    <apexchart
      type="pie"
      width="480"
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
    aggregateGenres: function(genres, granularity) {}
  },
  data: function() {
    return {
      series: Object.keys(this.genres).map(key => this.genres[key]),
      chartOptions: {
        chart: {
          width: 480,
          type: "pie"
        },
        labels: Object.keys(this.genres),
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
