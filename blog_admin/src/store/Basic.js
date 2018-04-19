import * as types from './mutations-types'
const BasicModule = {
  namespaced: true,
  state: {
    vxCurrentMenu: ''
  },
  mutations: {
    [types.SET_CURRENT_MENU] (state, id) {
      state.vxCurrentMenu = id
    }
  },
  getters: {
    vxCurrentMenu (state) {
      return state.vxCurrentMenu
    }
  }
}
export default BasicModule
