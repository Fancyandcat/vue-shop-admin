import Vue from 'vue'
import Vuex from 'vuex'
import Basic from './Basic.js'
import Goods from './Goods.js'
import Category from './Category.js'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
// 不要忘记加 namespaced: true 来开启命名空间
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Goods,
    Basic,
    Category
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState({ storage: window.sessionStorage })] : [createPersistedState({ storage: window.sessionStorage })]
})
