<template>
  <div id="app">
    <app-login></app-login>
  </div>
</template>

<script>
import login from './components/BotLogin.vue'
import 'vue-material/dist/vue-material.css'

export default {
  name: 'app',
  components: {
    'app-login': login
  },
  created () {
    this.$store.dispatch('getAllBots')
    this.$store.dispatch('getAllmarketplaceBots')
    // this.$store.dispatch('getTemplates')
  }
}
</script>

<style>
#app {
  font-family: Roboto, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 ;
}

</style>
