<template>
  <div>
    <md-button v-if="alerts" class="md-raised md-warn" @click.native="$router.push({ name: 'alerts'})">
      Alerts
    </md-button>
    <hr>
    <md-list>
      <md-list-item v-for="(day, index) of forecast.data" :key="index">
        <day :dailyForecast="day"></day>
        <md-divider></md-divider>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import Day from './Day';

  export default {
    name: 'Timeline',
    computed: {
      alerts () {
        return this.$store.getters.alerts(this.$route.params.id);
      },
      forecast () {
        return this.$store.getters.forecast(this.$route.params.id);
      }
    },
    components: {
      Day
    }
  }
</script>
