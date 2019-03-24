export default {
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
  },
  actions: {
    getSOModels({ commit }) {
      return sendAPI('get', 'so-models', true).then(res => {
        commit('setSOModels', res.data.data)
      })
    }
  }
}
