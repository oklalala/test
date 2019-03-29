/** @format */

import API from '@/utils/API'

export default {
  getProjectPhases({ commit }) {
    return API.GET('/project-phases').then(res => {
      commit('setProjectPhases', res.data)
    })
  },
  getProjectPhase(context, projectPhaseId) {
    return API.GET(`/project-phase/${projectPhaseId}`)
  },
  updateProjectPhase(context, { projectPhaseId, payload }) {
    return API.PUT(`/project-phased/${projectPhaseId}`, payload)
  },
  deleteProjectPhases({ dispatch }, projectPhaseIds) {
    let projectPhaseIdsStr = projectPhaseIds.join(',')
    return API.DELETE(`/project-phases/${projectPhaseIdsStr}`).then(() => {
      dispatch('getProjectPhases')
    })
  },
  createProjectPhase(context, payload) {
    return API.POST('/project-phased', payload)
  }
}
