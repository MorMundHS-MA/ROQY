import data from '../../api/templateData'
import * as types from '../mutation-types'


//initial state
const state = {
    templates: []
}

const getters = {
    getTemplates: state => state.templates,
    getTemplate: (state, template) => state.templates[state.templates.indexOf(template)]
}
    
const mutations = {
    [types.ADD_NEW_TEMPALTE] (state, template) {
        state.templates.push(template)
    },

    [types.RECEIVE_TEMPLATES] (state ,{ templates}) {
        state.templates = templates
    }
}
    
const actions = {
    getAllTemplate ({commit}) {
        data.getTemplates( templats => {
            commit(types.RECEIVE_TEMPLATES, { templates })
        })
    }
}
    
    
export default {
    state,
    getters,
    mutations,
    actions
}