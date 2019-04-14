/** @format */

import API from '@/utils/API'

export default {
  async fetchCompanies({ commit }) {
    const res = await API.GET('/companies')
    commit('setCompanies', res.data)
    return Promise.resolve()
  },
  async createCompany({ dispatch }, payload) {
    await API.POST(`/company`, payload)
    return dispatch('fetchCompanies')
  },
  async deleteCompanies({ dispatch }, companyIds) {
    let companyIdsStr = companyIds.join(',')
    await API.DELETE(`/companies/${companyIdsStr}`)
    return dispatch('fetchCompanies')
  },
  updateCompany(context, { id, payload }) {
    return API.PUT(`/company/${id}`, payload)
  }
}
