/** @format */
import actions from './actions'

export default {
  actions,
  state: {
    data: [],
    currentOne: {}
  },
  mutations: {
    setUsers(state, users) {
      state.data = users
    },
    setUser(state, user) {
      state.currentOne = user
    }
  },
  getters: {
    users(state) {
      return state.data
    },
    currentUser(state) {
      return state.currentOne
    },
    OPTs(state) {
      return state.data.filter(user => user.roleName == 'OPT')
    },
    USERs(state) {
      return state.data.filter(user => user.roleName == 'USER')
    },
    optsOfCustomerCompany (state, getters) {
      return getters.OPTs.filter(opt => opt.company.id === getters.project.companyId)
    },
    optsOfMyCompany (state, getters) {
      return getters.OPTs.filter(opt => opt.company.id === getters.myCompany.id)
    },
    usersOfCustomerCompany (state, getters) {
      return getters.USERs.filter(user => user.company.id === getters.project.companyId)
    },
    usersOfMyCompany (state, getters) {
      return getters.USERs.filter(user => user.company.id === getters.myCompany.id)
    }
  }
}
