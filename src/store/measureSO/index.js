/** @format */
import actions from './actions'

export default {
  state: {
    tempFormulaParameter: [
      37.7705,
      137.7711,
      161.2568,
      131.165,
      54.3038,
      9.3219
    ]
  },
  getters: {
    getSO_C: state => {
      return state.SO_C
    },
    getTempFormulaParameter: state => {
      return state.tempFormulaParameter
    }
  },
  mutations: {
    setSO_C: (state, SO_C) => {
      state.SO_C = SO_C
    },
    setTempFormulaParameter: (state, tempFormulaParameter) => {
      state.tempFormulaParameter = tempFormulaParameter
    }
  },
  actions
}
