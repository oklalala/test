/** @format */
import actions from './actions'

export default {
  actions,
  state: {
    data: [],
    one: {}
  },
  mutations: {
    steels(state, steels) {
      state.data = steels
    },
    steel(state, steel) {
      state.one = steel
    },
    steelName(state, name) {
      state.one.name = name
    },
    steelSectionArea(state, sectionArea) {
      state.one.sectionArea = sectionArea
    },
    steelEs(state, es) {
      state.one.es = es
    },
    steelTcm(state, tcm) {
      state.one.tcm = tcm
    },
    steelTcg(state, tcg) {
      state.one.tcg = tcg
    }
  },
  getters: {
    steels(state) {
      return state.data
    },
    steel(state) {
      return state.one
    }
  }
}
