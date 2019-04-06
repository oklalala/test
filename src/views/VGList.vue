<!-- @format -->

<template>
  <div class="vgItems">
    <h1>軸力計</h1>
    <el-row class="operationGroup" type="flex" justify="between">
      <el-col class="operationGroup-left" :span="4">
        <el-button
          type="danger"
          @click="deleteVGItems"
          v-if="!!deleteVGItemsId.length"
          >刪除</el-button
        >
      </el-col>
      <el-col class="operationGroup-right" :span="8">
        <el-input v-model="newVGItemNumber" placeholder="新增軸力計">
          <el-button
            :disabled="!newVGItemNumber"
            slot="append"
            @click="sendNewVGItem"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="vgItems"
      class="vgItems-table"
      @selection-change="updateDeleteList"
    >
      <el-table-column type="selection" :selectable="deleteable" width="40">
      </el-table-column>
      <el-table-column prop="number" label="編號" min-width="150">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.number"
            @focus="beforeEdit(scope.row.id, scope.row.number)"
            @blur="afterEdit(scope.row.id, scope.row.number)"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" label="服務專案" width="150">
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
      oldVG: {
        id: '',
        number: ''
      },
      deleteVGItemsId: [],
      newVGItemNumber: ''
    }
  },
  computed: {
    vgItems() {
      return this.$store.getters.vgs
    }
  },
  methods: {
    // reset() {
    //   this.$store.dispatch('fetchVGs').then(() => {
    //     this.newVGItemNumber = {
    //       number: ''
    //     }
    //   })
    // },
    async sendNewVGItem() {
      await this.$store.dispatch('createVG', {
        number: this.newVGItemNumber
      })
      this.$message({
        message: `成功新增 ${this.newVGItemNumber}`,
        type: 'success',
        center: true,
        duration: 1800
      })
      this.newVGItemNumber = ''
    },
    deleteVGItems() {
      if (this.deleteVGItemsId.length === 0) return
      this.$store
        .dispatch('deleteVGs', this.deleteVGItemsId)
        .then(() => {
          this.$message({
            message: `軸力計 ${this.deleteVGItemsId} 已刪除`,
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
      this.deleteVGItemsId = value.map(vg => vg.id)
    },
    deleteable(row) {
      return !row.projectName
    },
    beforeEdit(id, number) {
      this.oldVG = {
        id,
        number
      }
    },
    afterEdit(id, newNumber) {
      if (newNumber === this.oldVG.number) return // not change
      this.$store
        .dispatch('updateVG', {
          vgId: id,
          payload: {
            number: newNumber
          }
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.oldVG.number} → ${newNumber}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    },
    editVG(id, newNumber) {
      if (
        newNumber ===
        this.$store.getters.vgs.filter(vg => vg.id == id).shift().number
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
