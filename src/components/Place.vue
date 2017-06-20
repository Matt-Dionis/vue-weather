<template>
  <div>
    <md-button class="md-accent" @click.native="$router.push('/')">
      <md-icon>arrow_back</md-icon>Back
    </md-button>
    <br>
    <h2 style="margin: 0 20px;">{{name}}</h2>
    <img :src="getImgUrl(currentWeather.icon)">
    <h3 style="color: red; margin: 0 20px;">{{currentWeather.temperature | decimalPlaces(0)}}° F ({{currentWeather.temperature | temperatureInC | decimalPlaces(0)}}° C)</h3>
    <p style="color: blue; margin: 0 20px;">{{currentWeather.temperature | decimalPlaces(0)}}° F ({{currentWeather.temperature | temperatureInC | decimalPlaces(0)}}° C)</p>
    <br>
    <h4 style="margin: 0 20px;">{{forecast.summary}}</h4>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Place',
    computed: {
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
      }
    },
    mounted: function () {
      this.$store.dispatch({
        type: 'LOAD_LOCATION',
        id: this.$route.params.id
      });
    }
  }
</script>
