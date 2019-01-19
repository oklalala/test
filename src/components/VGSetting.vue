<template>
  <el-row :gutter="20">
    <el-col :span="9">
      <h2>管理值<span>單位：噸</span></h2>
      注意值
      <el-input v-model="vgManagement.notice"
        placeholder="68.3">
      </el-input>
      警戒值
      <el-input v-model="vgManagement.warning"
        placeholder="79.6">
      </el-input>
      行動值
      <el-input v-model="vgManagement.action"
        placeholder="104.2">
      </el-input>
    </el-col>
    <el-col :span="13" :offset="2">
      <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
      <el-button
        @click="toPath('SteelList')">
        維護鋼材資料
      </el-button>
      <el-table
        class="vg-table"
        @selection-change="updateDeleteList">
        <el-table-column
          label="VG ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="id"
          label="Port"
          width="100">
          <template slot-scope="scope">
            <span class="clickable"
              @click="toPath('EditSteel', { steelId: scope.row.id })">
              {{ scope.row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="編碼"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="鋼材"
          width="100">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
// import ToPathMixin from '@/mixins/ToPath'
// import RoleIsMixin from '@/mixins/RoleIs'
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // floor: 0,
      // numOfFloor: 0
    }
  }
}
</script>
