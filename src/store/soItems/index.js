/** @format */
import actions from './actions'

export default {
  state: {
    data: []
  },
  mutations: {
    setSOItems(state, soItems) {
      state.data = soItems
    }
  },
  getters: {
    soItems(state) {
      return state.data
    }
  },
  actions
}
