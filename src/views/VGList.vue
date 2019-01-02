<template>
  <div class="vgList">
    <h1>軸力計</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <el-table
    ref="multipleTable"
    :data="vgList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import ToPathMixin from '@/mixins/ToPath';
export default {
  name: 'VGList',

  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: []
    }
  },
  computed: {
    vgList() {
      return this.$store.getters.vgs
    }
  },
  methods: {
    deleteVGs() {
      if ( this.deleteList.length === 0 ) return
      this.$store.dis
    }

  }
}
</script>

