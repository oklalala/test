<template>
  <div class="vgList">
    <h1>軸力計</h1>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteVGs">刪除</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary">
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
      width="120">
    </el-table-column>
    <el-table-column
      prop="projectName"
      label="所在專案"
      width="180">
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
      this.$store.dispatch('deleteVGs', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(vg => vg.id)
    },
    checkable(row, index) {
      return !row.projectName
    }
  }
}
</script>

