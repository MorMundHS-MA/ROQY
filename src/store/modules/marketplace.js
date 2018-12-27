import data from '../../api/marketplaceData'
import * as types from '../mutation-types'

const state = {
  marketplaceBots: []
}

const getters = {
  getMarketplaceBots: state => state.marketplaceBots
}

const actions = {
  getAllmarketplaceBots ({commit}) {
    data.getmarketplaceBots(marketplaceBots => {
      commit(types.MARKETPLACE_RECEIVEBOT, { marketplaceBots })
    })
  },
  addNewMarketplace ({commit}, bot) {
    data.addNewMarketplace(bot => {
      commit(types.MARKETPLACE_ADDNEWBOT, { bot })
    }, bot)
  },
  deleteBot ({commit}, marketplace) {
    data.deleteBot(marketplace => {
      commit(types.MARKETPLACE_DELETEBOT, { marketplace })
    }, marketplace)
  }
}

const mutations = {
  [types.MARKETPLACE_RECEIVEBOT] (state, { marketplaceBots }) {
    state.marketplaceBots = marketplaceBots
  },
  [types.MARKETPLACE_ADDNEWBOT] (state, { bot }) {
    state.marketplaceBots.push(bot)
  },
  [types.MARKETPLACE_DELETEBOT] (state, { marketplace }) {
    state.marketplaceBots.splice(state.marketplaceBots.indexOf(marketplace), 1)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
