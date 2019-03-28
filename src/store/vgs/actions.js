/** @format */

import sendAPI from '@/utils/API'
import API from '@/utils/API-zero'

export default {
  async getVGs({ commit }) {
    const res = await API.GET('/vgs')
    return commit('setVGs', res.data)
  },
  async deleteVGs({ dispatch }, deleteVGs) {
    var vgIdStr = deleteVGs.join(',')
    await API.DELETE(`/vgs/${vgIdStr}`)
    return dispatch('getVGs')
  },
  createVG(context, payload) {
    return API.POST(`/vg`, payload)
  },
  updateVG(context, { vgId, payload }) {
    return API.PUT(`/vg/${vgId}`, payload)
  },
  exportVG(context, projectId) {
    return API.GET(`/measures/vg/export?projectId=${projectId}`)
  }
}
