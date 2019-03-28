import API from '@/utils/API'

export default {
  async getProject({ commit }, projectId) {
    const res = await API.GET(`/project/${projectId}`)
    commit('setProject', res.data)
  },
  updateCurrentProject({ commit }, payload) {
    commit('setProject', payload)
  },
  updateProject(context, { projectId, payload }) {
    return API.PUT(`/project/${projectId}`, payload)
  },
  getProjects({ commit }) {
    return API.GET('/projects').then(res => {
      commit('setProjects', res.data)
    })
  },
  deleteProjects({ dispatch }, projectIds) {
    let projectIdsStr = projectIds.join(',')
    return API.DELETE(`/projects/${projectIdsStr}`).then(() => {
      dispatch('getProjects')
    })
  },
  createProject(context, payload) {
    return API.POST(`/project`, payload)
  },
  uploadConfigImage({ commit }, file) {
    return API.uploadImg(file).then(res => {
      console.log(res);
      commit('updateConfigImage', res.url)
    })
  }
}
