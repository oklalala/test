/** @format */

import actions from './actions'
export default {
  actions,
  state: {
    data: []
  },
  mutations: {
    setVGs(state, vgs) {
      state.data = vgs
    }
  },
  getters: {
    vgs(state) {
      return state.data
    },
    vgsFree(state) {
      return state.data.filter(
        vg =>
          vg.projectName === '使用的專案被刪除' ||
          vg.projectName === '專案均結案'
      )
    }
  }
}
