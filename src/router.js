import Vue from 'vue';
import VueRouter from 'vue-router';

import Place from './components/Place';
import Places from './components/Places';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Places
  },
  {
    name: 'place',
    path: '/places/:id',
    component: Place
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
