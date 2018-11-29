<template>
  <div class="userList">
    <h1>帳號列表</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteUsers">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary" @click="toPath('CreateUser')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
      :data="userList"
      class="userList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="編號"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="帳號"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company.name"
        label="公司"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role.name"
        label="角色">
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
      this.$store.dispatch('deleteUsers', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(user => user.id)
    }
  }
}
</script>
