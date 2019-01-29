<template>
  <div class="projectMonitor">
    <h1>查看監控資料</h1>
    <h3>基本資料</h3>
    案號：{{project.number}}
    <br>
    <br>
    名稱：{{project.name}}
    <h3>配置圖</h3>
    <h4 @click='show = !show'>顯示/隱藏</h4>
    <img :src="showImage" v-if="show">
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
                <el-date-picker
                  v-model="vgDate"
                  format='yyyy-MM-dd'
                  type="date"
                  placeholder="選擇日期時間">
                </el-date-picker>
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
        <VGChart :vgChartData="vgChartData" :project='project'/>
        <el-button v-if="isShow('project:export')">匯出資料</el-button>
      </el-tab-pane>

      <el-tab-pane label="傾度管 ( SO )">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="soDate"
                  format='yyyy-MM-dd'
                  type="date"
                  placeholder="選擇日期時間">
                </el-date-picker>
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
        <div class="chart" v-if="isSOSelected">
          <ve-line 
            width='90%'
            grid='vgGrid'
            :data="soChartData" 
            :settings="soChart" 
            :mark-line="soMark"
            :legend-visible="false"></ve-line>
          </div>
        <!-- <SOChart v-if="isSOSelected" :soChartData="soChartData"/> -->
        <el-button v-if="isShow('project:export')">匯出資料</el-button>
      </el-tab-pane>
    </el-tabs>
    <!-- <Chart /> -->
    <VGChart :vgChartData="vgChartData" :project='project'/>
    <br>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
// import Chart from '../components/Chart';
// import SOChart from "../components/SOChart"
import VGChart from "../components/VGChart"
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/markLine'
// import 'echarts/lib/component/markPoint'
import moment from 'moment'

export default {
  name: 'ProjectMonitor',
  components: { VeLine, VGChart },
  mixins: [ToPathMixin],
  created() {
    if (this.$route.params.projectId) {
      this.loadProject(this.$route.params.projectId).then(() => {
        this.setVGTable(0)
      })
    }
  },
  data() {
    this.soMark = {
      data: [
        {
          name: '管理值',
          xAxis: 5,
          label: { normal: { formatter: '管理值' } }
        },
        {
          name: '管理值',
          xAxis: -5,
          label: { normal: { formatter: '管理值' } }
        },
        {
          lineStyle: { color: 'blue' },
          name: '警戒值',
          xAxis: 10,
          label: { normal: { formatter: '警戒值' } }
        },
        {
          lineStyle: { color: 'blue' },
          name: '警戒值',
          xAxis: -10,
          label: { normal: { formatter: '警戒值' } }
        },
        {
          lineStyle: { color: 'red' },
          name: '行動值',
          xAxis: 15,
          label: { normal: { formatter: '行動值' } }
        },
        {
          lineStyle: { color: 'red' },
          name: '行動值',
          xAxis: -15,
          label: { normal: { formatter: '行動值' } }
        }
      ]
    }
    this.soChart = {
      xAxisType: 'value'
    }
    return {
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
      vgDate: '',
      soDate: '',
      selectedVG: '',
      selectedSO: '',
      subVGLocation: [],
      floorIndex: 0,
      show: true,
      vgChartData: {
        columns: ['date', 'PV'],
        rows: [
          { date: '2018/12/08 01:00', PV: 95 },
          { date: '2018/12/08 03:00', PV: -50 },
          { date: '2018/12/08 08:00', PV: -33 },
          { date: '2018/12/08 12:00', PV: -30 },
          { date: '2018/12/08 15:01', PV: -102 },
          { date: '2018/12/08 19:02', PV: 40 },
          { date: '2018/12/08 22:29', PV: 60 }
        ]
      },
      // initSOData: [
      //   {
      //     "c0": 10,
      //     "c1": 40,
      //     "c2": 45,
      //     "c3": 60,
      //     "c4": 70,
      //     "c5": 77,
      //   }
      // ],
      soChartData: {
        columns: ['date', 'PV'],
        rows: [
          { date: '0', PV: -2.5 },
          { date: '11', PV: -2 },
          { date: '6', PV: -1.5 },
          { date: '-4', PV: -1 },
          { date: '-13', PV: -0.5 },
          { date: '4', PV: 0 }
        ]
      }
    }
  },
  computed: {
    showImage() {
      if (this.project.sitePlan) {
        return `${process.env.VUE_APP_API_URL}/${this.project.sitePlan}`
      }
    },
    isVGSelected() {
      this.setVGMarkLine
      return !!this.selectedVG && !!this.vgDate
    },
    isSOSelected() {
      return !!this.selectedSO && !!this.soDate
      },
    setVGMarkLine() {
      var vg = this.project.vgManagement[this.floorIndex]
      this.vgMark.data[0].yAxis = vg.notice
      this.vgMark.data[1].yAxis = -vg.notice
      this.vgMark.data[2].yAxis = vg.warning
      this.vgMark.data[3].yAxis = -vg.warning
      this.vgMark.data[4].yAxis = vg.action
      this.vgMark.data[5].yAxis = -vg.action
      // return this.project.vgManagement[this.floorIndex].notice
    }
  },
  methods: {
    loadProject(projectId) {
      return this.$store.dispatch('getProject', projectId).then(res => {
        this.project = res.data.data
      })
    },
    currentFloor(selectedFloor) {
      this.selectedVG = ''
      this.floorIndex = selectedFloor - 1
      this.setVGTable(this.floorIndex)
    },
    setVGTable(floorIndex) {
      var numOfFloor = this.project.vgLocation.length / this.project.floor
      var start = floorIndex * numOfFloor
      var end = (floorIndex + 1) * numOfFloor
      this.subVGLocation = this.project.vgLocation.slice(start, end)
    },
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    }
  }
}
</script>
