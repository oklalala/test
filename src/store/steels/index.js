/** @format */
import sendAPI from '@/utils/API'
export default {
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
  },
  actions: {
    getSteels({ commit }) {
      return sendAPI('get', '/steels', true).then(res => {
        commit('setSteels', res.data.data)
      })
    },
    createSteel(context, payload) {
      return sendAPI('post', `/steel`, true, payload)
    },
    deleteSteels({ dispatch }, steelIds) {
      let steelIdsStr = steelIds.join(',')
      return sendAPI('delete', `/steels/${steelIdsStr}`, true).then(() => {
        dispatch('getSteels')
      })
    },
    updateSteel(context, { steelId, payload }) {
      return sendAPI('put', `/steel/${steelId}`, true, payload)
    }
  }
}
