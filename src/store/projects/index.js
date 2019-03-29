/** @format */
import actions from './actions'
export default {
  state: {
    data: [],
    one: {
      number: '',
      status: 'in-progress',
      name: '',
      address: '',
      companyId: '',
      sitePlan: '',
      OPT: [
        {
          id: '',
          name: ''
        }
      ],
      USER: [
        {
          id: '',
          name: ''
        }
      ],
      floor: 0,
      vgManagement: [
        {
          notice: 0,
          warning: 0,
          action: 0
        }
      ],
      soManagement: {
        notice: 0,
        warning: 0,
        action: 0
      },
      vgIds: [''],
      vgLocation: [
        {
          vgId: '',
          vgNumber: '',
          number: '',
          steelId: '',
          steelName: '',
          port: 0
        }
      ],
      soLocation: [
        {
          number: '',
          depth: 0
        }
      ],
      dataRangeVg: {
        end: '',
        start: ''
      }
    },
    indexFloor: 1
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
    },
    switchVg(state, { oldVg, newVg }) {
      const index = state.one.vgIds.indexOf(oldVg)
      state.one.vgIds.splice(index, 1, newVg)
    },
    vgManagement(state, { label, value }) {
      const floor = state.indexFloor
      state.one.vgManagement[floor][label] = value
    },
    soManagement(state, { label, value }) {
      state.one.soManagement[label] = value
    },
    indexFloor(state, floor) {
      state.indexFloor = floor
    },
    steelOfVgLocation(state, { location, selectedSteel }) {
      // eslint-disable-next-line
      let vgLocation = state.one.vgLocation
        .filter(item => item.number === location.number)
        .shift()
      vgLocation = Object.assign(vgLocation, {
        steelId: selectedSteel.id,
        steelName: selectedSteel.name
      })
    }
  },
  getters: {
    projects(state) {
      return state.data
    },
    project(state) {
      return state.one
    },
    optsInProject(state) {
      return state.one.OPT
    },
    usersInProject(state) {
      return state.one.USER
    },
    sitePlan(state) {
      if (!state.one.sitePlan) return ''
      else return `${process.env.VUE_APP_API_URL}/${state.one.sitePlan}`
    },
    vgIdsInProject(state) {
      return state.one.vgIds
    },
    vgsInProject(state, getters) {
      return getters.vgs.filter(vg => state.one.vgIds.some(id => vg.id === id))
    },
    vgsNotInProject(state, getters) {
      return getters.vgsFree
    },
    indexFloor(state) {
      return state.indexFloor
    },
    totalVgLocation(state) {
      return state.one.vgLocation.length
    },
    totalVgLocationPreFloor(state) {
      return Math.max(
        ...state.one.vgLocation.map(location =>
          Number(location.number.split('-').pop())
        )
      )
    },
    vgLocationCurrFloor(state) {
      return state.one.vgLocation.filter(
        location => parseInt(location.number.split('-')[1]) === state.indexFloor
      )
    },
    vgManagementOfCurrFloor(state) {
      return state.one.vgManagement[state.indexFloor]
    },
    soManagement(state) {
      return state.one.soManagement
    },
    totalSoLocation(state) {
      return state.one.soLocation.length
    },
    soLocation(state) {
      return state.one.soLocation
    }
  },
  actions
}
