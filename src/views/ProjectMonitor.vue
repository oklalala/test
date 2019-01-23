<template>
  <div class="projectMonitor">
    <h1>查看監控資料</h1>
    <h3>基本資料</h3>
    案號：{{project.number}}
    <br>
    <br>
    名稱：{{project.name}}
    <h3>配置圖</h3>
    <!-- <toggle>顯示/隱藏</toggle> -->
    <h3>監控值</h3>
    <el-tabs type="border-card">
      <el-tab-pane label="軸力計 ( VG )"> 
        <div class="block">
          <span class="demonstration">請選擇支撐階數</span>
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentFloor"
            :total="project.floor * 10">
          </el-pagination>
        </div>
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="日期">
                <el-select v-model="date1" placeholder="请选择">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="位置">
                <el-select v-model="selectedVG" placeholder="请选择">
                  <el-option
                    v-for="vg in subVGLocation"
                    :key="vg.number"
                    :label="vg.number"
                    :value="vg.number">
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
                <el-select v-model="date2" placeholder="请选择">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="位置">
                <el-select v-model="selectedSO" placeholder="请选择" label="位置">
                  <el-option
                    v-for="soItem in project.soLocation"
                    :key="soItem.number"
                    :label="soItem.number"
                    :value="soItem.number">
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
  created() {
    if (this.$route.params.projectId) {
      this.loadProject(this.$route.params.projectId)
      .then(() => {
        this.setVGTable(0)
      })
    }
  },
  data() {
    return {
      // deleteList: [],
      project: {
        // OPT: [],
        // USER: [],
        // address: '',
        // companyId: '',
        // floor: 0,
        // name: '',
        // number: '',
        // sitePlan: '',
        // soLocation: [],
        // soManagement: {},
        // status: '',
        // vgIds: [],
        // vgLocation: [],
        // vgManagement: [],
      },
      date1: 'haha',
      date2: 'hehe',
      selectedVG: '',
      selectedSO: '',
      subVGLocation: [],
      floorIndex: 1
    }
  },
  computed: {
    // userList() {
    //   return this.$store.getters.users
    // }
  },
  methods: {
    loadProject(projectId) {
      return this.$store.dispatch('getProject', projectId).then(res => {
        this.project = res.data.data
      })
    },
    currentFloor(selectedFloor) {
      this.floorIndex = selectedFloor - 1
      this.setVGTable(this.floorIndex)
    },
    setVGTable(floorIndex) {
      var numOfFloor = this.project.vgLocation.length / this.project.floor
      var start = floorIndex * numOfFloor
      var end = (floorIndex + 1) * numOfFloor
      this.subVGLocation = this.project.vgLocation.slice(start, end)
    }
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
