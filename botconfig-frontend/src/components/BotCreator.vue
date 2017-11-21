<template>

<md-layout md-align="center">
 <md-layout md-flex md-column md-flex="70" md-flex-medium="70" md-flex-small="60" md-flex-xsmall="90"  >
   <md-stepper @completed="create" href="/">
    <md-step :md-label="$lang.translate.creator.step1" :md-editable="true"  :md-continue="allValid" 
    :md-button-continue="$lang.translate.creator.next" :md-button-back="$lang.translate.creator.back">

      <h2 class="inputwrapper" style="text-align:center">{{$lang.translate.creator.title}}</h2>
      
      <div class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creator.name}}</b></label></div>
        <input id="entername" class="marginleft" type="name" v-model="botname" required/>
      </div>
      
      <div class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creator.description}}</b></label></div>
        <textarea id="enterdescription" class="textarea marginleft" type="name" v-model="description" :placeholder="$lang.translate.creator.char" required></textarea>
      </div>
      
      <div class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creator.template}}</b></label></div>
      </div>

      <div class="inputwrapper">

          <md-layout class="row" style="margin:20px;">
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25"  md-flex-xlarge="20"
          class="row" v-for="(template, templates) in templates" :key="template.name">
          <md-card md-with-hover v-on:click="selectTemplate(template)">

          <div id="imgwrapper">
            <img src="../assets/bot.png" :alt="template.name">
          </div>
          
          <md-card-header-text>
            <div class="md-subhead"><b>{{template.name}}</b></div>
          </md-card-header-text>

          <md-card-content>
            {{template.description}}
          </md-card-content>
  
          </md-card>
          </md-layout>
          </md-layout>
      
      </div>
  
    <md-input-container>
      <label for="templates">{{$lang.translate.creator.question2}}</label>
        <md-select name="option=" id="option="  v-model="item" :selected="item" required>
        <md-option v-for="(option, index) in templates"
            :key="index"
            :value="option.name">
            {{option.name}}
        </md-option>
      </md-select>
    </md-input-container>


    </md-step>
    
    <md-step :md-label="$lang.translate.creator.step3" :md-editable="true" :md-continue="true" 
    :md-button-continue="$lang.translate.creator.create" :md-button-back="$lang.translate.creator.back">

      <h3>{{$lang.translate.creator.question1}}</h3>
      <br><br>
      
    </md-step>
  
    </md-stepper> 
  </md-layout>
</md-layout>

</template>

<script>

import 'vue-material/dist/vue-material.css'

export default {
  data () {
    return {
      botname: '',
      description: '',
      botnameValid: false,
      descriptionValid: false,
      allValid: false,
      item: '',
      selected: false
    }
  },
  computed: {
    templates () {
      return this.$store.getters.getTemplates
    }
  },
  watch: {
    botname () {
      if (this.botname !== '') {
        this.botnameValid = true
      }
      this.validInput()
    },
    description () {
      if (this.description !== '' && this.description.length <= 100) {
        this.descriptionValid = true
      }
      this.validInput()
    },
    item () {
      if (this.item !== '') {
        this.selected = true
      }
      this.validInput()
    }
  },
  methods: {
    create () {
      this.$store.dispatch('addNewBot', {
        name: this.botname,
        image: '../assets/bot.png',
        status: 'offline',
        description: this.description
      })
      this.$router.push('/')
    },
    validInput () {
      if (this.botnameValid === true && this.descriptionValid === true && this.selected === true) {
        this.allValid = true
      }
    },
    reset () {
      this.botname = ''
      this.description = ''
      this.item = ''
    },
    selectTemplate (template) {
      this.item = template
      this.selected = true
      console.log(template)
      this.validInput()
    }
  }
}
</script>
<style scoped>
  #entername{
    border: 2px solid #D3D3D3;
    border-radius: 5px;
    padding: 2px;
    margin-left: 90px;
  }
  #enterdescription{
    border: 2px solid #D3D3D3;
    border-radius: 5px;
    height: 100px;
    width: 400px;
  }
  .inputwrapper{
    display: block;
    margin-top: 30px;
    clear: left;
  }
  .textarea{
    float: left;
  }
  .marginleft{
    margin-left: 50px;
  }
  .md-card{
    min-width: 60px;
    min-height: 160px;
    max-width: 160px;
    max-height: 260px;
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