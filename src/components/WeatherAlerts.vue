<template>
  <div>
    <md-list>
      <md-list-item v-for="(alert, index) in alerts" :key="index">
        <WeatherAlert :alert="alert"></WeatherAlert>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import WeatherAlert from './WeatherAlert';

  export default {
    name: 'WeatherAlerts',
    components: {
      WeatherAlert
    },
    computed: {
      alerts () {
        return this.$store.getters.alerts(this.$route.params.id);
      }
    }
  }
</script>
