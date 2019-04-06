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
      <el-col class="operationGroup-right" :span="8">
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
      await this.$store.dispatch('createProjectPhase', {
        name: this.newProjectPhaseName
      })
      this.$message({
        message: `成功新增 ${this.newVGItemNumber}`,
        type: 'success',
        center: true,
        duration: 1800
      })
      this.newProjectPhaseName = ''
    },
    deleteProjectPhases() {
      if (this.deletePhasesId.length === 0) return
      this.$store
        .dispatch('deleteProjectPhases', this.deletePhasesId)
        .then(() => {
          this.$message({
            message: `成功刪除`,
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
      this.deletePhasesId = value.map(projectPhase => projectPhase.id)
    },
    beforeEdit(id, name) {
      this.oldPhase = {
        id,
        name
      }
    },
    afterEdit(id, newName) {
      if (newName === this.oldPhase.name) return // not change
      this.$store
        .dispatch('updateProjectPhase', {
          id,
          payload: {
            name: newName
          }
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.oldPhase.name} → ${newName}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    }
  }
}
</script>
