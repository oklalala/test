/** @format */

import API from '@/utils/API'

export default {
  async fetchVGItems({ commit }) {
    const res = await API.GET('/vgs')
    return commit('setVGs', res.data)
  },
  async deleteVGs({ dispatch }, deleteVGs) {
    var vgIdStr = deleteVGs.join(',')
    await API.DELETE(`/vgs/${vgIdStr}`)
    return await dispatch('fetchVGItems')
  },
  async createVG({ dispatch }, payload) {
    await API.POST(`/vg`, payload)
    return await dispatch('fetchVGItems')
  },
  async updateVG({ dispatch }, { vgId, payload }) {
    await API.PUT(`/vg/${vgId}`, payload)
    return await dispatch('fetchVGItems')
  },
  exportVG(context, projectId) {
    return API.GET(`/measures/vg/export`, {
      projectId
    })
  }
}
