import Vue from 'vue'
import Vuex from 'vuex'
import Basic from './Basic.js'
import Goods from './Goods.js'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Goods,
    Basic
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState({ storage: window.sessionStorage })] : [createPersistedState({ storage: window.sessionStorage })]
})
