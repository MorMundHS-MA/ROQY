<template>
  <div class="bot">
      <button  v-on:click="changeBot(botData)">{{ botData.status }}</button>

      <input type="text" v-model="newName" v-on:keyup.enter="renameItem(botData)" placeholder="Bot Name..."></input>
      <button v-on:click="renameItem(botData)">Rename</button> 
       
      <p>Bot</p>
      <img src="../assets/bot.png" width="100" height="100">
      <br>
      <span>{{ botData.name }}</span>
      <button v-on:click="deleteItem(botData)">X</button>        
</div>
      
  </div>
</template>

<script>
export default {
  props: ['botData'],
  data () {
    return {
      newName: ''
    }
  },
  methods: {
    deleteItem (item) {
      this.$store.commit('deleteBot', item)
    },
    changeBot (item) {
      this.$store.commit('changeState', item)
    },
    renameItem (item) {
      this.$store.commit('renameBot', [item, {
        name: this.newName}])
    }
  }
}
</script>

<style scoped>
.bot{
  background-color: grey;
  display: inline-block;
}
.bot:hover {
  background-color: lightgray;
}

</style>