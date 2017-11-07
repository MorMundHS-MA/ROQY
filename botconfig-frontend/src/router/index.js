import Vue from 'vue'
import Router from 'vue-router'
import overview from '@/components/BotOverview'
import creator from '@/components/BotCreator'
import template from '@/components/BotTemplate'
import marketplace from '@/components/BotMarketplace'
import config from '@/components/BotConfig'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/template',
      name: 'template',
      component: template
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: marketplace
    },
    {
      path: '/config/bot/:id',
      name: 'config',
      component: config
    }
  ]
})
