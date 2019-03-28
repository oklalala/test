import API from '@/utils/API'

export default {
  async deleteSOItems({ dispatch }, deleteSOItems) {
    var soIdStr = deleteSOItems.join(',')
    await API.DELETE(`/so-items/${soIdStr}`)
    return await dispatch('getSOItems')
  },
  getSOItem(context, soId) {
    return API.GET(`/so-item/${soId}`)
  },
  updateSOItem(context, { soId, payload }) {
    return API.PUT(`/so-item/${soId}`, payload)
  },
  async getSOItems({ commit }) {
    const res = await API.GET('/so-items')
    return commit('setSOItems', res.data)
  },
  createSOItem(context, payload) {
    return API.POST('/so-item', payload)
  },
  exportSO(context, projectId) {
    return API.GET(`/measures/so/export`, {
      projectId
    })
  }
}
