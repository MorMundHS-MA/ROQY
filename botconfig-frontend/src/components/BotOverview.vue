<template>
  <div class="hello">
    <h1>Ravenclaw Bot Config UI</h1>
    <h2>Walking Skeleton</h2>
    <bot-info :botData="bot"></bot-info>
    <ul>
      <li v-for="item in bots">
        <bot-info :botData="item"></bot-info>
      </li>
      <router-link to="/newbot">Create new Bot</router-link>
    </ul>
  </div>
</template>

<script>
import botInfo from './BotInfo.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      bots: [
        {name: 'Welcome-Bot', Status: 'Offline'},
        {name: 'FAQ-Bot', Status: 'Online'}
      ]
    }
  },
  components: {
    botInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
