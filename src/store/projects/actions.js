/** @format */

import API from '@/utils/API'

export default {
  newProject({ commit }) {
    const new_project = {
      number: '',
      status: 'in-progress',
      name: '',
      address: '',
      companyId: '',
      sitePlan: '',
      OPT: [],
      USER: [],
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
      vgIds: [],
      vgLocation: [],
      soLocation: [],
      dataRangeVg: {
        end: '',
        start: ''
      }
    }
    commit('setProject', new_project)
    commit('resetCreateData')
  },
  async getProject({ commit }, projectId) {
    const res = await API.GET(`/project/${projectId}`)
    commit('setProject', res.data)
  },
  updateCurrentProject({ commit }, payload) {
    commit('setProject', payload)
  },
  async createProject({ getters }) {
    const project = Object.assign({}, getters.project)
    project.OPT = project.OPT.map(opt => opt.id)
    project.USER = project.USER.map(user => user.id)
    project.vgLocation = project.vgLocation.map(location => ({
      number: location.number,
      steelId: location.steelId
    }))
    project.dataRangeVg = undefined
    return await API.POST(`/project`, project)
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
  uploadConfigImage({ commit }, file) {
    return API.uploadImg(file).then(res => {
      console.log(res)
      commit('updateConfigImage', res.url)
    })
  },
  configVgCode({ commit, getters }, { totalFloor, totalVgPreFloor }) {
    function vgEnCode(floor, serial) {
      serial = serial < 10 ? `0${serial}` : `${serial}`
      return `vg-${floor}-${serial}`
    }
    const locations = []
    const managements = []
    const vg_items_in_project = getters.vgItemsInProject

    let countPort = 0
    const default_steel = getters.steels.slice().shift()

    for (let indexFloor = 0; indexFloor < totalFloor; ++indexFloor) {
      for (
        let indexVgLocationPreFloor = 0;
        indexVgLocationPreFloor < totalVgPreFloor;
        ++indexVgLocationPreFloor
      ) {
        locations.push({
          number: vgEnCode(indexFloor + 1, indexVgLocationPreFloor + 1),
          steelId: default_steel.id,
          steelName: default_steel.name,
          vgId: vg_items_in_project[parseInt(countPort / 14)].id,
          vgNumber: vg_items_in_project[parseInt(countPort / 14)].number,
          port: (countPort % 14) + 1
        })
        countPort += 1
      }

      // 一層給一組
      managements.push({
        notice: 0,
        warning: 0,
        action: 0
      })
    }
    commit('project', { property: 'vgLocation', value: locations })
    commit('project', { property: 'vgManagement', value: managements })
  },
  configSoCode({ commit }, { depth, total_location }) {
    function soEncCode(serial) {
      serial = serial < 10 ? `0${serial}` : `${serial}`
      return `so-${serial}`
    }
    const locations = []
    for (
      let index_location = 0;
      index_location < total_location;
      ++index_location
    ) {
      locations.push({
        number: soEncCode(index_location + 1),
        depth
      })
    }
    commit('project', { property: 'soLocation', value: locations })
  }
}