<template>
  <div class="conf-wrapper">
    <h3>Config UI</h3>
    <iframe class="conf-frame" src="static/botconfig/index.html">
    </iframe>
  </div>
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
.conf-wrapper {
  display: block;
  width: 100%;
  height: 700px;
  overflow: hidden;
}

.conf-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>