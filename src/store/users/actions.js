/** @format */

import API from '@/utils/API'

export default {
  async fetchUser({ commit }, userId) {
    if (!userId) {
      commit('currentUser', {
        account: '',
        name: '',
        password: '000',
        phone: '',
        email: '',
        roleName: 'USER',
        company: null,
        soItem: null
      })
    } else {
      const res = await API.GET(`/user/${userId}`)
      commit('currentUser', res.data)
    }
  },
  updateCurrentUser({ commit }, payload) {
    commit('currentUser', payload)
  },
  async createUser({ getters }) {
    return await API.POST(`/user`, {
      account: getters.currentUser.account,
      name: getters.currentUser.name,
      roleName: getters.currentUser.roleName,
      companyId: getters.currentUser.company
        ? getters.currentUser.company.id
        : '',
      soId: getters.currentUser.soItem ? getters.currentUser.soItem.id : ''
    })
  },
  async updateUser({ getters }, { userId }) {
    return await API.PUT(`/user/${userId}`, {
      account: getters.currentUser.account,
      name: getters.currentUser.name,
      roleName: getters.currentUser.roleName,
      companyId: getters.currentUser.company
        ? getters.currentUser.company.id
        : '',
      soId: getters.currentUser.soItem ? getters.currentUser.soItem.id : ''
    })
  },
  async getUsers({ commit }) {
    const res = await API.GET('/users')
    commit('everyone', res.data)
  },
  async deleteUsers({ dispatch }, userIds) {
    let userIdsStr = userIds.join(',')
    await API.DELETE(`/users/${userIdsStr}`)
    return dispatch('getUsers')
  },
}
