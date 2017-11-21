<template>
  <div>

    <md-layout class="row" style="margin:20px;" >
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25"  md-flex-xlarge="20"
        class="row" v-for="(template, templates) in templates" :key="template.name">
          <md-card md-with-hover>
            <md-card-header>

              <div id="imgwrapper">
                <img :src="template.image" :alt="template.name">
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
    text-align: left;
  }
  #right-text{
    text-align: right;
  }
  #template-name{

  }
  #template-title{

  }
  #template-desc{

  }
</style>