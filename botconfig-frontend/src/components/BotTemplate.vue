<template>
  <div>

    <md-layout class="row" style="margin:20px;" >
      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25"  md-flex-xlarge="20"
        class="row" v-for="(template, templates) in templates" :key="template.name">
          <md-card md-with-hover>
            <md-card-header>

              <md-card-header-text>
              <div class="md-subhead" md-align="center"></h3>{{template.name}}</h3></div>
              </md-card-header-text>
              
            </md-card-header>

            <div id="imgwrapper">
              <img :src="template.image" :alt="template.name">
            </div>

            <md-card-header-text>
              <div class="md-title"><h5>{{template.name}}</h5></div>
            </md-card-header-text>

            <md-card-content>
              {{template.description}}
            </md-card-content>
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
    min-width: 260px;
    min-height: 360px;
    max-width: 260px;
    max-height: 360px;
    word-wrap:break-word;
    margin: 20px;
  }
  .md-card-content{
    word-wrap:break-word;
  }
  .md-title{
    text-align: left;
    margin: 10px;
  }
  img{
    width: 148px;
    height: 148px;
  }
  #imgwrapper{
    text-align: center;
  }
</style>