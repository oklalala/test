<template>
  <div class="projectPhaseList">
    <h1>專案執行階段</h1>
    <el-row class="operationGroup" type='flex' justify="between">
      <el-col class="operationGroup-left" :sm='4'>
        <el-button type="primary" @click="deleteProjectPhases" v-if="!!deleteList.length">刪除</el-button>
      </el-col>
      <el-col class="operationGroup-right" :span='24' :sm='8'>
        <el-input v-model="newProjectPhase.name" placeholder="新增專案階段"></el-input>
        <el-button class='addButton' type="primary" @click="createProjectPhase" v-if="!!newProjectPhase.name">
          <i class="el-icon-plus"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="projectPhaseList"
      class="projectPhaseList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="name"
        label="專案階段">
        <template slot-scope="scope">
          <el-input 
            @blur="editProjectPhase(scope.row.id,scope.row.name)"
            v-model="scope.row.name">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
      this.$store.dispatch('getProjectPhases').then(() => {
        this.newProjectPhase = {
          number: ''
        }
      })
    },
    deleteProjectPhases() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteProjectPhases', this.deleteList)
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
