<template>
  <div>
    <md-toolbar class="md-accent">
      <h2 class="md-title" style="flex: 1">Vue Weather</h2>
      <md-button
        v-if="favoriteLocation"
        @click.native="$router.push({ name: 'place', params: { id: favoriteLocation.id }})">
        <md-icon>star</md-icon> {{favoriteLocation.name}}
      </md-button>
    </md-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      favoriteLocation () {
        return this.$store.getters.favoriteLocation;
      }
    }
  }
</script>
