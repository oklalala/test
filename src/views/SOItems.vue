<template>
  <div class="soList">
    <h1>傾度管列表</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteSOItems">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary" @click="toPath('SOCreate')">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
      :data="soItems"
      class="soItems-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        label="編號"
        width="180">
        <template slot-scope="scope">
          <span class="clickable"
            @click="toPath('SOItemsEdit', { soId: scope.row.id })">
            {{ scope.row.number }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="soModelName"
        label="廠牌 型號"
        width="120">
      </el-table-column>
      <el-table-column
        prop="OPT"
        label="OPT"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'soItems',

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
      this.$store.dispatch('deleteSOItems', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(soItem => soItem.id)
    }
  }
}
</script>
