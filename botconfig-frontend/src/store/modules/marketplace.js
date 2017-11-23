import data from '../../api/marketplaceData'
import * as types from '../mutation-types'

const state = {
  marketplaceBots: [],
  marketplace: {}
}

const getters = {
  getMarketplaceBots: state => state.marketplaceBots
}

const actions = {
  getAllmarketplaceBots ({commit}) {
    data.getmarketplaceBots(marketplaceBots => {
      commit(types.RECEIVE_marketplaceBots, { marketplaceBots })
    })
  },
  addNewMarketplace ({commit}, marketplace) {
    data.addNewMarketplace(marketplacebot => {
      commit(types.ADD_NEW_BOT, {marketplace})
    }, marketplace)
  },
  deleteBot ({commit}, marketplace) {
    data.deleteBot(marketplace => {
      commit(types.DETELE_BOT, { marketplace })
    }, marketplace)
  }
}
const mutations = {
  [types.RECEIVE_marketplaceBots] (state, { marketplaceBots }) {
    state.marketplaceBots = marketplaceBots
  },
  [types.ADD_NEW_BOT] (state, { marketplace }) {
    state.marketplaceBots.push(marketplace)
  },
  [types.DETELE_BOT] (state, { marketplace }) {
    state.marketplaceBots.splice(state.marketplaceBots.indexOf(marketplace), 1)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
