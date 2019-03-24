<!-- @format -->

<template>
  <div class="permission-setup">
    <h1>權限設定</h1>
    <el-table :data="rolePermissions">
      <el-table-column prop="role" label="角色" width="140"> </el-table-column>
      <el-table-column prop="permissions" label="權限">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.permissions" :key="index">
            <el-checkbox
              v-if="item.name !== 'account:updateSelf'"
              @change="updateRolePermissions(item.value, scope.row.role, index)"
              :value="item.value"
            >
              {{ permissions[item.name] }}
            </el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-container">
      <el-button type="primary" @click="submit">
        確認送出
      </el-button>
      <el-button type="primary" @click="toPath('ProjectList')">
        取消修改
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
    permissions() {
      return this.$store.getters.permissions
    },
    rolePermissions() {
      return this.$store.getters.rolePermissions
    }
  },
  methods: {
    updateRolePermissions(value, role, permissionIndex) {
      value = !value
      this.$store.commit('updateRolePermissions', {
        role,
        permissionIndex,
        value
      })
    },
    submit() {
      this.$store
        .dispatch('updateRolePermissions')
        .then(() => {
          this.$message({ message: '權限設定成功 請重新登入', type: 'success' })
          this.toPath('ProjectList')
        })
        .catch(e => {
          this.$message.error(e, '權限設定失敗')
        })
    }
  }
}
</script>
