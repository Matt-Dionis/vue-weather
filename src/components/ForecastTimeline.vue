<template>
  <div>
    <md-list>
      <div v-for="(day, index) of forecast.data" :key="index">
        <DailyForecast :dailyForecast="day" :index="index"></DailyForecast>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
  import DailyForecast from './DailyForecast';

  export default {
    name: 'ForecastTimeline',
    components: {
      DailyForecast
    },
    computed: {
      forecast () {
        return this.$store.getters.forecast(this.$route.params.id);
      }
    }
  }
</script>
