/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import cookies from '@/cookies'

import sendAPI from '@/utils/API'
Vue.use(Vuex)

import users from './users'
import projects from './projects'
import projectPhases from './projectPhases'
import companies from './companies'
import vgs from './vgs'
import steels from './steels'
import measureSO from './measureSO'
import soItems from './soItems'
import soModels from './soModels'

export default new Vuex.Store({
  modules: {
    users,
    projects,
    projectPhases,
    companies,
    vgs,
    steels,
    measureSO,
    soItems,
    soModels
  },
  state: {
    myId: '',
    token: '',
    myRole: '',
    myPermissions: '',
    me: {},
    permissions: {},
    roles: [],
    rolePermissions: [],
    companies: [],
    soItems: [],
    lastPath: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setMyId(state, myId) {
      state.myId = myId
    },
    setMyRole(state, myRole) {
      state.myRole = myRole
    },
    setMyPermissions(state, myPermissions) {
      state.myPermissions = myPermissions
    },
    setLastPath(state, path) {
      state.lastPath = path
    },
    setMe(state, me) {
      state.me = me
    },
    updateMe(state, payload) {
      state.me = Object.assign(state.me, payload)
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setRolePermissions(state, rolePermissions) {
      state.rolePermissions = rolePermissions
    },
    updateRolePermissions(state, { value, role, permissionIndex }) {
      state.rolePermissions = state.rolePermissions.map(item => {
        if (item.role === role) {
          item.permissions[permissionIndex].value = value
        }
        return item
      })
    }
  },
  getters: {
    isLogined(state) {
      return !!(
        state.token &&
        state.myId &&
        state.myRole &&
        state.myPermissions
      )
    },
    token(state) {
      return state.token
    },
    myId(state) {
      return state.myId
    },
    myRole(state) {
      return state.myRole
    },
    myPermissions(state) {
      return state.myPermissions
    },
    lastPath(state) {
      return state.lastPath
    },
    me(state) {
      return state.me
    },
    myCompany(state) {
      return state.me.company
    },
    permissions(state) {
      return state.permissions
    },
    roles(state) {
      return state.roles
    },
    rolePermissions(state) {
      return state.rolePermissions
    }
  },
  actions: {
    login({ commit }, payload) {
      return sendAPI('post', '/login', false, payload).then(res => {
        commit('setToken', res.data.token)
        commit('setMyId', res.data.userId)
        commit('setMyRole', res.data.role)
        commit('setMyPermissions', res.data.permissions)
        cookies.saveLogin()
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      cookies.clear()
      router.push('/')
    },
    getMe({ getters, commit }) {
      return sendAPI('get', `/user/${getters.myId}`, true).then(res => {
        commit('setMe', res.data.data)
      })
    },
    updateMe({ state }) {
      return sendAPI('put', `/user/self`, true, state.me)
    },
    getRoles({ commit }) {
      return sendAPI('get', '/roles', true).then(res => {
        commit('setRoles', res.data.data)
      })
    },
    getPermissions({ commit }) {
      return sendAPI('get', '/permissions', true).then(res => {
        commit('setPermissions', res.data.data)
      })
    },
    getRolesPermissions({ commit }) {
      return sendAPI('get', '/role/permissions', true).then(res => {
        commit('setRolePermissions', res.data.data)
      })
    },
    updateRolePermissions({ state }) {
      return sendAPI('put', '/role/permissions', true, state.rolePermissions)
    },
    getMeasuredVG(context, payload) {
      var projectId = payload.projectId
      var date = payload.date
      var floor = payload.floor
      return sendAPI(
        'get',
        `/measures/vg?projectId=${projectId}&date=${date}&floor=${floor}`,
        true
      )
    },
    getMeasuredSO(context, payload) {
      var projectId = payload.projectId
      var soLocationNumber = payload.soLocationNumber
      return sendAPI(
        'get',
        `/measures/so?projectId=${projectId}&soLocationNumber=${soLocationNumber}`,
        true
      )
    }
  }
})
