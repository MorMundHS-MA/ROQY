
<template>
  <div>
  <div>
    <md-toolbar class=" md-dense md-raised" style="background-color:#F2F1EF; color: #ff720b;">
    <div>
      <md-tabs md-sync-route>
        <md-tab md-label='My Bots' to='/'></md-tab>
        <md-tab md-label='Templates' to='/template'></md-tab>
        <md-tab md-label='Marketplace' to='/marketplace'></md-tab>
        <md-tab md-label='Login' to=''></md-tab>
      </md-tabs>
    </div> 

      <h1 class="md-title">Bot Overview</h1>
      
      <div>
        <router-link tag="md-button" to="/" >My Bot</router-link>
        <router-link tag="md-button" to="/template" >Bot Template</router-link>
        <router-link tag="md-button" to="/marketplace" >Marketplace</router-link>
      </div>
    </md-toolbar>
    <router-view />
  </div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.css'

export default {
  name: 'header'
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
  border: 2px solid #ff720b; 
  border-radius: 6px;
  font-family:'sans-serif';
  font-weight:600;
  
}

</style>