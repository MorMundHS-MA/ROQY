<template>
  <div>

    <div class="md-toolbar">
      <span style="margin-right:5px">{{$lang.translate.overview.sortby}}</span>      
      <md-field class="toolbar-input">
        <md-select>
            <md-option value="date">{{$lang.translate.overview.date}}</md-option>
            <md-option value="type">{{$lang.translate.overview.type}}</md-option>
        </md-select>
      </md-field>
      <md-field class="toolbar-input">
         <md-input :placeholder="$lang.translate.overview.search" style="padding:5px;"></md-input>
      </md-field>
    </div>

    <md-layout class="overview-wrapper">
      <md-layout  v-for="(template, templates) in templates" :key="template.name">    
      
      <md-card>
            <md-card-header>
              <div id="imgwrapper">
                <img src="../assets/bot.png" :alt="template.name">
              </div>
              <div id="right-text">
                <div id="template-name"></h3>{{template.name}}</h3></div>
                <div id="template-title"><h5>{{template.name}}</h5></div>
                <div id="template-desc">{{template.description}}</div>
              </div>
            </md-card-header> 
      </md-card>
      </md-layout>
    </md-layout>

  </div>
</template>
<script>
import 'vue-material/dist/vue-material.css'

export default {
  computed: {
    templates () {
      return this.$store.getters.getTemplates
    }
  }
}
</script>

<style scoped>
  .md-card{
    min-width: 550px;
    min-height: 235px;
    max-width: 550px;
    max-height: 235px;
    word-wrap:break-word;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-right: 30px;
    margin-left: 30px;
  }
  .md-card-content{
    word-wrap:break-word;
  }
  #template-title{
    text-align: ;
    margin: 10px;
  }
  img{
    width: 150px;
    height: 150px;
    float: left;
  }
  #imgwrapper{
    margin-top: 26.5px;
    margin-left: 26.5px;
    text-align: left;
  }
  #right-text{
    text-align: left;
    padding-left: 50.5px;
  }
  #template-name{
    font-size: 10px;
  }
  #template-title{
    font-size: 24px;
  }
  #template-desc{
    font-size: 14px;
  }
  div.md-toolbar {
    justify-content: flex-end;
    align-items: center;
  }
  .toolbar-input {
    background-color: white;
    margin: 10px;
  }
  .overview-wrapper{
    text-align: center;
    max-width: 2152px;
    margin: 0 auto;
  }
</style>
