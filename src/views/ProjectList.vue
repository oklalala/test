<template>
  <div class="projectList">
    <h1>專案列表</h1>
    
    <el-table
      :data="projectList"
      class="projectList-table">
      <el-table-column
        fixed
        prop="id"
        label="案號"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱"
        width="160">
      </el-table-column>
      <el-table-column
        label="監控資料"
        width="120"
        v-if="isShow('project:export')">
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
          <!-- <el-button @click="toPath('MeasureSO', { projectId: scope.row.id })">傾度管資料</el-button> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        width="100"
        :filters="[{ text: '結案', value: 'end' }, { text: '執行', value: 'in-progress' }]"
        :filter-method="statusFilter"
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
      deleteList: []
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
      this.$store.dispatch('deleteProjects', this.deleteList)
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
</style>
