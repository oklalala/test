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
    currentVgFloor: 1,
    createData: {
      totalVgPreFloor: 0,
      defaultDepth: 0,
      totalEstimatedSoLocation: 0
    }
  },
  mutations: {
    resetCreateData(state) {
      state.createData = {
        totalVgPreFloor: 0,
        defaultDepth: 0,
        totalEstimatedSoLocation: 0
      }
    },
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
    switchVg(state, { index, newVgId }) {
      state.one.vgIds.splice(index, 1, newVgId)
      state.one.vgIds = [...state.one.vgIds]
    },
    vgManagementValue(state, { label, value }) {
      state.one.vgManagement[state.currentVgFloor - 1][label] = value
    },
    soManagementValue(state, { label, value }) {
      state.one.soManagement[label] = value
    },
    currentFloor(state, floor) {
      state.currentVgFloor = floor
    },
    totalVgPreFloor(state, floor) {
      state.createData.totalVgPreFloor = floor
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
    },
    defaultDepth(state, depth) {
      state.createData.defaultDepth = depth
    },
    // totalSoLocation(state, total) {
    //   const locations = []
    //   locations.length = total
    //   state.one.soLocation = locations
    // },
    totalEstimatedSoLocation(state, total) {
      state.createData.totalEstimatedSoLocation = total
    }
  },
  getters: {
    projects(state, getters) {
      const value2Label = getters.statusValue2Label
      return state.data.map(item => {
        item.status = value2Label[item.status]
        return item
      })
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
    vgItemIdsInProject(state) {
      return state.one.vgIds
    },
    vgItemsInProject(state, getters) {
      return getters.vgItems.filter(vg => state.one.vgIds.some(id => vg.id === id))
    },
    vgItemsNotInProject(state, getters) {
      return getters.vgItemsFree
    },
    totalFloor(state) {
      return state.one.floor
    },
    totalVgLocation(state) {
      return state.one.vgLocation.length
    },
    totalVgLocationPreFloor(state) {
      return Math.max(
        ...state.one.vgLocation.map(location =>
          Number(location.number.split('-').pop())
        ),
        0
      )
    },
    vgLocationCurrFloor(state) {
      return state.one.vgLocation.filter(
        location =>
          parseInt(location.number.split('-')[1]) === state.currentVgFloor
      )
    },
    vgManagementValueOfCurrFloor(state) {
      return state.one.vgManagement[state.currentVgFloor - 1]
    },
    soManagementValue(state) {
      return state.one.soManagement
    },
    totalSoLocation(state) {
      return state.one.soLocation.length
    },
    totalEstimatedSoLocation(state) {
      return state.createData.totalEstimatedSoLocation
    },
    soLocation(state) {
      return state.one.soLocation
    },
    totalVgPreFloor(state) {
      return state.createData.totalVgPreFloor
    },
    defaultDepth(state) {
      return state.createData.defaultDepth
    },
    vgMeasuredDataRange(state) {
      return {
        end: new Date(state.one.dataRangeVg.end),
        start: new Date(state.one.dataRangeVg.start)
      }
    },
    statusValue2Label() {
      return {
        end: '結案',
        'in-progress': '執行'
      }
    },
    statusOptions() {
      return [
        {
          value: 'end',
          label: '結案'
        },
        {
          value: 'in-progress',
          label: '執行'
        }
      ]
    }
  },
  actions
}
