/** @format */

import API from '@/utils/API'

export default {
  async fetchVGs({ commit }) {
    const res = await API.GET('/vgs')
    return commit('setVGs', res.data)
  },
  async deleteVGs({ dispatch }, deleteVGs) {
    var vgIdStr = deleteVGs.join(',')
    await API.DELETE(`/vgs/${vgIdStr}`)
    return await dispatch('fetchVGs')
  },
  async createVG({ dispatch }, payload) {
    await API.POST(`/vg`, payload)
    return await dispatch('fetchVGs')
  },
  async updateVG({ dispatch }, { vgId, payload }) {
    await API.PUT(`/vg/${vgId}`, payload)
    return await dispatch('fetchVGs')
  },
  exportVG(context, projectId) {
    return API.GET(`/measures/vg/export`, {
      projectId
    })
  }
}
