import Vue from 'vue';
import VueRouter from 'vue-router';

import ForecastPlace from './components/ForecastPlace';
import ForecastPlaces from './components/ForecastPlaces';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ForecastPlaces
  },
  {
    name: 'place',
    path: '/places/:id',
    component: ForecastPlace
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
