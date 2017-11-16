
<template>
  <div>
    <md-toolbar class="md-dense toolbar ">
    <h1 class="md-title">Bot config</h1>
    <div id="lg">
      <div>
          <span @click="changeLang('de')" class="de" >DE</span>
          <span @click="changeLang('en')">EN</span> 
        
      </div>
    </div>
    </md-toolbar>
    <md-toolbar class=" md-dense " style="background-color:#F2F1EF; color: #ff720b;">

      <div id="route">
          <router-link tag="md-button" to="/bots" active-class="active">{{$lang.translate.header.my_bots}}</router-link>
          <router-link tag="md-button" to="/template" active-class="active">{{$lang.translate.header.bot_template}}</router-link>
          <router-link tag="md-button" to="/marketplace" active-class="active">{{$lang.translate.header.bot_marketplace}}</router-link>
          <router-link tag="md-button" to="/login" active-class="active">{{$lang.translate.header.bot_login}}</router-link>
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
      name: 'header'
    }
  },
  methods: {
    changeLang (lg) {
      this.$lang.setLang(lg)
    }
  }
}
</script>

<style scoped>
.toolbar {
  background-color:black;
  color: white;

}
.md-title{
  flex:1;
  text-align:left;
  margin: 0%;
  padding:0%;
}

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
#lg {
  margin-right: 1%;
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


</style>