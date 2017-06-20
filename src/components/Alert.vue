<template>
  <div>
    <h2 :class="severity">{{alert.title}}</h2>
    <p>{{alert.description}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['alert'],
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
