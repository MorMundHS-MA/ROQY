
<template>
  <div>
    <md-toolbar class=" md-dense " style="background-color:#F2F1EF; color: #ff720b;">
      <h1 class="md-title">Bot config</h1>
    </md-toolbar>
    <md-toolbar class=" md-dense " style="background-color:#F2F1EF; color: #ff720b;">

      <div id="route">
          <router-link tag="md-button" to="/bots" active-class="active">My Bot</router-link>
          <router-link tag="md-button" to="/template" active-class="active">Bot Template</router-link>
          <router-link tag="md-button" to="/marketplace" active-class="active">Marketplace</router-link>
          <router-link tag="md-button" to="/login" active-class="active">Login</router-link>
      </div>
    </md-toolbar>
    <router-view />
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.css'

export default {
  name: 'header',
  data () {
    return {
      title: 'BotOverview'
    }
  }
}
</script>

<style scoped>

.md-title{
  flex:1;
  text-align:left;
  font-family:'helvetica';
  font-weight:900;
  padding-left:2%;
}

.md-button {
  background-color:#F2F1EF;  
  font-family:'sans-serif';
  font-weight:600;
}
.active {
  border-bottom: 2px solid #ff720b;
}

</style>