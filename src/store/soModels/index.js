/** @format */
import actions from './actions'

export default {
  actions,
  state: {
    data: []
  },
  mutations: {
    setSOModels(state, soModels) {
      state.data = soModels
    }
  },
  getters: {
    soModels(state) {
      return state.data
    }
  }
}
