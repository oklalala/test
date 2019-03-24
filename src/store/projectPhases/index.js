/** @format */
import sendAPI from '@/utils/API'
export default {
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
