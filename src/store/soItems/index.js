/** @format */
import actions from './actions'

export default {
  state: {
    data: [],
    one: {}
  },
  mutations: {
    soItems(state, items) {
      state.data = items
    },
    soItem(state, item) {
      state.one = item
    },
    soItemParameter(state, { key, value }) {
      state.one.parameters[key] = value
    },
    soItemParameters(state, parameters) {
      state.one.parameters = parameters
    },
    soItemNumber(state, number) {
      state.one.number = number
    },
    soModelOfItem(state, model) {
      state.one.soModel = {
        id: model.id,
        name: model.name
      }
    }
  },
  getters: {
    soItems(state) {
      return state.data
    },
    soItem(state) {
      return state.one
    },
    soItemParameters(state) {
      const parameters = []
      for (let name in state.one.parameters) {
        parameters.push({
          key: name,
          value: state.one.parameters[name]
        })
      }
      return parameters
    }
  },
  actions
}
