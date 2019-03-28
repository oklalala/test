import API from '@/utils/API-zero'

import router from '@/router'
import cookies from '@/cookies'

export default {
  login({ commit }, payload) {
    return API.POST('/login', payload).then(res => {
      commit('setToken', res.token)
      commit('setMyId', res.userId)
      commit('setMyRole', res.role)
      commit('setMyPermissions', res.permissions)
      cookies.saveLogin()
    })
  },
  logout({ commit }) {
    commit('setToken', '')
    cookies.clear()
    router.push('/')
  },
  async getMe({ getters, commit }) {
    const res = await API.GET(`/user/${getters.myId}`)
    commit('setMe', res.data)
  },
  async updateMe({ state }) {
    return await API.PUT(`/user/self`, state.me)
  },
  async getRoles({ commit }) {
    const res = await API.GET('/roles',)
    commit('setRoles', res.data)
  },
  async getPermissions({ commit }) {
    const res = await API.GET('/permissions',)
    commit('setPermissions', res.data)
  },
  async getRolesPermissions({ commit }) {
    const res = await API.GET('/role/permissions')
    commit('setRolePermissions', res.data)
  },
  async updateRolePermissions({ state }) {
    return await API.PUT('/role/permissions', state.rolePermissions)
  }
}
