import data from '../../api/botData'
import * as types from '../mutation-types'

// initial state
const state = {
  bots: [],
  bot: {}
}

const getters = {
  getbots () {
    return state.bots
  },
  getBot () {
    return state.bot
  },
  getName (state, bot) {
    return state.bots[state.bots.indexOf(bot)].name
  },
  getState (state, bot) {
    return state.bots[state.bots.indexOf(bot)].status
  }
}

const actions = {
  getAllBots ({commit}) {
    data.getBots(bots => {
      commit(types.RECEIVE_BOTS, { bots })
    })
  },
  addNewBot ({commit}, bot) {
    data.addNewBot(bot => {
      commit(types.ADD_NEW_BOT, {bot})
    }, bot)
  },
  deleteBot ({commit}, bot) {
    data.deleteBot(bot => {
      commit(types.DETELE_BOT, { bot })
    }, bot)
  },
  renameBot ({commit}, bot) {
    data.renameBot(bot => {
      commit(types.RENAME_BOT, { bot })
    }, bot)
  },
  changeStatus ({commit}, bot) {
    data.changeBotState(
            bot,
            () => commit(types.CHANGE_STATE_TO_START, { bot }),
            () => commit(types.CHANGE_STATE_TO_STOP, { bot })
        )
  },
  getBot ({commit}, bot) {
    data.getBot(bot => {
      commit(types.RECEIVE_BOT, { bot })
    }, bot)
  }
}

const mutations = {
  [types.RECEIVE_BOTS] (state, { bots }) {
    state.bots = bots
  },
  [types.ADD_NEW_BOT] (state, { bot }) {
    state.bots.push(bot)
  },
  [types.DETELE_BOT] (state, { bot }) {
    state.bots.splice(state.bots.indexOf(bot), 1)
  },
  [types.RENAME_BOT] (state, { bot }) {
    state.bots[state.bots.indexOf(bot)].name = bot[1].name
  },
  [types.CHANGE_STATE_TO_START] (state, { bot }) {
    state.bots[state.bots.indexOf(bot)].status = 'Running'
  },
  [types.CHANGE_STATE_TO_STOP] (state, { bot }) {
    state.bots[state.bots.indexOf(bot)].status = 'Stopped'
  },
  [types.RECEIVE_BOT] (state, { bot }) {
    state.bot = bot
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
