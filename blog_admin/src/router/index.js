import Vue from 'vue'
import Router from 'vue-router'
import Cloud from '@/components/view/Cloud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cloud',
      component: Cloud
    }
  ]
})
