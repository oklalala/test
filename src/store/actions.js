/** @format */

import API from '@/utils/API'

import router from '@/router'
import cookies from '@/cookies'

export default {
  async login({ commit }, payload) {
    const res = await API.POST('/login', payload)
    commit('setToken', res.token)
    commit('setMyId', res.userId)
    commit('setMyRole', res.role)
    commit('setMyPermissions', res.permissions)
    cookies.saveLogin()
    return Promise.resolve()
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
  },
  async dev() {
    return await Promise.resolve('chris')
  }
}
