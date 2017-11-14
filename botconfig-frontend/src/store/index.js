import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import bots from './modules/bots'
import templates from './modules/template'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    bots,
    templates
  }
})
