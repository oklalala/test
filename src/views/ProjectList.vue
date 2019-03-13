<template>
  <div class="projectList">
    <h1>專案列表</h1>
    <el-select class='status-filter' v-model="status" multiple placeholder="請篩選" v-if="isShow('project:filter')">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.text"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      :data="filteredProject"
      height="550px"
      class="projectList-table">
      <el-table-column
        fixed
        prop="number"
        label="案號"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱"
        width="160">
      </el-table-column>
      <el-table-column
        label="監控資料"
        width="120">
        <template slot-scope="scope">
          <el-button @click="toPath('ProjectMonitor', { projectId: scope.row.id })">監控資料</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="傾度管量測"
        width="130"
        v-if="isShow('project:soItemMeasure')">
        <template slot-scope="scope">
          <el-button @click="toPath('MeasuresSo', { projectId: scope.row.id })">傾度管資料</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        width="100"
        v-if="isShow('project:filter')">
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
  name: 'ProjectList',
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      options: [
        { text: '結案', value: 'end' },
        { text: '執行', value: 'in-progress' }
      ],
      status: ['in-progress']
    }
  },
  computed: {
    projectList() {
      return this.$store.getters.projects
    },
    filteredProject() {
      return this.projectList.filter(item => {
        if (this.status.length === 0) {
          return false
        } else if (this.status.length === 1) {
          return item.status === this.status[0]
        } else if (this.status.length === 2) {
          return item //do nothing
        }
      })
    }
  },
  methods: {
    deleteProjects() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteProjects', this.deleteList)
        .then(() => {
          this.$message({
            message: `專案 ${this.deleteList} 已刪除`,
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
      this.deleteList = value.map(project => project.id)
    },
    statusFilter(value, row) {
      return row.status === value
    },
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    }
  }
}
</script>

<style>
.el-table::before {
  height: 0;
}

.status-filter {
  float: right;
}
</style>
