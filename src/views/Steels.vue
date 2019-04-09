<!-- @format -->

<template>
  <div class="steels">
    <h1>鋼材列表</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button
          type="danger"
          @click="deleteSteels"
          v-show="!!deleteList.length"
          >刪除</el-button
        >
      </div>
      <div class="operationGroup-right">
        <el-button type="info" plain @click="toPath('SteelCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table :data="steels" @selection-change="updateDeleteList">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="name" label="鋼材名稱" min-width="120">
        <template slot-scope="scope">
          <el-button
            @click="toPath('SteelEdit', { steelId: scope.row.id })"
            type="text"
          >
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sectionArea" label="截面積 (cm^2)" width="120">
      </el-table-column>
      <el-table-column prop="es" label="ES (kg/cm^2)" width="120">
      </el-table-column>
      <el-table-column prop="tcm" label="TCM" width="80"> </el-table-column>
      <el-table-column prop="tcg" label="TCG" width="80"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: []
    }
  },
  computed: {
    steels() {
      return this.$store.getters.steels
    }
  },
  methods: {
    deleteSteels() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteSteels', this.deleteList)
        .then(res => {
          console.log(res)
          this.$message({
            message: `成功刪除`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(steel => steel.id)
    }
  }
}
</script>
