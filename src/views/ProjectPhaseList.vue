<template>
  <el-row class="projectSetting" type='flex' justify='center'>
    <el-col :span='22' :sm='18' :md='14'>
      <h1>專案執行階段</h1>
      <div class="operationGroup">
        <div class="operationGroup-left">
          <el-button 
            type="primary" 
            @click="deleteProjectPhase" 
            v-if='!!deleteList.length'>刪除</el-button>
        </div>
        <div class="operationGroup-right">
          <el-form
            label-position="left"
            label-width="90px"
            :model="newProjectPhase">
            <el-form-item label="新增專案：">
              <el-input v-model="newProjectPhase.name"
                placeholder="第二次開挖">
              </el-input>
            </el-form-item>
            <el-button type="primary" @click="createProjectPhase" v-if="!!newProjectPhase.name">
              <i class="el-icon-plus"></i>
            </el-button>
          </el-form>
        </div>
      </div>
      <el-table
        :data="projectPhaseList"
        class="projectPhaseList-table"
        @selection-change="updateDeleteList">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="序號"
          width="170">
          <template slot-scope="scope">
            <span class="clickable"
              @click="toPath('ProjectPhaseEdit', { soId: scope.row.id })">
              {{ scope.row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="專案階段">
          <template slot-scope="scope">
            <el-input 
              @keyup.native="editProjectPhase(scope.row.id,scope.row.name)"
              v-model="scope.row.name">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'projectPhaseList',

  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      newProjectPhase: {
        name: ''
      }
    }
  },
  computed: {
    projectPhaseList() {
      return this.$store.getters.projectPhases
    }
  },
  methods: {
    createProjectPhase() {
      this.$store
        .dispatch('createProjectPhase', this.newProjectPhase)
        .then(() => {
          this.reset()
        })
    },
    reset() {
      this.newProjectPhase = {
        name: ''
      }
    },
    deleteProjectPhase() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteProjectPhase', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(projectPhase => projectPhase.id)
    },
    editProjectPhase(id, newName) {
      this.$store
        .dispatch('updateProjectPhase', {
          projectPhaseId: id,
          payload: { name: newName }
        })
        .then(() => {
          this.reset()
        })
    }
  }
}
</script>
