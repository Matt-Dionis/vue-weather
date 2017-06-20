import Vue from 'vue';
import VueRouter from 'vue-router';

import Alerts from './components/Alerts';
import Place from './components/Place';
import Places from './components/Places';
import Timeline from './components/Timeline';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Places
  },
  {
    name: 'place',
    path: '/places/:id',
    component: Place,
    children: [
      {
        name: 'alerts',
        path: 'alerts',
        component: Alerts
      },
      {
        name: 'forecast',
        path: 'forecast',
        component: Timeline
      }
    ]
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
