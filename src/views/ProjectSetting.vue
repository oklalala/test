<template>
  <div class="projectSetting">
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="6">
      <h1>專案設定</h1>
      </el-col>
      <el-col :span="6">
        <span>專案狀態</span>
        <el-select placeholder="请选择">
          <el-option>end</el-option>
          <el-option>in-progress</el-option>
        </el-select>
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
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteProjects">刪除</el-button>
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="案號"
        width="320">
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
        width="460">
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
    }
  }
}
</script>
