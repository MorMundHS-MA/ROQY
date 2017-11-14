<template>
  <md-stepper @completed="create" href="/">
    <md-step md-label="Setting Up" :md-editable="true"  :md-continue="allValid" md-button-continue="Next">
      
          <md-input-container :class="{'md-input-invalid': !botnameValid}" md-clearable>
                  <md-input type="name" v-model="botname" required/>
                  <label>Name</label>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': !descriptionValid}" md-clearable>
                  <md-input type="name" v-model="description" required/>
                  <label>Description</label>
          </md-input-container>
            
          <md-input-container>
            <label for="templates">{{selectTittle}}</label>
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
          
        <h6>Do you want to create it ?</h6>

      </md-content>
    </md-step>
  
</md-stepper> 

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
      selectTittle: 'Choose a bot Template',
      selected: false
    }
  },
  computed: {
    templates () {
      return this.$store.state.templates
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