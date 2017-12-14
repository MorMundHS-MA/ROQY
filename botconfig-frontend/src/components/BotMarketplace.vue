<template>
  <div id="marketplace">
    <headermenu></headermenu>

    <div class="md-toolbar">
      <span style="margin-right:5px">{{$lang.translate.overview.sortby}}</span>      
      <md-field class="toolbar-input">
        <md-select v-model="sortBy">
            <md-option value="date">{{$lang.translate.overview.date}}</md-option>
            <md-option value="type">{{$lang.translate.overview.type}}</md-option>
        </md-select>
      </md-field>
      <md-field style="border-radius:16px;" class="toolbar-input">
         <input v-model="search" :placeholder="$lang.translate.overview.search" style="padding:5px;padding-left:20px;"></input>
      </md-field>
    </div>

    <div class="row">
      <div v-for="(bot, bots) in bots" :key="bot.id">
        <bot-info v-if="matchSearch(bot.name) && isValidBot(bot)" :botData="bot"></bot-info>
        <div class="bot-wrapper">
          <div class="card-horizontal">
          </div>
          <div class="card-vertical">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import botInfo from './BotInfo.vue'
import 'vue-material/dist/vue-material.css'
import headermenu from './Header.vue'

export default {
  data () {
    return {
      search: '',
      sortBy: ''
    }
  },
  computed: {
    /**
    * Returns all Bots saved in store
    */
    bots () {
      let sortBy = this.sortBy
      return this.$store.getters.getbots.sort(
        /**
        * Returns sorted Bots depending on each criteria
        * @param a,b Bots we receive from the store
        */
        function (a, b) {
          switch (sortBy) {
            case 'date':
              if (a.id > b.id) {
                return 1
              }
              if (a.id < b.id) {
                return -1
              }
              return 0
            case 'type':
              if (a.type > b.type) {
                return 1
              }
              if (a.type < b.type) {
                return -1
              }
              return 0
          }
        }
      )
    }
  },
  components: {
    botInfo,
    headermenu
  },
  created () {
    this.$store.dispatch('getAllBots')
  },
  methods: {
    /**
    * Method to search for a spezific Bot
    * @param input Name we are searching for
    */
    matchSearch (input) {
      if (this.search === '') {
        return true
      } else {
        return input.toUpperCase().includes(this.search.toUpperCase())
      }
    },
    /**
    * Method to list all public Bots
    * @param input Bots from the store
    */
    isValidBot (input) {
      if (input.privacy === 'public') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>


<style scoped>
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
  div.md-toolbar {
    justify-content: flex-end;
    align-items: center;
  }
  .toolbar-input {
    background-color: white;
    margin: 10px;
  }
</style>