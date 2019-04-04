/** @format */

import API from '@/utils/API'

export default {
  getCompanies({ commit }) {
    return API.GET('/companies').then(res => {
      commit('setCompanies', res.data)
    })
  },
  createCompany({ dispatch }, payload) {
    return API.POST(`/company`, payload).then(() => {
      dispatch('getCompanies')
    })
  },
  deleteCompanies({ dispatch }, companyIds) {
    let companyIdsStr = companyIds.join(',')
    return API.DELETE(`/companies/${companyIdsStr}`).then(() => {
      dispatch('getCompanies')
    })
  },
  updateCompany(context, { companyId, payload }) {
    return API.PUT(`/company/${companyId}`, payload)
  }
}