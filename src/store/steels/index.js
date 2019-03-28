/** @format */
import actions from './actions'

export default {
  actions,
  state: {
    data: []
  },
  mutations: {
    setSteels(state, steels) {
      state.data = steels
    }
  },
  getters: {
    steels(state) {
      return state.data
    }
  }
}
