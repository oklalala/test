/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    users: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  getters: {
    users(state) {
      return state.users
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
    },
    getUsers({ commit }) {
      return axios.get('http://localhost:3333/v1/users').then(res => {
        commit('setUsers', res.data.data)
      })
    }
  }
})
