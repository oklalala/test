/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sendAPI from '@/utils/API'

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
    token(state) {
      return state.token
    },
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
      return sendAPI('post', '/login', false, payload)
        .then(res => {
          commit('setToken', res.data.token)
        })
    },
    logout({ commit }) {
      commit('setToken', '')
    },
    getUsers({ commit }) {
      return sendAPI('get', '/users', true).then(res => {
        commit('setUsers', res.data.data)
      })
    },
    deleteUsers({ dispatch }, userIds) {
      let userIdsStr = userIds.join(',')
      return sendAPI('delete', `/users/${userIdsStr}`, true)
        .then(() => {
          dispatch('getUsers')
        })
    },
    createUser({}, payload) {
      return sendAPI('post', `/user`, true, payload)
    },
    getRoles({ commit }) {
      return sendAPI('get', '/roles', true).then(res => {
        commit('setRoles', res.data.data)
      })
    },
    getCompanies({ commit }) {
      return sendAPI('get', '/companies', true).then(res => {
        commit('setCompanies', res.data.data)
      })
    },
    getSOItems({ commit }) {
      return sendAPI('get', '/so-items', true).then(res => {
        commit('setSOItems', res.data.data)
      })
    }
  }
})
