import * as types from './mutations-types'
const GoodsModule = {
  namespaced: true,
  state: {
    goodsId: ''
  },
  mutations: {
    [types.SET_GOODS_ID] (state, id) {
      state.goodsId = id
    }
  },
  getters: {
    goodsId (state) {
      return state.goodsId
    }
  }
}
export default GoodsModule
