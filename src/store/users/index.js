/** @format */
import actions from './actions'

export default {
  actions,
  state: {
    data: [],
    one: {}
  },
  mutations: {
    everyone(state, users) {
      state.data = users
    },
    currentUser(state, user) {
      state.one = user
    },
    currentUserName(state, name) {
      state.one.name = name
    },
    currentUserRoleName(state, roleName) {
      state.one.roleName = roleName
    },
    currentUserAccount(state, account) {
      state.one.account = account
    },
    currentUserCompany(state, company) {
      state.one.company = {
        id: company.id,
        name: company.name
      }
    },
    currentUserSoItem(state, soItem) {
      state.one.soItem = {
        id: soItem.id,
        number: soItem.number
      }
    },
  },
  getters: {
    everyone(state) {
      return state.data
    },
    currentUser(state) {
      return state.one
    },
    OPTs(state) {
      return state.data.filter(user => user.roleName == 'OPT')
    },
    USERs(state) {
      return state.data.filter(user => user.roleName == 'USER')
    },
    optsOfCustomerCompany(state, getters) {
      return getters.OPTs.filter(
        opt => opt.company.id === getters.project.companyId
      )
    },
    optsOfMyCompany(state, getters) {
      return getters.OPTs.filter(opt => opt.company.id === getters.myCompany.id)
    },
    usersOfCustomerCompany(state, getters) {
      return getters.USERs.filter(
        user => user.company.id === getters.project.companyId
      )
    },
    usersOfMyCompany(state, getters) {
      return getters.USERs.filter(
        user => user.company.id === getters.myCompany.id
      )
    },
    currentUserPermissions(state, getters) {
      let role = getters.rolePermissions
        .filter(auth => auth.role === state.one.roleName)
        .shift()
      if (!role) role = getters.rolePermissions.slice().shift()
      return role.permissions
    },
  }
}
