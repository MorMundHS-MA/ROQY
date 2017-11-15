<template>
    <h3> config UI</h3>
</template>

<script>
import 'vue-material/dist/vue-material.css'

export default {
  computed: {
    bot () {
      return this.$store.gettters.getBot
    }
  }
}
</script>

<style scoped>
</style>