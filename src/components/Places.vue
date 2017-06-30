<template>
  <div>
    <md-list>
      <md-list-item v-if="locations.length === 0">
        <div>
          <img class="grey-img" :src="getImgUrl('partly-cloudy-day-static')">
        </div>
        <div class="md-list-text-container" id="place-holder">
          <h4>Welcome to the view weather app!</h4>
          <p>Try adding a location to test it out</p>
        </div>
      </md-list-item>
      <md-list-item v-for="(location, index) in locations" :key="index">
        <div>
          <img :src="getImgUrl(location.weather.currently.icon)">
        </div>
        <div class="md-list-text-container">
          <span>{{location.weather.currently.summary}}</span>
          <span>{{location.weather.currently.temperature | decimalPlaces(0)}}º F ({{location.weather.currently.temperature | temperatureInC | decimalPlaces(0)}}° C)</span>
          <router-link :to="{ name: 'forecast', params: { id: location.id }}">
            {{location.name}}
          </router-link>
        </div>
        <md-button v-if="!location.favorite" class="md-icon-button md-dense" @click.native="setFavorite(location.id)">
          <md-icon class="md-accent">star_border</md-icon>
        </md-button>
        <md-button v-else class="md-icon-button md-dense" disabled>
          <md-icon class="md-accent">star</md-icon>
        </md-button>
        <md-button class="md-icon-button md-dense" @click.native="deleteLocation(location.id)">
          <md-icon class="md-warn">clear</md-icon>
        </md-button>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>
      <md-list-item>
        <div>
          <md-button class="md-icon-button md-raised md-accent" id="place-adder" @click.native="openDialog('addLocation')">
            <md-icon>add</md-icon>
          </md-button>
        </div>
        <div class="md-list-text-container" id="place-adder-text">
          <span>Add location</span>
        </div>
      </md-list-item>
    </md-list>
    <md-dialog md-open-from="#place-adder" md-close-to="#place-adder" ref="addLocation">
      <md-dialog-title>Add location</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Location</label>
            <md-input placeholder="Name" v-model="newLocation.name"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('addLocation')">Cancel</md-button>
        <md-button class="md-primary" @click.native="closeDialog('addLocation', newLocation)">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Places',
  data () {
    return {
      newLocation: {}
    }
  },
  computed: mapState([
    'locations'
  ]),
  mounted: function () {
    this.$store.dispatch('LOAD_LOCATIONS');
  },
  methods: {
    addLocation (location) {
      this.$store.dispatch({
        type: 'ADD_LOCATION',
        location
      });
      this.newLocation = {
        name: '',
        favorite: false
      };
    },
    deleteLocation (id) {
      this.$store.dispatch({
        type: 'DELETE_LOCATION',
        id
      });
    },
    getImgUrl (icon) {
      const images = require.context('../assets/icons/', false, /\.svg$/);
      return images('./' + icon + '.svg');
    },
    setFavorite (id) {
      this.$store.dispatch({
        type: 'SET_FAVORITE',
        id
      });
    },
    openDialog (ref) {
      this.$refs[ref].open();
    },
    closeDialog (ref, location) {
      if (location) {
        this.addLocation(location);
      }
      this.$refs[ref].close();
    }
  }
}
</script>

<style scoped>
  .grey-img {
    -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
         -o-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
            filter: grayscale(100%);
  }

  #place-adder {
    margin-left: 7px;
  }

  #place-adder > i {
    color: white;
  }

  #place-adder-text {
    margin-left: 12px;
  }

  #place-holder > h4 {
    margin-bottom: 0;
    margin-top: 0;
  }
</style>
