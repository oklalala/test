<!-- @format -->

<template>
  <div class="userList">
    <h1>帳號列表</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="danger" @click="deleteUsers" v-if="!!deleteList.length"
          >刪除</el-button
        >
      </div>
      <div class="operationGroup-right">
        <el-button type="info" plain @click="toPath('UserCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table :data="userList" @selection-change="updateDeleteList">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="auto"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            @click="toPath('UserEdit', { userId: scope.row.id })"
            type="text"
          >
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="company.name" label="公司" width="150">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="70">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'UserList',
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: []
    }
  },
  computed: {
    userList() {
      return this.$store.getters.users
    }
  },
  methods: {
    deleteUsers() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteUsers', this.deleteList)
        .then(() => {
          this.$message({
            message: `使用者 ${this.deleteList} 已刪除`,
            type: 'success',
            showClose: true,
            center: true,
            duration: 1200
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(user => user.id)
    }
  }
}
</script>
