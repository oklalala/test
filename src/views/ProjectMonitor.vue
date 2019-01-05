<template>
  <div class="projectMonitor">
    <h1>查看監控資料</h1>
    <h3>基本資料</h3>
    案號：{{test1}}
    名稱：{{test2}}
    <h3>配置圖</h3>
    <!-- <toggle>顯示/隱藏</toggle> -->
    <h3>監控值</h3>
    <el-tabs type="border-card">
      <el-tab-pane label="軸力計 ( VG )"> 
        <div class="block">
          <span class="demonstration">請選擇支撐階數</span>
          <el-pagination
            layout="prev, pager, next"
            :total="30">
          </el-pagination>
        </div>
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="日期">
                <el-select v-model="test1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="位置">
                <el-select v-model="test2" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="傾度管 ( SO )">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="日期">
                <el-select v-model="test1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="位置">
                <el-select v-model="test2" placeholder="请选择" label="位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'UserList',

  mixins: [ToPathMixin],
  data() {
    return {
      // deleteList: [],
      test1: "haha",
      test2: "hehe"
    }
  },
  computed: {
    // userList() {
    //   return this.$store.getters.users
    // }
  },
  methods: {
    // deleteUsers() {
    //   if (this.deleteList.length === 0) return
    //   this.$store.dispatch('deleteUsers', this.deleteList)
    // },
    // updateDeleteList(value) {
    //   this.deleteList = value.map(user => user.id)
    // }
  }
}
</script>
