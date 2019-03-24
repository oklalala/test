/** @format */
import sendAPI from '@/utils/API'
export default {
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
    }
  },
  actions: {
    getUser({ commit }, userId) {
      return sendAPI('get', `/user/${userId}`, true).then(res => {
        commit('setUser', res.data.data)
      })
    },
    updateCurrentUser({ commit }, payload) {
      commit('setUser', payload)
    },
    updateUser(context, { userId, payload }) {
      return sendAPI('put', `/user/${userId}`, true, payload)
    },
    getUsers({ commit }) {
      return sendAPI('get', '/users', true).then(res => {
        commit('setUsers', res.data.data)
      })
    },
    deleteUsers({ dispatch }, userIds) {
      let userIdsStr = userIds.join(',')
      return sendAPI('delete', `/users/${userIdsStr}`, true).then(() => {
        dispatch('getUsers')
      })
    },
    createUser(context, payload) {
      return sendAPI('post', `/user`, true, payload)
    }
  }
}
