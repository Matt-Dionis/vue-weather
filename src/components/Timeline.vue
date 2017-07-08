<template>
  <div>
    <md-list>
      <div v-for="(day, index) of forecast.data" :key="index">
        <day :dailyForecast="day" :index="index"></day>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
  import Day from './Day';

  export default {
    name: 'Timeline',
    computed: {
      forecast () {
        return this.$store.getters.forecast(this.$route.params.id);
      }
    },
    components: {
      Day
    }
  }
</script>
