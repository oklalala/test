<!-- @format -->

<template>
  <div class="permission-setup">
    <h1>權限設定</h1>
    <el-table :data="rolePermissions">
      <el-table-column prop="role" label="角色" width="140"> </el-table-column>
      <el-table-column prop="permissions" label="權限">
        <template slot-scope="scope">
          <div v-for="item in scope.row.permissions" :key="item.name">
            <el-checkbox
              :disabled="item.name === 'account:CRUD'"
              v-if="item.name !== 'account:updateSelf'"
              @change="
                changeRolePermissions(item.value, item.name, scope.row.role)
              "
              :value="item.value"
            >
              {{ AllPermissions[item.name] }}
            </el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-container">
      <el-button type="primary" @click="submit">
        確認送出
      </el-button>
    </div>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'PermissionSetup',
  mixins: [ToPathMixin],
  data() {
    return {}
  },
  computed: {
    AllPermissions() {
      return this.$store.getters.permissions
    },
    rolePermissions() {
      return this.$store.getters.rolePermissions
    }
  },
  methods: {
    changeRolePermissions(permissionValue, permissionName, role) {
      permissionValue = !permissionValue
      this.$store.commit('toggleRolePermissionValue', {
        role,
        permissionName,
        permissionValue
      })
    },
    async submit() {
      try {
        await this.$store.dispatch('updateRolePermissions')
        this.$message({ message: '權限設定成功 請重新登入', type: 'success' })
      } catch (e) {
        this.$message.error(e, '權限設定失敗')
      }
    }
  }
}
</script>
