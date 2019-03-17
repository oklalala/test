<template>
  <div class="projectMonitor">
    <h1>查看監控資料</h1>
    <h3>基本資料</h3>
    案號：{{project.number}}
    <br>
    <br>
    名稱：{{project.name}}
    <h3>配置圖</h3>
    <h4 class='show-picture' @click='show = !show'>顯示/隱藏</h4>
    <img :src="showImage" v-if="show">
    <h3>監控值</h3>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="軸力計 ( VG )">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="14" :md="14">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="vgDate"
                  format='yyyy-MM-dd'
                  type="date"
                  placeholder="選擇日期"
                  :picker-options="disabledDate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="10" :md="10">
              <el-form-item label="支撐階數">
                <el-select v-model="selectedFloor" placeholder="請選擇">
                  <el-option
                    v-for="floor in floorList"
                    :key="floor"
                    :label="floor"
                    :value="floor">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <VGECharts
          :selectedDay='vgDate'
          :selectedFloor='selectedFloor'
          :vgChartData="vgChartData"
          :project='project'/>
        <el-button v-if="isShow('project:export')" @click='exportVG'>匯出資料</el-button>
      </el-tab-pane>

      <el-tab-pane label="傾度管 ( SO )">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="10" :md="10">
              <el-form-item label="位置">
                <el-select v-model="selectedSO" placeholder="請選擇位置">
                  <el-option
                    v-for="soItem in project.soLocation"
                    :key="soItem.number"
                    :label="soItem.number"
                    :value="soItem.number">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="14" :md="14">
              <el-form-item 
                v-if="!!selectedSO"
                label="日期">
                <el-select 
                  v-model="soDate" 
                  placeholder="請選擇日期">
                  <el-option
                    v-for="date in soDateList"
                    :key="date"
                    :label="date"
                    :value="date">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <SOECharts 
          v-if="!!selectedSO && !!soDate"
          :soChartData="soChartData"
          :project="project"/>
        <el-button v-if="isShow('project:export')" @click='exportSO'>匯出資料</el-button>
      </el-tab-pane>
    </el-tabs>
    <br>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import VGECharts from '../components/VGECharts'
import SOECharts from '../components/SOECharts'
import moment from 'moment'

export default {
  name: 'ProjectMonitor',
  components: { VGECharts, SOECharts },
  mixins: [ToPathMixin],
  created() {
    this.getVGData(this.vgDate, 1)
  },
  data() {
    return {
      // project: {
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
      // },
      // vgDate: '2019/01/30',
      vgDate: this.showDate,
      soDate: '',
      soDateList: [],
      selectedFloor: 1,
      selectedSO: '',
      floorIndex: 0,
      show: true,
      vgChartData: [
        // {
        //   vgLocation: 'vg-1-1',
        //   data: [
        //     ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T06:42:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T09:28:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150]
        //   ]
        // },
        // {
        //   vgLocation: 'vg-1-2',
        //   data: [
        //     ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T10:42:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T11:21:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150]
        //   ]
        // }
      ],
      soChartData: [
        // { depth: -5, '10:00': 0, '12:00': 0 },
        // { depth: -4, '10:00': 0.2, '12:00': 2 },
        // { depth: -3, '10:00': 0.4, '12:00': -3 },
        // { depth: -2, '10:00': 0.5, '12:00': -0.4 },
        // { depth: -1, '10:00': 0.1, '12:00': -0.2 },
        // { depth: 0, '10:00': -0.3, '12:00': -0.5 }
      ]
    }
  },
  computed: {
    showImage() {
      if (this.project.sitePlan) {
        return `${process.env.VUE_APP_API_URL}/${this.project.sitePlan}`
      }
    },
    project() {
      return this.$store.getters.currentProject
    },
    startDate() {
      return moment(this.project.dataRangeVg.start).toDate()
    },
    showDate() {
      return moment(this.project.dataRangeVg.end).toDate()
    },
    floorList() {
      return Array.from(Array(this.project.floor).keys()).map(x => (x += 1))
    },
    disabledDate() {
      var startDate = moment(this.startDate)
        .subtract(1, 'd')
        .toDate()
      var endDate = moment(this.showDate).toDate()
      return {
        disabledDate(time) {
          return time.getTime() < startDate || time.getTime() > endDate
        }
      }
    }
  },
  watch: {
    selectedFloor(value) {
      this.getVGData(this.vgDate, value)
    },
    vgDate(value) {
      this.getVGData(value, this.selectedFloor)
    },
    selectedSO(value) {
      this.soDate = ''
      this.getSOData(value)
    },
    soDate(value) {
      this.soChartData =
        value && this.soChartData.filter(item => item.date === value)[0].soData
    }
  },
  methods: {
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    },
    getVGData(dateTime, floor) {
      var payload = {
        projectId: this.$route.params.projectId,
        date: moment(dateTime).format('YYYY/MM/DD'),
        floor
      }
      return this.$store.dispatch('getMeasuredVG', payload).then(res => {
        this.vgChartData = res.data.data
      })
    },
    getSOData(soLocationNumber) {
      if (!soLocationNumber) return
      var payload = {
        projectId: this.$route.params.projectId,
        soLocationNumber
      }
      return this.$store.dispatch('getMeasuredSO', payload).then(res => {
        this.soChartData = res.data.data
        this.soDateList = res.data.data.map(x => x.date)
      })
    },
    exportVG() {
      this.$store
        .dispatch('exportVG', this.$route.params.projectId)
        .then(() => {
          this.$message({
            message: `成功下載 ${this.newProject.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    exportSO() {
      this.$store
        .dispatch('exportSO', this.$route.params.projectId)
        .then(() => {
          this.$message({
            message: `成功下載 ${this.newProject.name}`,
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
<style>
.show-picture {
  cursor: pointer;
  width: 80px;
}
</style>
