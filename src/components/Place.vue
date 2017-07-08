<template>
  <div>
    <md-button @click.native="$router.push('/')">
      <md-icon>arrow_back</md-icon>Back
    </md-button>
    <hr>
    <br>
    <md-list>
      <md-list-item>
        <div>
          <img :src="getImgUrl(currentWeather.icon)">
        </div>
        <div class="md-list-text-container">
          <span id="temp" class="temp-warm">
            {{currentWeather.temperature | decimalPlaces(0)}}° F ({{currentWeather.temperature | temperatureInC | decimalPlaces(0)}}° C)
          </span>
          <span class="bold" style="font-size:18px;">
            This week in {{name}}
          </span>
          <span>{{forecast.summary}}</span>
        </div>
        <md-button v-if="alerts && !alertsVisible" class="md-accent pill-button" @click.native="toggleAlerts()">
          alerts <md-chip style="color: white; background-color: #3f51b5;">{{alerts.length}}</md-chip>
        </md-button>
        <md-button v-if="!alerts" class="pill-button" disabled>no alerts</md-button>
        <md-button v-if="alertsVisible" class="md-accent pill-button" @click.native="toggleAlerts()">
          close alerts
        </md-button>
      </md-list-item>
    </md-list>
    <alerts v-show="alertsVisible"></alerts>
    <hr style="border-style: dashed;">
    <timeline></timeline>
  </div>
</template>

<script>
  import Alerts from './Alerts';
  import Timeline from './Timeline';

  export default {
    name: 'Place',
    data () {
      return {
        alertsVisible: false
      }
    },
    computed: {
      alerts () {
        return this.$store.getters.alerts(this.$route.params.id);
      },
      currentWeather () {
        return this.$store.getters.currentWeather(this.$route.params.id);
      },
      forecast () {
        return this.$store.getters.forecast(this.$route.params.id);
      },
      name () {
        return this.$store.getters.name(this.$route.params.id);
      }
    },
    methods: {
      getImgUrl (icon) {
        const images = require.context('../assets/icons/', false, /\.svg$/);
        return images('./' + icon + '.svg');
      },
      toggleAlerts () {
        this.alertsVisible = !this.alertsVisible;
      }
    },
    components: {
      Alerts,
      Timeline
    }
  }
</script>

<style>
  .md-list-text-container > * {
    white-space: normal;
  }

  .pill-button {
    border: 2px solid #3f51b5;
    border-radius: 50px;
  }

  .pill-button:disabled {
    border: 2px solid grey;
  }
</style>
