<template>
  <div class="projectSetting">
    <h1>專案設定</h1>
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="6">
        <el-button type="primary" @click="deleteProjects" v-show="!!deleteList.length">刪除</el-button>
      </el-col>
      <el-col :offset="10">
        <el-button type="primary" @click="toPath('ProjectCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="projectList"
      class="projectList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="30">
      </el-table-column>
      <el-table-column
        prop="id"
        label="案號"
        width="200">
        <template slot-scope="scope">
          <span class="clickable"
            @click="toPath('ProjectEdit', { projectId: scope.row.id })">
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        width="100"
        :filters="[{ text: '結案', value: 'end' }, { text: '執行', value: 'in-progress' }]"
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
      return row.status === value;
    }
  }
}
</script>
