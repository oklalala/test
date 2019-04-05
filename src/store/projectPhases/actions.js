/** @format */

import API from '@/utils/API'

export default {
  async fetchProjectPhases({ commit }) {
    const res = await API.GET('/project-phases')
    commit('setProjectPhases', res.data)
    return Promise.resolve()
  },
  async getProjectPhase(context, id) {
    return await API.GET(`/project-phase/${id}`)
  },
  async updateProjectPhase({ dispatch }, { id, payload }) {
    const res = await API.PUT(`/project-phased/${id}`, payload)
    await dispatch('fetchProjectPhases')
    return res
  },
  async deleteProjectPhases({ dispatch }, projectPhaseIds) {
    let projectPhaseIdsStr = projectPhaseIds.join(',')
    await API.DELETE(`/project-phases/${projectPhaseIdsStr}`)
    return await dispatch('fetchProjectPhases')
  },
  async createProjectPhase({ dispatch }, payload) {
    await API.POST('/project-phased', payload)
    return await dispatch('fetchProjectPhases')
  }
}
