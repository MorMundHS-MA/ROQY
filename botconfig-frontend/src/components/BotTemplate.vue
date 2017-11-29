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

              <div class="auswahlmenü">
                <md-menu clas md-direction="bottom right">
                <md-button class="md-icon-button header-menu-btn" md-menu-trigger>
                  <md-icon>more_vert</md-icon>
                </md-button>
                <md-menu-content>
                  <md-menu-item v-on:click="openDialog(ref1)">
                    <span>{{$lang.translate.template.delete}}</span>
                  </md-menu-item>
                </md-menu-content>
                </md-menu>
              </div>

              <div id="template-name">{{template.name}}</div>
              <div id="template-title">{{template.name}}</div>
              <div id="template-desc">{{template.description}}</div>
            </div>
        </md-card-header> 
      </md-card>
      </md-layout>
  </md-layout>

  <md-dialog md-open-from="#confirm" md-close-to="#confirm" ref='dialog1'>
    <md-dialog-title>{{$lang.translate.info.title}}</md-dialog-title>
    <md-dialog-content>{{$lang.translate.info.contentHtml}}</md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" v-on:click="closeDialog(ref1)"> {{$lang.translate.info.cancel}}</md-button>
      <md-button class="md-primary" v-on:click="deleteItem(botData)" disabled>{{$lang.translate.info.ok}}</md-button>
    </md-dialog-actions>
  </md-dialog>

  </div>

</template>
<script>
import 'vue-material/dist/vue-material.css'

export default {
  data () {
    return {
      ref1: 'dialog1'
    }
  },
  computed: {
    templates () {
      return this.$store.getters.getTemplates
    }
  },
  methods: {
    deleteItem (item) {
      this.$store.dispatch('deleteBot', item)
      this.closeDialog(this.confirm.ref1)
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
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
    margin-top: 12.5px;
    margin-bottom: 12.5px;
    margin-right: 15px;
    margin-left: 15px;
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
    max-width: 1160px;
    margin: 0 auto;
  }
  .auswahlmenü{
    text-align: right;
    float: right;
  }
</style>
