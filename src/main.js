import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

function convertToCelsius (tempInF) {
  return (tempInF - 32) * (5 / 9);
}

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
