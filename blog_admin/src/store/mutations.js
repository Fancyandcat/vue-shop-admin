import * as types from './mutations-types'
const mutations = {
  [types.SET_CURRENT_MENU] (state, id) {
    console.log('为什么被设置了', id)
    state.vxCurrentMenu = id
  }
}
export default mutations
