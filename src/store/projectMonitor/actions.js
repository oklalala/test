/** @format */

import API from '@/utils/API'

export default {
  async fetchVgMeasuredData({ commit }, query) {
    const res = await API.GET(`/measures/vg`, query)
    commit('vgMeasuredData', res.data)
  },
  async fetchSoMeasuredData({ commit }, query) {
    const res = await API.GET(`/measures/so`, query)
    commit('soMeasuredData', res.data)
  }
}
