import Vue from 'vue'
import Router from 'vue-router'
import overview from '@/components/BotOverview'
import creator from '@/components/BotCreator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: overview
    },
    {
      path: '/newbot',
      name: 'newbot',
      component: creator
    }
  ],
  mode: 'history'
})
