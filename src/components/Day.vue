<template>
  <div>
    <h3>{{dailyForecast.time | dayOfWeek}}</h3>
    <img :src="getImgUrl(dailyForecast.icon)">
    <h3>{{dailyForecast.summary}}</h3>
    <h3 style="color: red;">{{dailyForecast.temperatureMax | decimalPlaces(0)}}° F ({{dailyForecast.temperatureMax | temperatureInC | decimalPlaces(0)}}° C)</h3>
    <p style="color: blue;">{{dailyForecast.temperatureMin | decimalPlaces(0)}}° F ({{dailyForecast.temperatureMin | temperatureInC | decimalPlaces(0)}}° C)</p>
  </div>
</template>

<script>
  export default {
    name: 'Day',
    props: ['dailyForecast'],
    methods: {
      getImgUrl (icon) {
        const images = require.context('../assets/icons/', false, /\.svg$/);
        return images('./' + icon + '.svg');
      }
    }
  }
</script>
