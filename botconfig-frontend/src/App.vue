<template>
  <div id="app">
    <app-header></app-header>
  </div>
</template>

<script>
import header from './Components/BotHeader.vue'
import 'vue-material/dist/vue-material.css'

export default {
  name: 'app',
  components: {
    'app-header': header
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 ;

}

</style>
