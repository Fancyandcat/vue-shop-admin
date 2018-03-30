import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/view/Login'
import Cloud from '@/components/view/Cloud'
import Bus from '@/components/view/Bus'
import Home from '@/components/content/index/Home'
import GoodsList from '@/components/content/goods/GoodsList'
import GoodsAdd from '@/components/content/goods/GoodsAdd'
Vue.use(Router)

let goods = [
  {
    path: 'goods',
    name: 'goods-list',
    component: GoodsList
  },
  {
    path: 'goods/add',
    name: 'goods-add',
    component: GoodsAdd
  }
]

let routes = [
  {
    path: '/',
    redirect: '/login'
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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
routes[2].children = routes[2].children.concat(
  goods
)

export default new Router({
  routes: routes
})
