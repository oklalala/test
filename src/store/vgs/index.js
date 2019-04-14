/** @format */

import actions from './actions'
export default {
  actions,
  state: {
    data: []
  },
  mutations: {
    vgItems(state, vgs) {
      state.data = vgs
    }
  },
  getters: {
    vgItems(state) {
      return state.data
    },
    vgItemsFree(state) {
      return state.data.filter(
        vg =>
          vg.projectName === null ||
          vg.projectName === '使用的專案被刪除' ||
          vg.projectName === '專案均結案'
      )
    }
  }
}
