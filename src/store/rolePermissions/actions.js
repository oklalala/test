/** @format */

import API from '@/utils/API'

export default {
  async fetchPermissions({ commit }) {
    const res = await API.GET('/permissions')
    commit('setPermissions', res.data)
  },
  async fetchrolePermissions({ commit }) {
    const res = await API.GET('/role/permissions')
    commit('setRolePermissions', res.data)
  },
  async updateRolePermissions({ state, dispatch }) {
    await API.PUT('/role/permissions', state.rolePermissions)
    return await dispatch('fetchrolePermissions')
  },
  async getRoles({ commit }) {
    const res = await API.GET('/roles')
    commit('setRoles', res.data)
  }
}
