import Vue from 'vue'
import Router from 'vue-router'
import Cloud from '@/components/view/Cloud'
import Bus from '@/components/view/Bus'
import Home from '@/components/content/index/Home'
import BlogList from '@/components/content/blog/BlogList'
Vue.use(Router)

let blog = [
  {
    path: 'blog',
    name: 'blog-list',
    component: BlogList
  }
]

let routes = [
  {
    path: '/',
    redirect: '/cloud/index'
  },
  {
    path: '/cloud',
    redirect: '/cloud/index'
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: Cloud,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Home
      },
      {
        path: 'bus',
        name: 'bus',
        component: Bus
      }
    ]
  }
]
routes[2].children = routes[2].children.concat(
  blog
)

export default new Router({
  routes: routes
})
