/** @format */

import API from '@/utils/API'

export default {
  async getProject({ commit }, projectId) {
    const res = await API.GET(`/project/${projectId}`)
    commit('setProject', res.data)
  },
  updateCurrentProject({ commit }, payload) {
    commit('setProject', payload)
  },
  async updateProject({ getters }, { id }) {
    const project = Object.assign({}, getters.project)
    project.OPT = project.OPT.map(opt => opt.id)
    project.USER = project.USER.map(user => user.id)
    project.vgLocation = project.vgLocation.map(location => ({
      number: location.number,
      steelId: location.steelId,
      port: location.port
    }))
    project.floor = undefined
    project.dataRangeVg = undefined

    return await API.PUT(`/project/${id}`, project)
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
      console.log(res)
      commit('updateConfigImage', res.url)
    })
  }
}
