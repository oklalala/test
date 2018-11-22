<template>
  <div class="userList">
    <el-table
      :data="userList"
      class="userList-table">
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
        label="角色"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',

  data() {
    return {}
  },
  computed: {
    userList() {
      console.log(this.$store.getters.users)
      return this.$store.getters.users
    }
  }
}
</script>

<style lang="scss">
</style>
