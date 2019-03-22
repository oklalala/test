<template>
  <div class="vgList">
    <h1>軸力計</h1>
    <el-row class="operationGroup" type='flex' justify="between">
      <el-col class="operationGroup-left" :sm='4'>
        <el-button type="primary" @click="deleteVGs" v-if="!!deleteList.length">刪除</el-button>
      </el-col>
      <el-col class="operationGroup-right" :span='24' :sm='8'>
        <el-input v-model="newVG.number" placeholder="新增軸力計"></el-input>
        <el-button class='addButton' type="primary" @click="createVG" v-if="!!newVG.number">
          <i class="el-icon-plus"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-table
    :data="vgList"
    class="vgList-table"
    @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        :selectable="checkable"
        width="40">
      </el-table-column>
      <el-table-column
        prop="number"
        label="編號"
        width="150">
        <template slot-scope="scope">
          <el-input 
          @blur="editVG(scope.row.id,scope.row.number)"
          v-model="scope.row.number">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="所在專案">
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
      return JSON.parse(JSON.stringify(this.$store.getters.vgs))
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
      this.$store
        .dispatch('createVG', this.newVG)
        .then(() => {
          this.reset()
          this.$message({
            message: `成功新增 ${this.newVG.number}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    deleteVGs() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteVGs', this.deleteList)
        .then(() => {
          this.$message({
            message: `軸力計 ${this.deleteList} 已刪除`,
            type: 'success',
            showClose: true,
            center: true,
            duration: 1200
          })
        })
        .catch(() => {
          this.$message({
            message: `已被專案使用`,
            type: 'error',
            showClose: true,
            center: true,
            duration: 1200
          })
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(vg => vg.id)
    },
    checkable(row) {
      return !row.projectName
    },
    editVG(id, newNumber) {
      if (
        newNumber ===
        this.$store.getters.vgs.filter(vg => vg.id == id)[0].number
      )
        return
      this.$store
        .dispatch('updateVG', {
          vgId: id,
          payload: { number: newNumber }
        })
        .then(() => {
          this.reset()
          this.$message({
            message: `成功編輯 ${newNumber}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    }
  }
}
</script>

<style>
.addButton {
  position: absolute;
  right: 0;
}
</style>
