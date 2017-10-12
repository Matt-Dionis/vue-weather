<template>
  <div>
    <h3 :class="severity">{{alert.title}}</h3>
    <p>{{alert.description}}</p>
  </div>
</template>

<script>
  export default {
    name: 'WeatherAlert',
    props: {
      alert: {
        type: Object,
        required: true,
        validator: function (alert) {
          return alert.title && alert.description && alert.severity
        }
      }
    },
    computed: {
      severity () {
        return {
          advisory: this.alert.severity === 'advisory',
          watch: this.alert.severity === 'watch',
          warning: this.alert.severity === 'warning'
        };
      }
    }
  }
</script>

<style scoped>
  .advisory {
    color: lightcoral;
  }

  .watch {
    color: red;
  }

  .warning {
    color: darkred;
  }
</style>
