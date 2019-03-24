/** @format */
import sendAPI from '@/utils/API'
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
  actions: {
    deleteSOItems({ dispatch }, deleteSOItems) {
      var soIdStr = deleteSOItems.join(',')
      return sendAPI('delete', `/so-items/${soIdStr}`, true).then(() => {
        dispatch('getSOItems')
      })
    },
    getSOItem(context, soId) {
      return sendAPI('get', `/so-item/${soId}`, true)
    },
    updateSOItem(context, { soId, payload }) {
      return sendAPI('put', `/so-item/${soId}`, true, payload)
    },
    getSOItems({ commit }) {
      return sendAPI('get', '/so-items', true).then(res => {
        commit('setSOItems', res.data.data)
      })
    },
    createSOItem(context, payload) {
      return sendAPI('post', '/so-item', true, payload)
    },
    exportSO(context, projectId) {
      return sendAPI('get', `/measures/so/export?${projectId}`, true)
    }
  }
}
