/** @format */

import API from '@/utils/API'

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
    return await commit('setMe', res.data)
  },
  async updateMe({ state }) {
    return await API.PUT(`/user/self`, state.me)
  }
}
