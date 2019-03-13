<template>
  <div class="projectSetting">
    <h1>專案設定</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteProjects" v-show="!!deleteList.length">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary" @click="toPath('ProjectCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
      :data="projectList"
      class="projectList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        label="案號"
        width="130">
        <template slot-scope="scope">
          <h4 
            class="clickable"
            @click="toPath('ProjectEdit', { projectId: scope.row.id })">
            {{ scope.row.number }}
          </h4>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        :filters="statusFilter"
        :filter-method="statusFilter">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'end' ? 'success' : 'warning'" disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'ProjectSetting',
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      statusFilter: [
        { text: '結案', value: 'end' },
        { text: '執行', value: 'in-progress' }
      ]
    }
  },
  computed: {
    projectList() {
      return this.$store.getters.projects
    }
  },
  methods: {
    deleteProjects() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteProjects', this.deleteList)
        .then(() => {
          this.$message({
            message: `成功刪除 ${this.deleteList}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(project => project.id)
    },
    statusFilter(value, row) {
      return row.status === value
    }
  }
}
</script>
