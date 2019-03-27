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
    vgMeasuredData(state) {
      return state.vgMeasuredData
    },
    dateOfSoMeasuredData(state) {
      return state.soMeasuredData.map(item => item.date)
    },
    soMeasuredData(state) {
      return state.soMeasuredData
    }
  },
  actions
}
