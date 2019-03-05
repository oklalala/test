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
                  placeholder="選擇日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="10" :md="10">
              <el-form-item label="位置">
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
          v-if='isVGSelected'
          :selectedDay='vgDate'
          :vgChartData="vgChartData"
          :project='project'/>
        <el-button v-if="isShow('project:export')">匯出資料</el-button>
      </el-tab-pane>

      <el-tab-pane label="傾度管 ( SO )">
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="14" :md="14">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="soDate"
                  format='yyyy-MM-dd'
                  type="date"
                  placeholder="選擇日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="10" :md="10">
              <el-form-item label="位置">
                <el-select v-model="selectedSO" placeholder="請選擇" label="位置">
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
        <SOECharts 
          :soChartData="soChartData"
          :project="project"/>
        <SOChart
          v-if="isSOSelected"
          :soChartData="soChartData"
          :project="project"/>
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
import VGECharts from '../components/VGECharts'
import SOECharts from '../components/SOECharts'
import moment from 'moment'

export default {
  name: 'ProjectMonitor',
  components: { VGChart, SOChart, VGECharts, SOECharts },
  mixins: [ToPathMixin],
  mounted() {
    this.getFloorList(this.project.floor)
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
      vgDate: '2019/1/30',
      // vgDate: moment().format('YYYY-MM-DD'),
      soDate: '',
      floorList: [1], 
      selectedFloor: 1,
      selectedSO: '',
      floorIndex: 0,
      show: true,
      vgChartData: [
        // {
        //   position: 'vg-1-1',
        //   data: [
        //     ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T06:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T09:28:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150]
        //   ]
        // },
        // {
        //   position: 'vg-1-2',
        //   data: [
        //     ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T10:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T11:21:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150]
        //   ]
        // },
        // {
        //   position: 'vg-1-3',
        //   data: [
        //     ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T10:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T11:21:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150]
        //   ]
        // },
        // {
        //   position: 'vg-1-4',
        //   data: [
        //     ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T10:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T11:21:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150]
        //   ]
        // },
        // {
        //   position: 'vg-1-5',
        //   data: [
        //     ['2019-01-30T03:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T10:42:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T11:21:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T12:24:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T15:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T18:00:00.000Z', Math.floor(Math.random() * 300) - 150],
        //     ['2019-01-30T21:32:00.000Z', Math.floor(Math.random() * 300) - 150]
        //   ]
        // }
      ],
      soChartData: {
        columns: ['totalDisplacement', 'depth'],
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
      this.getVGData(this.vgDate, this.selectedFloor)
      return !!this.selectedFloor && !!this.vgDate
    },
    isSOSelected() {
      this.getSOData(this.soDate, this.selectedSO)
      return !!this.selectedSO && !!this.soDate
    },
    project() {
      return this.$store.getters.currentProject
    }
  },
  methods: {
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    },
    getVGData(dateTime, floor) {
      if (!dateTime || !floor) return
      var payload = {
        projectId: this.$route.params.projectId,
        date: moment(dateTime).format('YYYY/MM/DD'),
        floor
      }
      return this.$store.dispatch('getMeasuredVG', payload).then(res => {
        this.vgChartData = res.data.data
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
        this.soChartData.rows = soData[2].measureResult
        this.soChartData.rows.map(
          soDatium => (soDatium.depth = -soDatium.depth)
        )
      })
    },
    getFloorList(floor) {
      var floorList = Array.from(Array(floor).keys())
      this.floorList = floorList.map(x => x += 1)
    }
  }
}
</script>
