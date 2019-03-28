import API from '@/utils/API'

export default {
  async getUser({ commit }, userId) {
    const res = await API.GET(`/user/${userId}`)
    commit('setUser', res.data)
  },
  updateCurrentUser({ commit }, payload) {
    commit('setUser', payload)
  },
  updateUser(context, { userId, payload }) {
    return API.PUT(`/user/${userId}`, payload)
  },
  async getUsers({ commit }) {
    const res = await API.GET('/users')
    commit('setUsers', res.data)
  },
  async deleteUsers({ dispatch }, userIds) {
    let userIdsStr = userIds.join(',')
    await API.DELETE(`/users/${userIdsStr}`)
    return dispatch('getUsers')
  },
  createUser(context, payload) {
    return API.POST(`/user`, payload)
  }
}
