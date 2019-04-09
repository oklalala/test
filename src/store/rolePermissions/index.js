/** @format */

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
    roles: []
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setRolePermissions(state, rolePermissions) {
      // hard-code permissions
      // account:CRUD only ADMIN
      rolePermissions
        .filter(rolePermission => rolePermission.role === 'ADMIN')
        .forEach(item => {
          const accountOfNotAdmin = item.permissions
            .filter(permission => permission.name === 'account:CRUD')
            .shift()
          accountOfNotAdmin.value = true
        })

      rolePermissions
        .filter(rolePermission => rolePermission.role !== 'ADMIN')
        .forEach(item => {
          const accountOfNotAdmin = item.permissions
            .filter(permission => permission.name === 'account:CRUD')
            .shift()
          accountOfNotAdmin.value = false
        })

      // account:updateSelf for everybody
      rolePermissions.forEach(role =>
        role.permissions.forEach(permission => {
          if (permission.name === 'account:updateSelf') {
            permission.value = true
          }
        })
      )

      state.rolePermissions = rolePermissions
    },
    toggleRolePermissionValue(
      state,
      { role, permissionName, permissionValue }
    ) {
      const rolePermission = state.rolePermissions
        .filter(rolePermission => rolePermission.role === role)
        .shift()
      const permission = rolePermission.permissions
        .filter(permission => permission.name === permissionName)
        .shift()
      permission.value = permissionValue
    },
    setRoles(state, roles) {
      state.roles = roles
    }
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
    }
  }
}
