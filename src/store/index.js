import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: []
  },
  getters: {
    alerts: state => {
      return (id) => state.locations.find(location => {
        return location.id === id;
      }).weather.alerts;
    },
    currentWeather: state => {
      return (id) => state.locations.find(location => {
        return location.id === id;
      }).weather.currently;
    },
    favoriteLocation: state => {
      return state.locations.find(location => {
        return location.favorite;
      });
    },
    forecast: state => {
      return (id) => state.locations.find(location => {
        return location.id === id;
      }).weather.daily;
    },
    name: state => {
      return (id) => state.locations.find(location => {
        return location.id === id;
      }).name;
    }
  },
  actions: {
    ADD_LOCATION: function ({ commit }, { location }) {
      axios.post(`/api/locations`, {
        location
      }).then((response, err) => {
        commit('ADD_LOCATION', { location: response.data })
      }, err => console.log(err));
    },
    DELETE_LOCATION: function ({ commit }, { id }) {
      axios.delete(`/api/locations/${id}`).then((response, err) => {
        commit('DELETE_LOCATION', { id });
      }, err => console.log(err));
    },
    LOAD_LOCATION: function ({ commit }, { id }) {
      axios.get(`/api/locations/${id}`).then((response) => {
        commit('LOAD_LOCATION', { location: response.data, id });
      }, err => console.log(err));
    },
    LOAD_LOCATIONS: function ({ commit }) {
      axios.get(`/api/locations`).then((response, err) => {
        commit('LOAD_LOCATIONS', { locations: response.data });
      }, err => console.log(err));
    },
    SET_FAVORITE: function ({ commit }, { id }) {
      axios.put(`/api/locations/${id}/favorite`).then((response, err) => {
        commit('SET_FAVORITE', { id });
      }, err => console.log(err));
    }
  },
  mutations: {
    ADD_LOCATION: (state, { location }) => {
      state.locations.push(location);
    },
    DELETE_LOCATION: (state, { id }) => {
      state.locations = state.locations.filter(location => {
        return location.id !== id;
      });
    },
    LOAD_LOCATION: (state, { weather, id }) => {
      const location = state.locations.find(location => {
        return location.id === id;
      });
      state.locations.push(location);
    },
    LOAD_LOCATIONS: (state, { locations }) => {
      state.locations = locations;
    },
    SET_FAVORITE: (state, { id }) => {
      state.locations.forEach((location) => {
        if (location.id !== id) {
          location.favorite = false;
        } else {
          location.favorite = true;
        }
      });
    }
  }
});
