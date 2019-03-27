/** @format */
import actions from './actions'

export default {
  state: {
    vgMeasuredData: [],
    soMeasuredData: []
  },
  mutations: {
    vgMeasuredData(state, data) {
      state.vgMeasuredData = data
    },
    soMeasuredData(state, data) {
      state.soMeasuredData = data
    }
  },
  getters: {
    dateOfSoMeasuredData(state) {
      return state.soMeasuredData.map(item => item.date)
    },
    soMeasuredData(state) {
      return state.soMeasuredData
    },
    vgMeasuredData(state) {
      return state.vgMeasuredData
    }
  },
  actions
}
