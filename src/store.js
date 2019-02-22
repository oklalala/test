/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import localStore from 'store'

import sendAPI from '@/utils/API'

Vue.use(Vuex)

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
        commit('setProjectPhases', res.data.data)
      })
    },
    getProjectPhase(context, projectPhaseId) {
      return sendAPI('get', `/project-phase/${projectPhaseId}`, true)
    },
    updateProjectPhase(context, { projectPhaseId, payload }) {
      return sendAPI('put', `/project-phased/${projectPhaseId}`, true, payload)
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
    createProjectPhase(context, payload) {
      return sendAPI('post', '/project-phased', true, payload)
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
    },
    OPTs(state) {
      return state.data.filter(user => user.roleName == 'OPT')
    },
    USERs(state) {
      return state.data.filter(user => user.roleName == 'USER')
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
const steels = {
  state: {
    data: []
  },
  mutations: {
    setSteels(state, steels) {
      state.data = steels
    }
  },
  getters: {
    steels(state) {
      return state.data
    }
  },
  actions: {
    getSteels({ commit }) {
      return sendAPI('get', '/steels', true).then(res => {
        commit('setSteels', res.data.data)
      })
    },
    createSteel(context, payload) {
      return sendAPI('post', `/steel`, true, payload)
    },
    deleteSteels({ dispatch }, steelIds) {
      let steelIdsStr = steelIds.join(',')
      return sendAPI('delete', `/steels/${steelIdsStr}`, true).then(() => {
        dispatch('getSteels')
      })
    },
    updateSteel(context, { steelId, payload }) {
      return sendAPI('put', `/steel/${steelId}`, true, payload)
    }
  }
}

const measureSO = {
  state: {
    tempFormulaParameter: [
      37.7705,
      137.7711,
      161.2568,
      131.165,
      54.3038,
      9.3219
    ]
  },
  getters: {
    getSO_C: state => {
      return state.SO_C
    },
    getTempFormulaParameter: state => {
      return state.tempFormulaParameter
    }
  },
  mutations: {
    setSO_C: (state, SO_C) => {
      state.SO_C = SO_C
    },
    setTempFormulaParameter: (state, tempFormulaParameter) => {
      state.tempFormulaParameter = tempFormulaParameter
    }
  },
  actions: {
    uploadMeasuresDatas: (state, measuresData) => {
      return sendAPI('post', `/measures/so`, true, measuresData)
    }
  }
}

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
    },
    createVG(context, payload) {
      return sendAPI('post', `/vg`, true, payload)
    },
    updateVG(context, { vgId, payload }) {
      return sendAPI('put', `/vg/${vgId}`, true, payload)
    }
  }
}

const soItems = {
  state: {
    data: []
  },
  mutations: {
    setSOItems(state, soItems) {
      state.data = soItems
    }
  },
  getters: {
    soItems(state) {
      return state.data
    }
  },
  actions: {
    deleteSOItems({ dispatch }, deleteSOItems) {
      var soIdStr = deleteSOItems.join(',')
      return sendAPI('delete', `/so-items/${soIdStr}`, true).then(() => {
        dispatch('getSOItems')
      })
    },
    getSOItem(context, soId) {
      return sendAPI('get', `/so-item/${soId}`, true)
    },
    updateSOItem(context, { soId, payload }) {
      return sendAPI('put', `/so-item/${soId}`, true, payload)
    },
    getSOItems({ commit }) {
      return sendAPI('get', '/so-items', true).then(res => {
        commit('setSOItems', res.data.data)
      })
    },
    createSOItem(context, payload) {
      return sendAPI('post', '/so-item', true, payload)
    }
  }
}
const soModels = {
  state: {
    data: []
  },
  mutations: {
    setSOModels(state, soModels) {
      state.data = soModels
    }
  },
  getters: {
    soModels(state) {
      return state.data
    }
  },
  actions: {
    getSOModels({ commit }) {
      return sendAPI('get', 'so-models', true).then(res => {
        commit('setSOModels', res.data.data)
      })
    }
  }
}

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
    myPermissions: [],
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
    setMyPermissions(state, myPermissions) {
      state.myPermissions = myPermissions
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
    }
  },
  actions: {
    login({ commit }, payload) {
      return sendAPI('post', '/login', false, payload).then(res => {
        commit('setToken', res.data.token)
        commit('setMyId', res.data.userId)
        commit('setMyRole', res.data.role)
        commit('setMyPermissions', res.data.permissions)
        localStore.set('ground_monitor_token', {
          token: res.data.token,
          myId: res.data.userId,
          myRole: res.data.role,
          myPermissions: res.data.permissions
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
      var vgLocationNumber = payload.vgNumber
      return sendAPI(
        'get',
        `/measures/vg?projectId=${projectId}&date=${date}&vgLocationNumber=${vgLocationNumber}`,
        true
      )
    },
    getMeasuredSO(context, payload) {
      var projectId = payload.projectId
      var date = payload.date
      var soLocationNumber = payload.soNumber
      return sendAPI(
        'get',
        `/measures/so?projectId=${projectId}&date=${date}&soLocationNumber=${soLocationNumber}`,
        true
      )
    }
  }
})
