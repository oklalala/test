/** @format */

import API from '@/utils/API'

export default {
  async deleteSOItems({ dispatch }, deleteSOItems) {
    var so_ids = deleteSOItems.join(',')
    await API.DELETE(`/so-items/${so_ids}`)
    return await dispatch('fetchSOItems')
  },
  async fetchSOItem({ commit }, soId) {
    const res = await API.GET(`/so-item/${soId}`)
    commit('soItem', res.data)
  },
  updateSOItem(context, { soId, payload }) {
    return API.PUT(`/so-item/${soId}`, payload)
  },
  async fetchSOItems({ commit }) {
    const res = await API.GET('/so-items')
    return commit('soItems', res.data)
  },
  createSOItem(context, payload) {
    return API.POST('/so-item', payload)
  },
  exportSO(context, projectId) {
    return API.GET(`/measures/so/export`, {
      projectId
    })
  },
  useModelParameters({ commit, getters }, soModelId) {
    const so_models = getters.soModels
    const so_model = so_models.filter(item => item.id === soModelId).shift()
    commit('soItemParameters', so_model.parameters)
  }
}
