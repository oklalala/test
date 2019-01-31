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
        <VGChart 
          v-if='isVGSelected'
          :vgChartData="vgChartData" 
          :project='project'
          :floorIndex='floorIndex'/>
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
        <SOChart 
          v-if="isSOSelected" 
          :soChartData="soChartData"/>
        <el-button v-if="isShow('project:export')">匯出資料</el-button>
      </el-tab-pane>
    </el-tabs>
    <br>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import SOChart from '../components/SOChart'
import VGChart from '../components/VGChart'
import moment from 'moment'

export default {
  name: 'ProjectMonitor',
  components: { VGChart, SOChart },
  mixins: [ToPathMixin],
  created() {
    if (this.$route.params.projectId) {
      this.loadProject(this.$route.params.projectId).then(() => {
        this.setVGTable(0)
      })
    }
  },
  data() {
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
        columns: ['createdAt', 'strutAxialForce'],
        rows: [
          { createdAt: '2019-01-30T00:00:00.000Z', strutAxialForce: 90 },
          { createdAt: '2019-01-30T03:00:00.000Z', strutAxialForce: -80 },
          { createdAt: '2019-01-30T06:00:00.000Z', strutAxialForce: 110 },
          { createdAt: '2019-01-30T09:00:00.000Z', strutAxialForce: 130 },
          { createdAt: '2019-01-30T12:00:00.000Z', strutAxialForce: -80 },
          { createdAt: '2019-01-30T15:00:00.000Z', strutAxialForce: 90 },
          { createdAt: '2019-01-30T18:00:00.000Z', strutAxialForce: 30 },
          { createdAt: '2019-01-30T21:00:00.000Z', strutAxialForce: 40 }
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
        columns: ['totalDisplacement','depth'],
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
      this.getVGData(this.vgDate, this.selectedVG)
      return !!this.selectedVG && !!this.vgDate
    },
    isSOSelected() {
      this.getSOData(this.soDate, this.selectedSO)
      return !!this.selectedSO && !!this.soDate
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
    },
    getVGData(dateTime, vgNumber) {
      if (!dateTime || !vgNumber) return
      var payload = {
        projectId: this.$route.params.projectId,
        date: moment(dateTime).format('YYYY/MM/DD'),
        vgNumber: vgNumber
      }
      return this.$store.dispatch('getMeasuredVG', payload).then(res => {
        this.vgChartData.rows = res.data.data
      })
    },
    getSOData(dateTime, soNumber) {
      if (!dateTime || !soNumber) return
      var payload = {
        projectId: this.$route.params.projectId,
        date: moment(dateTime).format('YYYY/MM/DD'),
        soNumber: soNumber
      }
      return this.$store.dispatch('getMeasuredSO', payload).then(res => {
        var soData = res.data.data
        this.soChartData.rows = soData
        this.soChartData.rows.map(soDatium => soDatium.depth = -soDatium.depth)
      })
    }
  }
}
</script>
