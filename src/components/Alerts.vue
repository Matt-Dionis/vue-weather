<template>
  <div>
    <md-list>
      <md-list-item v-for="(alert, index) in alerts" :key="index">
        <alert :alert="alert"></alert>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import Alert from './Alert';

  export default {
    name: 'Alerts',
    computed: {
      alerts () {
        return this.$store.getters.alerts(this.$route.params.id);
      }
    },
    components: {
      Alert
    }
  }
</script>
