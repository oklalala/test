import actions from './actions.js'

export default {
  actions,
  state: {
    permissions: {},
    rolePermissions: [
      {
        permissions: [
          {
            name: '',
            value: ''
          }
        ],
        role: ''
      }
    ],
    roles: [],
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setRolePermissions(state, rolePermissions) {
      state.rolePermissions = rolePermissions
    },
    updateRolePermissions(state, { value, role, permissionIndex }) {
      state.rolePermissions = state.rolePermissions.map(item => {
        if (item.role === role) {
          item.permissions[permissionIndex].value = value
        }
        return item
      })
    },
    setRoles(state, roles) {
      state.roles = roles
    },
  },
  getters: {
    permissions(state) {
      return state.permissions
    },
    rolePermissions(state) {
      return state.rolePermissions
    },
    roles(state) {
      return state.roles
    },
  }
}
