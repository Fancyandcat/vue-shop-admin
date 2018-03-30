import * as types from './mutations-types'
const mutations = {
  [types.SET_CURRENT_MENU] (state, id) {
    state.vxCurrentMenu = id
  }
}
export default mutations
