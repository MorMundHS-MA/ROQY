import Vue from 'vue'
import Router from 'vue-router'
import overview from '@/components/BotOverview'
import creator from '@/components/BotCreator'
import template from '@/components/BotTemplate'
import marketplace from '@/components/BotMarketplace'
import config from '@/components/BotConfig'
import login from '@/components/BotLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bots',
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
      path: '/config/bot/',
      name: 'config',
      component: config
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
<<<<<<< HEAD
    { path: '/',
=======
    {
      path: '/',
>>>>>>> 4995785437343fa239755c5cd61283c263bb489a
      redirect: '/bots'
    }
  ]
})
