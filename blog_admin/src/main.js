// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'common/stylus/reset.styl'
import AV from 'leancloud-storage'
import store from './store'
import BASEDATA from 'api/config'
import qiniu from 'qiniu-js'

import { getDataPost, getDataGet } from 'api/getData'
window.qiniu = qiniu
window.AV = AV
Vue.use(ElementUI)
Vue.config.productionTip = false
AV.init({
  appId: BASEDATA.appInfo.appId,
  appKey: BASEDATA.appInfo.appKey
})
Vue.prototype.$post = getDataPost
Vue.prototype.$get = getDataGet
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
