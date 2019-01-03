/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import localStore from 'store'

import sendAPI from '@/utils/API'

Vue.use(Vuex)

const vgs = {
  state: {
    data: []
  },
  mutations: {
    setVGs(state, vgs) {
      state.data = vgs
    }
  },
  getters: {
    vgs(state) {
      return state.data
    }
  },
  actions: {
    getVGs({ commit }) {
      return sendAPI('get', '/vgs', true).then(res => {
        commit('setVGs', res.data.data)
      })
    },
    deleteVGs({ dispatch }, deleteVGs) {
      var vgIdStr = deleteVGs.join(',')
      return sendAPI('delete', `/vgs/${vgIdStr}`, true).then(() => {
        dispatch('getVGs')
      })
    }
  }
}

const projects = {
  state: {
    data: []
    // projectStatus: ['end', 'in-progress']
  },
  mutations: {
    setProjects(state, projects) {
      state.data = projects
    }
  },
  getters: {
    projects(state) {
      return state.data
    }
  },
  actions: {
    getProject(context, projectId) {
      return sendAPI('get', `/project/${projectId}`, true)
    },
    updateProject(context, { projectId, payload }) {
      return sendAPI('put', `/project/${projectId}`, true, payload)
    },
    getProjects({ commit }) {
      return sendAPI('get', '/projects', true).then(res => {
        commit('setProjects', res.data.data)
      })
    },
    deleteProjects({ dispatch }, projectIds) {
      let projectIdsStr = projectIds.join(',')
      return sendAPI('delete', `/projects/${projectIdsStr}`, true).then(() => {
        dispatch('getProjects')
      })
    },
    createProject(context, payload) {
      return sendAPI('post', `/project`, true, payload)
    }
  }
}

const projectPhases = {
  state: {
    data: []
  },
  mutations: {
    setProjectPhases(state, projectPhases) {
      state.data = projectPhases
    }
  },
  getters: {
    projectPhases(state) {
      return state.data
    }
  },
  actions: {
    getProjectPhases({ commit }) {
      return sendAPI('get', '/project-phases', true).then(res => {
        console.log(res.data)
        commit('setProjectPhases', res.data.data)
      })
    },
    getProjectPhase(context, projectPhaseId) {
      return sendAPI('get', `/project-phase/${projectPhaseId}`, true)
    },
    updateProjectPhase(context, { projectPhaseId, payload }) {
      return sendAPI('put', `/project-phase/${projectPhaseId}`, true, payload)
    },
    deleteProjectPhases({ dispatch }, projectPhaseIds) {
      let projectPhaseIdsStr = projectPhaseIds.join(',')
      return sendAPI(
        'delete',
        `/project-phases/${projectPhaseIdsStr}`,
        true
      ).then(() => {
        dispatch('getProjectPhases')
      })
    },
    createProject(context, payload) {
      return sendAPI('post', `/project-phase`, true, payload)
    }
  }
}

const companies = {
  state: {
    data: []
  },
  mutations: {
    setCompanies(state, companies) {
      state.data = companies
    }
  },
  getters: {
    companies(state) {
      return state.data
    }
  },
  actions: {
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
    }
  }
}

const users = {
  state: {
    data: []
  },
  mutations: {
    setUsers(state, users) {
      state.data = users
    }
  },
  getters: {
    users(state) {
      return state.data
    }
  },
  actions: {
    getUser(context, userId) {
      return sendAPI('get', `/user/${userId}`, true)
    },
    updateUser(context, { userId, payload }) {
      return sendAPI('put', `/user/${userId}`, true, payload)
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
    }
  }
}

export default new Vuex.Store({
  modules: {
    users,
    projects,
    projectPhases,
    companies,
    vgs
  },
  state: {
    myId: '',
    token: '',
    myRole: '',
    me: {},
    permissions: {},
    roles: [],
    rolePermissions: [],
    companies: [],
    soItems: []
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
    setSOItems(state, soItems) {
      state.soItems = soItems
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    myId(state) {
      return state.myId
    },
    myRole(state) {
      return state.myRole
    },
    me(state) {
      return state.me
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
    soItems(state) {
      return state.soItems
    }
  },
  actions: {
    login({ commit }, payload) {
      return sendAPI('post', '/login', false, payload).then(res => {
        commit('setToken', res.data.token)
        commit('setMyId', res.data.userId)
        commit('setMyRole', res.data.role)
        localStore.set('ground_monitor_token', {
          token: res.data.token,
          myId: res.data.userId,
          myRole: res.data.role
        })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      localStore.remove('ground_monitor_token')
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
    getRolePermissions({ commit }) {
      return sendAPI('get', '/role/permissions', true).then(res => {
        commit('setRolePermissions', res.data.data)
      })
    },
    updateRolePermissions({ state }) {
      return sendAPI('put', '/role/permissions', true, state.rolePermissions)
    },
    getSOItems({ commit }) {
      return sendAPI('get', '/so-items', true).then(res => {
        commit('setSOItems', res.data.data)
      })
    }
  }
})
