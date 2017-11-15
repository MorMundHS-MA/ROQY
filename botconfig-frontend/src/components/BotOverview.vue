<template>
  <div>
    <md-layout  md-gutter="16" style="margin-top:1%;margin-bottom:1%;">
      <md-layout md-align="end" >
        <md-layout md-row md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex="25">
          <router-link tag="md-button" to="/newBot" class=" md-warn" >Create new Bot</router-link>
        </md-layout>
      </md-layout>
      
    </md-layout>

     <md-layout class="row" style="margin:20px;" >
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33 " md-flex-large="25"  md-flex-xlarge="20"
            class="row" v-for="(bot, bots) in bots" :key="bot.id">
            <bot-info :botData="bot"></bot-info>
          </md-layout>
    </md-layout>
     </md-list>
    </md-layout>
  </div>
</template>

<script>
import botInfo from './BotInfo.vue'
import 'vue-material/dist/vue-material.css'

export default {
  computed: {
    bots () {
      return this.$store.getters.getbots
    }
  },
  components: {
    botInfo
  }
}
</script scoped>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .row {
    padding: auto;
    margin-top:0.4%;
  }

  .add {
    border: dashed 1px orange;
    text-align:center; 
    min-width:auto; 
  }
  .rounded {
      border-radius:50%;
      margin:30%;
      text-align:center
  }
  .md-warn {
    border: dashed 1px #FF6600;
    border-radius:40px;
    font-family:'verdana';
    font-weight:600;
  }
</style>
