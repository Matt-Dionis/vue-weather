<template>
  <div>
    <md-button class="md-raised md-accent" @click.native="$router.push({ name: 'forecast'})">
      Forecast
    </md-button>
    <hr>
    <h3 style="margin-left: 20px;">{{alertsHeadline}}</h3>
    <md-list>
      <md-list-item v-for="(alert, index) in alerts" :key="index">
        <alert :alert="alert"></alert>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import Alert from './Alert';

  export default {
    name: 'Alerts',
    computed: {
      alerts () {
        return this.$store.getters.alerts(this.$route.params.id);
      },
      alertsHeadline () {
        if (this.alerts) {
          return this.alerts.length === 1 ? `There is 1 active alert` : `There are ${this.alerts.length} active alerts`;
        } else {
          return 'No alerts';
        }
      }
    },
    components: {
      Alert
    }
  }
</script>
