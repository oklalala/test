export default {
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
  },
  actions: {
    getVGs({ commit }) {
      return sendAPI('get', '/vgs', true).then(res => {
        commit('setVGs', res.data.data)
      })
    },
    deleteVGs({ dispatch }, deleteVGs) {
      var vgIdStr = deleteVGs.join(',')
      return sendAPI('delete', `/vgs/${vgIdStr}`, true).then(() => {
        dispatch('getVGs')
      })
    },
    createVG(context, payload) {
      return sendAPI('post', `/vg`, true, payload)
    },
    updateVG(context, { vgId, payload }) {
      return sendAPI('put', `/vg/${vgId}`, true, payload)
    },
    exportVG(context, projectId) {
      return sendAPI('get', `/measures/vg/export?${projectId}`, true)
    }
  }
}
