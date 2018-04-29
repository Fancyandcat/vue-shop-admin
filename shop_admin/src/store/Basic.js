import * as types from './mutations-types'
const BasicModule = {
  namespaced: true,
  state: {
    vxCurrentMenu: '0',
    vxQueryObj: {}
  },
  mutations: {
    [types.SET_CURRENT_MENU] (state, id) {
      state.vxCurrentMenu = id
    },
    [types.CLEAR_CURRENT_MENU] (state) {
      state.vxCurrentMenu = '0'
    },
    [types.SET_QUERY_OBJ] (state, { path, query }) {
      state.vxQueryObj[path] = Object.assign({}, state.vxQueryObj[path], query)
    },
    [types.CLEAR_QUERY_OBJ] (state, query) {
      state.vxQueryObj = {}
    }
  },
  getters: {
    vxCurrentMenu (state) {
      return state.vxCurrentMenu
    },
    vxQueryObj (state) {
      return state.vxQueryObj
    }
  }
}
export default BasicModule
