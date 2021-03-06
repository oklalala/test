<!-- @format -->

<template>
  <div class="projectPhases">
    <h1>專案執行階段</h1>
    <el-row class="operationGroup" type="flex" justify="between">
      <el-col class="operationGroup-left" :span="4">
        <el-button
          type="danger"
          @click="deleteProjectPhases"
          v-if="!!deletePhasesId.length"
          >刪除</el-button
        >
      </el-col>
      <el-col class="operationGroup-right" :xs="18" :sm="8">
        <el-input v-model="newProjectPhaseName" placeholder="新增專案階段">
          <el-button
            slot="append"
            @click="sendNewProjectPhase"
            :disabled="!newProjectPhaseName"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="projectPhases"
      class="projectPhases-table"
      @selection-change="updateDeleteList"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="name" label="專案階段">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            @focus="beforeEdit(scope.row.id, scope.row.name)"
            @blur="afterEdit(scope.row.id, scope.row.name)"
          >
          </el-input>
        </template>
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
      oldPhase: {
        id: '',
        name: ''
      },
      deletePhasesId: [],
      newProjectPhaseName: ''
    }
  },
  computed: {
    projectPhases() {
      return this.$store.getters.projectPhases
    }
  },
  methods: {
    async sendNewProjectPhase() {
      try {
        await this.$store.dispatch('createProjectPhase', {
          name: this.newProjectPhaseName
        })
        this.$message({
          message: `成功新增 ${this.newProjectPhaseName}`,
          type: 'success',
          center: true,
          duration: 1800
        })
        this.newProjectPhaseName = ''
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    },
    async deleteProjectPhases() {
      if (this.deletePhasesId.length === 0) return

      try {
        await this.$confirm('確定要刪除？', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        return
      }

      try {
        await this.$store.dispatch('deleteProjectPhases', this.deletePhasesId)
        this.$message({
          message: `成功刪除`,
          type: 'success',
          center: true,
          duration: 1800
        })
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    },
    updateDeleteList(value) {
      this.deletePhasesId = value.map(projectPhase => projectPhase.id)
    },
    beforeEdit(id, name) {
      this.oldPhase = {
        id,
        name
      }
    },
    async afterEdit(id, newName) {
      if (newName === this.oldPhase.name) return // not change
      try {
        await this.$store.dispatch('updateProjectPhase', {
          id,
          payload: {
            name: newName
          }
        })
        this.$message({
          message: `成功編輯 ${this.oldPhase.name} → ${newName}`,
          type: 'success',
          center: true,
          duration: 1800
        })
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    }
  }
}
</script>
