<template>
  <div>
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button" @click.native="$router.push('/')">
        <md-icon>wb_sunny</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Vue Weather</h2>
      <transition name="fade">
        <md-button
          v-if="favoriteLocation"
          @click.native="$router.push({ name: 'place', params: { id: favoriteLocation.id }})">
          <md-icon>star</md-icon> {{favoriteLocation.name}}
        </md-button>
      </transition>
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

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
