<template>
  <div>
    <h1>Create new bot</h1>
    <span>Name:</span>
    <input v-model="botname" placeholder="Enter the bots name"></input>
    <br>
    <button v-on:click="save()">Save</button>
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
    save: function () {
      console.log('Saving bot ' + this.$data.botname)
      // this.$router.push('/')
    }
  }
}
</script>