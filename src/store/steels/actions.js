/** @format */

import API from '@/utils/API'

export default {
  async getSteels({ commit }) {
    const res = await API.GET('/steels')
    commit('setSteels', res.data)
  },
  createSteel(context, payload) {
    return API.POST(`/steel`, payload)
  },
  async deleteSteels({ dispatch }, steelIds) {
    let steelIdsStr = steelIds.join(',')
    await API.DELETE(`/steels/${steelIdsStr}`)
    return await dispatch('getSteels')
  },
  updateSteel(context, { steelId, payload }) {
    return API.PUT(`/steel/${steelId}`, payload)
  }
}
