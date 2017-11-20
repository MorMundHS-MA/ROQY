<template>

<md-layout md-align="center">
 <md-layout md-flex md-column md-flex="70" md-flex-medium="70" md-flex-small="60" md-flex-xsmall="90"  >
   <md-stepper @completed="create" href="/">
    <md-step md-label="Create a Bot" :md-editable="true"  :md-continue="allValid" md-button-continue="Next">

      <h2 style="text-align:center">{{$lang.translate.creater.title}}</h2>

      
      <md-field>
        <label><b>{{$lang.translate.creater.name}}</b></label>
        <md-input type="name" v-model="botname" required/>
      </md-field>
      
      <md-field>
        <label><b>{{$lang.translate.creater.description}}</b></label>
        <md-textarea type="name" v-model="description" placeholder="max 160 characters" required/></md-textarea>
      </md-field>
      
      <md-field>
        <label><b>{{$lang.translate.creater.template}}</b></label>
      </md-field>
    

          <md-input-container :class="{'md-input-invalid': !botnameValid}" md-clearable>
                  <md-input type="name" v-model="botname" required/>
                  <label>{{$lang.translate.creater.name}}</label>    
          </md-input-container>

          <md-input-container :class="{'md-textarea-invalid': !descriptionValid}" >
                  <md-textarea type="name" v-model="description" required></md-textarea>
                  <label>{{$lang.translate.creater.description}}</label>
          </md-input-container>
            
          <md-input-container>
            <label for="templates">{{$lang.translate.creater.question2}}</label>
            <md-select name="option=" id="option="  v-model="item" :selected="item" required>
              <md-option v-for="(option, index) in templates"
                :key="index"
                :value="option.name">
                {{option.name}}
              </md-option>
            </md-select>
          </md-input-container>

    </md-step>
    
    <md-step md-label="Overview" :md-editable="true" :md-continue="true" md-button-continue="Create" >
      <md-content>
          
        <h6>{{$lang.translate.creater.question1}}</h6>

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

</style>