/** @format */
import sendAPI from '@/utils/API'
import sendImageAPI from '@/utils/ImageAPI'
export default {
  state: {
    data: [],
    one: {}
  },
  mutations: {
    setProjects(state, projects) {
      state.data = projects
    },
    setProject(state, project) {
      state.one = project
    },
    updateConfigImage(state, url) {
      state.one.sitePlan = url
    }
  },
  getters: {
    projects(state) {
      return state.data
    },
    currentProject(state) {
      return state.one
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
    },
    uploadConfigImage({ commit }, file) {
      return sendImageAPI(file).then(res => {
        commit('updateConfigImage', res.data.url)
      })
    }
  }
}
