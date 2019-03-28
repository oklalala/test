/** @format */
import actions from './actions'

export default {
  state: {
    data: [{
      id: '',
      name: ''
    }]
  },
  mutations: {
    setCompanies(state, companies) {
      state.data = companies
    }
  },
  getters: {
    companies(state) {
      return state.data
    },
    notMyCompanies (state, getters) {
      return state.data.filter(company => company.id !== getters.myCompany.id)
    }
  },
  actions
}
