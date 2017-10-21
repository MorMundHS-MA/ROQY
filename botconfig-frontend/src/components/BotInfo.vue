<template>
  <div class="bot">
      <p>Bot</p>
      <img src="../assets/bot.png" width="100" height="100">
      <br>
      <span>{{ botData.name }}</span>
  </div>
</template>

<script>
export default {
  props: ['botData']
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