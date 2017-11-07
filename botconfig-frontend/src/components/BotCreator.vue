<template>
  <md-stepper >
    <md-step md-label="Setting Up" :md-editable="true"  :md-continue="allValid">
      
          <md-input-container :class="{'md-input-invalid': !botnameValid}">
                  <md-input type="name" v-model="botname" required/>
                  <label>Name</label>
          </md-input-container>
          <md-input-container :class="{'md-input-invalid': !descriptionValid}">
                  <md-input type="name" v-model="description" required/>
                  <label>Description</label>
          </md-input-container>
          
    </md-step>
  <md-step md-label="Configuration">
    <p></p>
  </md-step>
  <md-step md-label="Overview" :md-button-finish="Create">
    <h6>Do you want to create it ?</h6>
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
      item: []
    }
  },
  computed: {
    bots () {
      return this.$store.state.bots
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
      if (this.description.length <= 100 && this.description.length >= 50) {
        this.descriptionValid = true
      }
      this.validInput()
    }
  },
  methods: {
    create () {
      if (this.botname !== '') {
        this.$store.commit('addNewbot', {
          name: this.botname,
          image: '../assets/bot.png',
          status: 'offline',
          description: this.description
        })
      } else {
        console.log('No name')
      }
    },
    validInput () {
      if (this.botnameValid === true && this.descriptionValid === true) {
        this.allValid = true
      }
    }
  }
}
</script>
<style scoped>


</style>