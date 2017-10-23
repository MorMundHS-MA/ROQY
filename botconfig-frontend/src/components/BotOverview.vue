<template>
  <div id="body-container">
    <header>  
      <h1>Ravenclaw Bot Config UI</h1>
      <h2>Walking Skeleton</h2>
    </header>
    
    <div class="container">
      <ul>
        <li v-for="item in bots">
          <bot-info :botData="item"></bot-info>
        </li>
        <router-link to="/newbot"><button>Create new Bot</button></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import botInfo from './BotInfo.vue'
export default {
  name: '#body-container',
  computed: {
    bots () {
      return this.$store.state.bots
    }
  },
  components: {
    botInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header{
  background-color: #dce0e8;
  margin: 10;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
