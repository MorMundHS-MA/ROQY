<template>
  <div>
    <h1>Create new bot</h1>
    <span>Name:</span>
    <input v-model="botname" placeholder="Enter the bots name"></input>
    <br>
    <router-link to="/"><button> Cancel </button></router-link>
    <router-link to="/"><button @click="create" @keyup.enter="create"> Create </button></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      botname: ''
    }
  },
  methods: {
    create () {
      console.log('Saving bot ' + this.botname)
      // this.$router.push('/')

      var newbot = {
        name: this.botname,
        image: '../assets/bot.png',
        state: 1,
        description: ''
      }
      this.$store.commit('addNewbot', newbot)
    }
  }
}
</script>