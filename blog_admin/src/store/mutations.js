import * as types from './mutations-types'
const mutations = {
  [types.SET_CURRENT_MENU] (state, id) {
    state.vxCurrentMenu = id
  },
  [types.SET_GOODS_ID] (state, id) {
    state.goodsId = id
  }
}
export default mutations
