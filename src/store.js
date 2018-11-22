/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    login({ commit }, payload) {
      return axios.post('http://localhost:3333/v1/login', payload).then(res => {
        commit('setToken', res.data.token)
      })
    },
    logout({ commit }) {
      commit('setToken', '')
    }
  }
})
