<template>
  <div class="vgList">
    <h1>軸力計</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteVGs">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-input v-model="newVG.number" placeholder="新增軸力計"></el-input>
        <el-button type="primary" @click="createVG">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
    :data="vgList"
    class="vgList-table"
    @selection-change="updateDeleteList">
    <el-table-column
      type="selection"
      :selectable="checkable"
      width="55">
    </el-table-column>
    <el-table-column
      prop="number"
      label="編號"
      width="200">
      <template slot-scope="scope">
        <el-input 
        @keyup.native="editVG(scope.row.id,scope.row.number)"
        v-model="scope.row.number">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="projectName"
      label="所在專案"
      width="240">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  number: 'VGList',

  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      newVG: {
        number: ''
      }
    }
  },
  computed: {
    vgList() {
      return this.$store.getters.vgs
    }
  },
  methods: {
    reset() {
      this.$store.dispatch('getVGs').then(() => {
        this.newVG = {
          number: ''
        }
      })
    },
    createVG() {
      if (!this.newVG.number) alert("Enter the vg's name PLZ")
      this.$store.dispatch('createVG', this.newVG).then(() => {
        this.reset()
      })
    },
    deleteVGs() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteVGs', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(vg => vg.id)
    },
    checkable(row) {
      return !row.projectName
    },
    editVG(id, newNumber) {
      this.$store
        .dispatch('updateVG', {
          vgId: id,
          payload: { number: newNumber }
        })
        .then(() => {
          this.reset()
        })
    }
  }
}
</script>
