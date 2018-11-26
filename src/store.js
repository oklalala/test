/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import sendAPI from '@/utils/API'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    myId: '',
    me: null,
    users: [],
    roles: [],
    rolePermissions: [],
    companies: [],
    soItems: []
  },
  mutations: {
    setMyId(state, myId) {
      state.myId = myId
    },
    setToken(state, token) {
      state.token = token
    },
    setMe(state, me) {
      state.me = me
    },
    updateMe(state, payload) {
      state.me = Object.assign(state.me, payload)
    },
    setUsers(state, users) {
      state.users = users
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setRolePermissions(state, rolePermissions) {
      state.rolePermissions = [
        {
          role: 'ADMIN',
          permissions: [
            {
              name: 'monitor',
              value: true
            },
            {
              name: 'update',
              value: true
            },
          ]
        },
        {
          role: 'USER',
          permissions: [
            {
              name: 'monitor',
              value: false
            },
            {
              name: 'update',
              value: true
            },
          ]
        }
      ]
    },
    updateRolePermissions(state, {
      value,
      role,
      permissionIndex
    }) {
      state.rolePermissions = state.rolePermissions.map(item => {
        if (item.role === role) {
          item.permissions[permissionIndex].value = value
          console.log(item)
        }
        return item
      })
    },
    setCompanies(state, companies) {
      state.companies = companies
    },
    setSOItems(state, soItems) {
      state.soItems = soItems
    }
  },
  getters: {
    myId (state) {
      return state.myId
    },
    me (state) {
      return state.me
    },
    token(state) {
      return state.token
    },
    users(state) {
      return state.users
    },
    roles(state) {
      return state.roles
    },
    rolePermissions(state) {
      return state.rolePermissions
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
      return sendAPI('post', '/login', false, payload).then(res => {
        commit('setToken', res.data.token)
        commit('setMyId', res.data.userId)
      })
    },
    logout({ commit }) {
      commit('setToken', '')
    },
    getMe({ getters, commit }) {
      return sendAPI('get', `/user/${getters.myId}`, true).then(res => {
        commit('setMe', res.data.data)
      })
    },
    updateMe({ state, getters }) {
      console.log(state.me)
      return sendAPI('put', `/user/${getters.myId}`, true, state.me)
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
    },
    getRoles({ commit }) {
      return sendAPI('get', '/roles', true).then(res => {
        commit('setRoles', res.data.data)
      })
    },
    getRolePermissions({ commit }) {
      return sendAPI('get', '/role/permissions', true).then(res => {
        commit('setRolePermissions', res.data.data)
      })
    },
    updateRolePermissions({ state }) {
      return sendAPI('put', '/role/permissions', true, state.rolePermissions)
    },
    getCompanies({ commit }) {
      return sendAPI('get', '/companies', true).then(res => {
        commit('setCompanies', res.data.data)
      })
    },
    createCompany({ dispatch }, payload) {
      return sendAPI('post', `/company`, true, payload).then(() => {
        dispatch('getCompanies')
      })
    },
    deleteCompanies({ dispatch }, companyIds) {
      let companyIdsStr = companyIds.join(',')
      return sendAPI('delete', `/companies/${companyIdsStr}`, true).then(() => {
        dispatch('getCompanies')
      })
    },
    getSOItems({ commit }) {
      return sendAPI('get', '/so-items', true).then(res => {
        commit('setSOItems', res.data.data)
      })
    }
  }
})
