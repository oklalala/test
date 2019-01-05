<template>
  <div class="projectList">
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="6">
      <h1>專案列表</h1>
      </el-col>
      <el-col :span="6">
        <span>專案狀態</span>
        <!-- <el-select placeholder="请选择">
          <el-option>end</el-option>
          <el-option>in-progress</el-option>
        </el-select> -->
        <!-- <el-form-item label="專案狀態">
          <el-select
            placeholder="1,4"
            style="width: 100%">
            <el-option>end</el-option>
            <el-option>in-progress</el-option>
          </el-select>
        </el-form-item> -->
      </el-col>
    </el-row>
    
    <el-table
      :data="projectList"
      class="projectList-table">
      <el-table-column
        fixed
        prop="id"
        label="案號"
        width="320">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名稱"
        width="320">
      </el-table-column>
      <el-table-column
        label="監控資料"
        width="180">
        <template slot-scope="scope">
          <el-button @click="toPath('ProjectMonitor')">監控資料</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="傾度管量測"
        width="180">
        <template slot-scope="scope">
          <el-button @click="toPath('SOItem', { projectId: scope.row.id })">傾度管資料</el-button>
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
    }
  }
}
</script>
