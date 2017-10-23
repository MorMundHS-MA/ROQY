<template>
  <div>
    <h1>Create new bot</h1>
    <span>Name:</span>
    <input v-model="botname" placeholder="Enter the bots name"></input>
    <hr>
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
      if (this.botname !== '') {
        this.$store.commit('addNewbot', {
          name: this.botname,
          image: '../assets/bot.png',
          state: 1,
          description: ''
        })
      } else {
        console.log('No name')
      }
    }
  }
}
</script>