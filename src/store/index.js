/** @format */

import Vue from 'vue'
import Vuex from 'vuex'

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
import projectMonitor from './projectMonitor'

import actions from './actions'

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
    soModels,
    projectMonitor
  },
  actions,
  state: {
    myId: '',
    token: '',
    myRole: '',
    myPermissions: '',
    me: {
      account: '',
      company: {
        id: '',
        name: ''
      },
      email: '',
      name: '',
      password: '',
      phone: '',
      roleName: '',
      soItem: ''
    },
    permissions: {},
    roles: [],
    rolePermissions: [
      {
        permissions: [
          {
            name: '',
            value: ''
          }
        ],
        role: ''
      }
    ],
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
    },
    myPhone(state, phone) {
      state.me.phone = phone
    },
    myMail(state, mail) {
      state.me.email = mail
    },
    myPassword(state, password) {
      state.me.password = password
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
    },
    myPhone(state) {
      return state.me.phone
    },
    myMail(state) {
      return state.me.email
    },
    myPassword(state) {
      return state.me.password
    },
    mySoItem(state, getters) {
      if (!state.me.soItem)
        return {
          number: '(無傾度管)'
        }
      return getters.soItem
    }
  }
})
