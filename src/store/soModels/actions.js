/** @format */

import API from '@/utils/API'

export default {
  async fetchSOModels({ commit }) {
    const res = await API.GET('/so-models')
    return await commit('setSOModels', res.data)
  }
}
