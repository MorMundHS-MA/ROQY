<template>
  <div id="app">
    <app-header v-if="this.$store.getters.checkout"></app-header>
    <app-login v-else></app-login>
  </div>
</template>

<script>
import header from './components/BotHeader.vue'
import login from './components/BotLogin.vue'
import 'vue-material/dist/vue-material.css'

export default {
  name: 'app',
  components: {
    'app-header': header,
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
