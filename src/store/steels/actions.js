/** @format */

import API from '@/utils/API'

export default {
  async fetchSteels({ commit }) {
    const res = await API.GET('/steels')
    commit('steels', res.data)
  },
  async fetchSteel({ commit, getters }, id) {
    if (id) {
      const steel = getters.steels.filter(steel => steel.id === id).shift()
      commit('steel', steel)
    } else {
      commit('steel', {
        id: '',
        name: '',
        sectionArea: 0,
        es: 0,
        tcm: 0,
        tcg: 0
      })
    }
  },
  async createSteel({ dispatch, getters }) {
    await API.POST(`/steel`, getters.steel)
    return await dispatch('fetchSteels')
  },
  async deleteSteels({ dispatch }, steelIds) {
    let steelIdsStr = steelIds.join(',')
    await API.DELETE(`/steels/${steelIdsStr}`)
    return await dispatch('fetchSteels')
  },
  async updateSteel({ dispatch, getters }, steelId) {
    await API.PUT(`/steel/${steelId}`, getters.steel)
    return await dispatch('fetchSteels')
  }
}
