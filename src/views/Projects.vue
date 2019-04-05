<!-- @format -->

<template>
  <div class="projects">
    <!-- <h1>專案列表</h1>
    <el-select
      class="status-filter"
      v-model="status"
      multiple
      placeholder="請篩選"
      v-if="isShow('project:filter')"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.text"
        :value="item.value"
      >
      </el-option>
    </el-select> -->
    <el-table :data="projects" class="projects-table">
      <el-table-column fixed prop="number" label="案號" width="150">
      </el-table-column>
      <el-table-column prop="name" label="名稱" min-width="200"> </el-table-column>
      <el-table-column width="180">
        <template slot-scope="scope">
          <el-button
            @click="toPath('ProjectMonitor', { projectId: scope.row.id })"
            >進入檢視量測資料</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        width="130"
        v-if="isShow('project:soItemMeasure')"
      >
        <template slot-scope="scope">
          <el-button @click="to(scope.row.id)">傾度管操作</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="專案狀態"
        width="100"
        v-if="isShow('project:filter')"
        :filters="statusOptions" :filter-method="statusFilter"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'ProjectList',
  mixins: [ToPathMixin],
  computed: {
    projects() {
      return this.$store.getters.projects
    },
    statusOptions() {
      return this.$store.getters.statusOptions.map(item => ({
        text: item.label,
        value: item.label
      }))
    },
    filteredProjects() {
      return this.projects.filter(item => {
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
    statusFilter(value, row) {
      return row.status === value
    },
    to(id) {
      window.location = `http://${window.location.host}/measures/so/${id}`
    },
    isShow(feature) {
      return (
        !!this.$store.getters.myPermissions &&
        this.$store.getters.myPermissions.includes(feature)
      )
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
