// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'common/stylus/reset.styl'
import AV from 'leancloud-storage'
window.AV = AV
Vue.use(ElementUI)
Vue.config.productionTip = false
var APP_ID = 'IPqWSvhf3TreD8bipidSCJoz-gzGzoHsz'
var APP_KEY = 's8eGizSK6wpJFWaV5SlDWo4G'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
