export default {
  state: {
    data: [],
    currentOne: []
  },
  mutations: {
    setProjects(state, projects) {
      state.data = projects
    },
    setProject(state, project) {
      state.currentOne = project
    }
  },
  getters: {
    projects(state) {
      return state.data
    },
    currentProject(state) {
      return state.currentOne
    }
  },
  actions: {
    getProject({ commit }, projectId) {
      return sendAPI('get', `/project/${projectId}`, true).then(res => {
        commit('setProject', res.data.data)
      })
    },
    updateCurrentProject({ commit }, payload) {
      commit('setProject', payload)
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
