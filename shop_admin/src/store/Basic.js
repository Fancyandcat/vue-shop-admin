import * as types from './mutations-types'
const BasicModule = {
  namespaced: true,
  state: {
    vxCurrentMenu: '0'
  },
  mutations: {
    [types.SET_CURRENT_MENU] (state, id) {
      state.vxCurrentMenu = id
    },
    [types.CLEAR_CURRENT_MENU] (state) {
      state.vxCurrentMenu = '0'
    }
  },
  getters: {
    vxCurrentMenu (state) {
      return state.vxCurrentMenu
    }
  }
}
export default BasicModule
