/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    users: [],
    roles: [],
    companies: [],
    soItems: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsers(state, users) {
      state.users = users
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setCompanies(state, companies) {
      state.companies = companies
    },
    setSOItems(state, soItems) {
      state.soItems = soItems
    }
  },
  getters: {
    users(state) {
      return state.users
    },
    roles(state) {
      return state.roles
    },
    companies(state) {
      return state.companies
    },
    soItems(state) {
      return state.soItems
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
    },
    deleteUsers({ dispatch }, userIds) {
      let userIdsStr = userIds.join(',')
      return axios
        .delete(`http://localhost:3333/v1/users/${userIdsStr}`)
        .then(() => {
          dispatch('getUsers')
        })
    },
    createUser({}, payload) {
      return axios.post('http://localhost:3333/v1/user', payload)
    },
    getRoles({ commit }) {
      return axios.get('http://localhost:3333/v1/roles').then(res => {
        commit('setRoles', res.data.data)
      })
    },
    getCompanies({ commit }) {
      return axios.get('http://localhost:3333/v1/companies').then(res => {
        commit('setCompanies', res.data.data)
      })
    },
    getSOItems({ commit }) {
      return axios.get('http://localhost:3333/v1/so-items').then(res => {
        commit('setSOItems', res.data.data)
      })
    }
  }
})
