import data from '../../api/templateData'
import * as types from '../mutation-types'

// initial state
const state = {
  templates: [
    {
      name: 'Welcome-Bot',
      image: '',
      description: ''

    },
    {
      name: 'FAQ-Bot',
      image: '',
      description: ''
    },
    {
      name: 'Ravenclaw-Bot',
      image: '',
      description: ''
    }
  ]
}

const getters = {
  getTemplates: state => state.templates,
  getTemplate: (state, template) => state.templates[state.templates.indexOf(template)]
}

const mutations = {
  [types.ADD_NEW_TEMPALTE] (state, template) {
    state.templates.push(template)
  },

  [types.RECEIVE_TEMPLATES] (state, { templates }) {
    state.templates = templates
  }
}

const actions = {
  getAllTemplate ({commit}) {
    data.getTemplates(templates => {
      commit(types.RECEIVE_TEMPLATES, { templates })
    })
  },
  addTemplate ({commit}, template) {
    data.addNewTemplate(teamplate => {
      commit(types.ADD_NEW_TEMPALTE, { template })
    }, template)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
