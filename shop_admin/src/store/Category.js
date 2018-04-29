import * as types from './mutations-types'
const CategoryModule = {
  namespaced: true,
  state: {
    categoryId: ''
  },
  mutations: {
    [types.SET_CATEGORY_ID] (state, id) {
      state.categoryId = id
    }
  },
  getters: {
    categoryId (state) {
      return state.categoryId
    }
  }
}
export default CategoryModule
