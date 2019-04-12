<!-- @format -->

<template>
  <div class="projectsSetting">
    <h1>專案資料</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button
          type="danger"
          @click="deleteProjects"
          v-show="!!deleteProjectsId.length"
          >刪除</el-button
        >
      </div>
      <div class="operationGroup-right">
        <el-button type="info" plain @click="toPath('ProjectCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
      :data="projects"
      class="projects-table"
      @selection-change="updateDeleteList"
    >
      <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column label="案號" width="150">
        <template slot-scope="scope">
          <el-button
            @click="toPath('ProjectEdit', { projectId: scope.row.id })"
            type="text"
            >{{ scope.row.number }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名稱" min-width="200">
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        width="100"
        :filters="statusOptions"
        :filter-method="statusFilter"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  mixins: [ToPathMixin],
  data() {
    return {
      deleteProjectsId: []
    }
  },
  computed: {
    projects() {
      return this.$store.getters.projects
    },
    statusOptions() {
      return this.$store.getters.statusOptions.map(item => ({
        text: item.label,
        value: item.label
      }))
    }
  },
  methods: {
    deleteProjects() {
      if (!this.deleteProjectsId.length) return

      this.$confirm('確定要刪除？', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('deleteProjects', this.deleteProjectsId)
            .then(() => {
              this.$message({
                message: `成功刪除`,
                type: 'success',
                center: true,
                duration: 1800
              })
            })
            .catch(e => {
              this.$message.error(`請重新檢查 ${e.message}`)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刪除'
          })
        })
    },
    updateDeleteList(value) {
      this.deleteProjectsId = value.map(project => project.id)
    },
    statusFilter(value, row) {
      return row.status === value
    }
  }
}
</script>
