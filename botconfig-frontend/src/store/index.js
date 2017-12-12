import Vue from 'vue'
import Vuex from 'vuex'
import bots from './modules/bots'
import templates from './modules/template'
import users from './modules/users'
import marketplace from './modules/marketplace'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    bots,
    templates,
    users,
    marketplace
  }
})
