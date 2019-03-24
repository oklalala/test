/** @format */

import actions from './actions'
export default {
  actions,
  state: {
    data: []
  },
  mutations: {
    setVGs(state, vgs) {
      state.data = vgs
    }
  },
  getters: {
    vgs(state) {
      return state.data
    }
  }
}
