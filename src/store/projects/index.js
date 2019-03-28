/** @format */
import actions from './actions'
export default {
  state: {
    data: [],
    one: {
      OPT: []
    },
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
    },
    project(state, { property, value }) {
      state.one[property] = value
    }
  },
  getters: {
    projects(state) {
      return state.data
    },
    project(state) {
      return state.one
    },
    optsInProject (state) {
      return state.one.OPT
    },
    usersInProject (state) {
      return state.one.USER
    },
    sitePlan (state) {
      return `${process.env.VUE_APP_API_URL}/${state.one.sitePlan}`
    },
    vgIdsInProject (state) {
      return state.one.vgIds
    },
    vgsInProject (state, getters) {
      return state.one.vgIds.map(id => getters.vgs.filter(vg => vg.id === id))
    },
    vgsNotInProject (state, getters) {
      return state.one.vgIds//getters.vgs.fiilter(vg => getters.vgsInProject.some(vgInProject))
    }
  },
  actions
}
