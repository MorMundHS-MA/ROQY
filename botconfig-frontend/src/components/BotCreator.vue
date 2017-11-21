<template>

<md-layout md-align="center">
 <md-layout md-flex md-column md-flex="70" md-flex-medium="70" md-flex-small="60" md-flex-xsmall="90"  >
   <md-stepper @completed="create" href="/">
    <md-step md-label="Create a Bot" :md-editable="true"  :md-continue="allValid" md-button-continue="Next">

      <h2 class="inputwrapper" style="text-align:center">{{$lang.translate.creater.title}}</h2>
      
      <md-field class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creater.name}}</b></label></div>
        <md-input id="entername" class="marginleft" type="name" v-model="botname" required/>
      </md-field>
      
      <md-field class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creater.description}}</b></label></div>
        <md-textarea id="enterdescription" class="textarea marginleft" type="name" v-model="description" placeholder="max 160 characters" required></md-textarea>
      </md-field>
      
      <md-field class="inputwrapper">
        <div class="textarea"><label><b>{{$lang.translate.creater.template}}</b></label></div>
      </md-field>
    
    </md-step>
    
    <md-step md-label="Overview" :md-editable="true" :md-continue="true" md-button-continue="Create" >
      <md-content>
          
        <h3>{{$lang.translate.creater.question1}}</h3>

      </md-content> 
    </md-step>
  
</md-stepper> 
 </md-layout>
 </md-layout>

</template>

<script>
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
</style>