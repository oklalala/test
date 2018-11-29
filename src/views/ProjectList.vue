<template>
  <div class="projectList">
    <el-table
      :data="projectList"
      class="projectList-table">
      <el-table-column
        prop="id"
        label="案號"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',

  data() {
    return {}
  },
  computed: {
    projectList() {
      return []
    }
  }
}
</script>

<style lang="scss">
</style>
