/** @format */

import API from '@/utils/API'

export default {
  async deleteSOItems({ dispatch }, deleteSOItems) {
    var so_ids = deleteSOItems.join(',')
    await API.DELETE(`/so-items/${so_ids}`)
    return await dispatch('fetchSOItems')
  },
  async fetchSOItem({ commit }, soId) {
    if (soId) {
      // edit
      const res = await API.GET(`/so-item/${soId}`)
      return await commit('soItem', res.data)
    } else {
      // create
      return await commit('soItem', {
        id: null,
        number: '',
        parameters: [],
        soModelId: null,
        soModel: {
          id: null
        }
      })
    }
  },
  updateSOItem(context, { soId, payload }) {
    return API.PUT(`/so-item/${soId}`, payload)
  },
  async fetchSOItems({ commit }) {
    const res = await API.GET('/so-items')
    return commit('soItems', res.data)
  },
  async createSOItem({ getters }) {
    const so_item = Object.assign(getters.soItem)
    so_item.soModelId = so_item.soModel.id
    return await API.POST('/so-item', so_item)
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
  },

  soModelOfItem({ commit }, model) {
    if (model) {
      commit('soItemParameters', model.parameters)
      commit('soModelOfItem', model)
    }
  }
}
