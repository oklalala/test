<!-- @format -->

<template>
  <div class="soitems">
    <h1>傾度管列表</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button
          type="danger"
          @click="deleteSOItems"
          v-if="!!deleteList.length"
          >刪除</el-button
        >
      </div>
      <div class="operationGroup-right">
        <el-button type="info" plain @click="toPath('SOItemCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table :data="soItems" @selection-change="updateDeleteList">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="soModelName" label="廠牌型號" width="120">
      </el-table-column>
      <el-table-column label="傾度管編號" min-width="130">
        <template slot-scope="scope">
          <el-button
            @click="toPath('SOItemEdit', { soId: scope.row.id })"
            type="text"
          >
            {{ scope.row.number }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="OPT" label="OPT" width="120"> </el-table-column>
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
    soItems() {
      return this.$store.getters.soItems
    }
  },
  methods: {
    deleteSOItems() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteSOItems', this.deleteList)
        .then(() => {
          this.$message({
            message: `成功刪除`,
            type: 'success',
            showClose: true,
            center: true,
            duration: 1200
          })
        })
        .catch(() => {
          this.$message({ message: `已選定 OPT 不能刪除`, type: 'error' })
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(soItem => soItem.id)
    }
  }
}
</script>
