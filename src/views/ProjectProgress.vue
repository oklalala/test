<template>
  <div class="soList">
    <h1>專案執行階段</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteSOItems">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary" @click="toPath('SOItemsCreate')">
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序號"
        width="180">
        <template slot-scope="scope">
          <span class="clickable"
            @click="toPath('SOItemsEdit', { soId: scope.row.id })">
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="company.name"
        label="專案階段"
        width="180">
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
