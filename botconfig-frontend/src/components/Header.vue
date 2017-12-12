<template>
  <md-toolbar class=" md-dense " style="background-color:white; color: #ff720b;">
    <div id="route">
      <router-link tag="md-button" to="/bots" active-class="active">{{$lang.translate.header.my_bots}}</router-link>
      <router-link tag="md-button" to="/template" active-class="active">{{$lang.translate.header.bot_template}}</router-link>
      <router-link tag="md-button" to="/marketplace" active-class="active">{{$lang.translate.header.bot_marketplace}}</router-link>
    </div>
  </md-toolbar>
</template>

<script>
</script>

<style scooped>

.md-button {
  color:black;  
  font-weight:600;
}
.active {
  border-bottom: 2px solid #ff720b;
  color: #ff720b
}
#route {
  margin-left: auto;
  margin-right: auto;
}
span {
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 100%;
}
span.de {
  border-right: 1px solid white;
  padding-right: 5px;
}
.md-ripple {
  animation: none !important;
}
.md-ripple.md-active {
  animation: none !important;
}
.logo {
  height: 35px;
}
.lg {
  text-align: right;
}
.md-title{
  flex:1;
  text-align:left;
  margin: 0%;
  padding:0%;
}

</style>
