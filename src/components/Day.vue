<template>
  <md-list-item>
    <div>
      <img :src="getImgUrl(dailyForecast.icon)">
    </div>
    <div class="md-list-text-container">
      <span class="bold">
        {{dayOfWeek}}
      </span>
      <span>
        <span style="color:red;">
          {{dailyForecast.temperatureMax | decimalPlaces(0)}}° F ({{dailyForecast.temperatureMax | temperatureInC | decimalPlaces(0)}}° C)
          <md-icon style="color:red;">arrow_upward</md-icon>
        </span>
        <span style="color:blue;">
          {{dailyForecast.temperatureMin | decimalPlaces(0)}}° F ({{dailyForecast.temperatureMin | temperatureInC | decimalPlaces(0)}}° C)
          <md-icon style="color:blue;">arrow_downward</md-icon>
        </span>
      </span>
      <span>{{dailyForecast.summary}}</span>
    </div>
  </md-list-item>
</template>

<script>
  export default {
    name: 'Day',
    props: ['dailyForecast', 'index'],
    methods: {
      getImgUrl (icon) {
        const images = require.context('../assets/icons/', false, /\.svg$/);
        return images('./' + icon + '.svg');
      }
    },
    computed: {
      dayOfWeek () {
        if (this.index === 0) {
          return 'Today';
        } else if (this.index === 1) {
          return 'Tomorrow';
        } else {
          const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const today = new Date();
          const forecastDay = new Date(today.setDate(today.getDate() + this.index));
          return weekdays[forecastDay.getDay()];
        }
      }
    }
  }
</script>
