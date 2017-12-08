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
      <div v-if="matchSearch(marketplace.title)" 
      v-for="(marketplacebot, botsforMarketplace) in botsforMarketplace" :key="marketplacebot.name">
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
      name: 'marketplace',
      search: '',
      sortBy: ''
    }
  },
  computed: {
    botsforMarketplace () {
      let sortBy = this.sortBy
      return this.$store.getters.getMarketplaceBots.sort(
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
    this.$store.dispatch('getAllmarketplaceBots')
  },
  methods: {
    matchSearch (input) {
      if (this.search === '') {
        return true
      } else {
        return input.toUpperCase().includes(this.search.toUpperCase())
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