import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

function calculateDayOfWeek (timestamp) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  date.setTime(timestamp * 1000);
  return weekdays[date.getDay()];
}

function convertToCelsius (tempInF) {
  return (tempInF - 32) * (5 / 9);
}

Vue.filter('dayOfWeek', function (timestamp) {
  return calculateDayOfWeek(timestamp);
});

Vue.filter('decimalPlaces', function (value, places) {
  return value.toFixed(places)
});

Vue.filter('temperatureInC', function (tempInF) {
  return convertToCelsius(tempInF);
});

Vue.material.registerTheme('default', {
  primary: 'green',
  accent: 'indigo',
  warn: 'red'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  router,
  store
});
