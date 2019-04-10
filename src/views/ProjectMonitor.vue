<!-- @format -->

<template>
  <div class="projectMonitor">
    <h1>查看監控資料</h1>
    <h2>基本資料</h2>
    <p>案號：{{ project.number }}</p>
    <p>名稱：{{ project.name }}</p>
    <h2>
      配置圖<span
        class="small clickable"
        @click="toggleConfigImg = !toggleConfigImg"
      >
        顯示/隱藏
      </span>
    </h2>
    <el-collapse-transition>
      <div v-show="toggleConfigImg">
        <img class="configImage" :src="sitePlan" />
      </div>
    </el-collapse-transition>

    <h3>監控值</h3>
    <el-form label-position="top">
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="軸力計 (VG)">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="currentVgDate"
                  format="yyyy-MM-dd"
                  type="date"
                  :picker-options="datePickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="支撐階數">
                <el-select v-model="currentFloor" placeholder="請選擇">
                  <el-option
                    v-for="floor in floorOptions"
                    :key="floor"
                    :label="floor"
                    :value="floor"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <VGECharts
                :selectedDay="currentVgDate"
                :selectedFloor="currentFloor"
                :vgChartData="vgChartData"
                :project="project"
              />
            </el-col>
            <el-col :span="24">
              <el-button
                v-if="isShow('project:export')"
                @click="exportMeasuredData('vg')"
                >匯出資料</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="傾度管 (SO)">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <el-form-item label="位置">
                <el-select v-model="currentSoLocation" placeholder="請選擇位置">
                  <el-option
                    v-for="location in soLocation"
                    :key="location.number"
                    :label="location.number"
                    :value="location.number"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="日期">
                <el-select v-model="currentSoDate" placeholder="請選擇日期">
                  <el-option
                    v-for="date in dateOfSoMeasuredData"
                    :key="date"
                    :label="date"
                    :value="date"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="min-height: 400px;">
              <SOECharts
                v-if="!!currentSoDate && !!currentSoDate"
                :soChartData="soChartData"
                :project="project"
              />
            </el-col>
            <el-col :span="24">
              <el-button
                v-if="isShow('project:export')"
                @click="exportMeasuredData('so')"
                >匯出資料</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import VGECharts from '@/components/VGECharts'
import SOECharts from '@/components/SOECharts'
import moment from 'moment'

export default {
  name: 'ProjectMonitor',
  components: {
    VGECharts,
    SOECharts
  },
  mixins: [ToPathMixin],
  mounted() {
    this.currentVgDate = this.$store.getters.vgMeasuredDataRange.end
    this.$store.dispatch('fetchVgMeasuredData', {
      projectId: this.$route.params.projectId,
      date: moment(this.currentVgDate).format('YYYY/MM/DD'),
      floor: 1
    })
    this.$store.dispatch('fetchSoMeasuredData', {
      projectId: this.$route.params.projectId,
      soLocationNumber: this.currentSoLocation
    })
  },
  data() {
    return {
      toggleConfigImg: true,
      currentFloor: 1,
      currentVgDate: new Date(),
      currentSoLocation: 'SO-01',
      currentSoDate: ''
    }
  },
  computed: {
    project() {
      return this.$store.getters.project
    },
    sitePlan() {
      return this.$store.getters.sitePlan
    },
    datePickerOptions() {
      const startVgDate = this.$store.getters.vgMeasuredDataRange.start
      const endVgDate = this.$store.getters.vgMeasuredDataRange.end
      return {
        disabledDate(time) {
          return time.getTime() < startVgDate || time.getTime() > endVgDate
        }
      }
    },
    floorOptions() {
      const length = this.$store.getters.totalFloor
      return Array.from({ length }).map((item, index) => index + 1)
    },
    vgChartData() {
      return this.$store.getters.vgMeasuredData
      // [{
      //   vgLocation: 'vg-1-1',
      //   data: [
      //     ['2019-01-30T03:00:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T06:42:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T09:28:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T12:24:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T15:00:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T18:00:00+8000', Math.floor(Math.random() * 300) - 150],
      //     ['2019-01-30T21:32:00+8000', Math.floor(Math.random() * 300) - 150]
      // ]}, {
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
      // }]
    },
    dateOfSoMeasuredData() {
      return this.$store.getters.dateOfSoMeasuredData
    },
    soChartData() {
      const measuredOfOneDay = this.$store.getters.soMeasuredData
        .filter(item => item.date === this.currentSoDate)
        .shift()
      return measuredOfOneDay && measuredOfOneDay.soData
    },
    soLocation() {
      return this.$store.getters.soLocation
    }
  },
  watch: {
    currentVgDate(date) {
      this.$store.dispatch('fetchVgMeasuredData', {
        projectId: this.$route.params.projectId,
        date: moment(date).format('YYYY/MM/DD'),
        floor: this.currentFloor
      })
    },
    currentFloor(floor) {
      this.$store.dispatch('fetchVgMeasuredData', {
        projectId: this.$route.params.projectId,
        date: moment(this.currentVgDate).format('YYYY/MM/DD'),
        floor
      })
    },
    currentSoLocation(location) {
      this.currentSoDate = ''
      this.$store.dispatch('fetchSoMeasuredData', {
        projectId: this.$route.params.projectId,
        soLocationNumber: location
      })
    }
  },
  methods: {
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    },
    exportMeasuredData(type) {
      this.$message({
        message: `正在下載'${this.project.name}'的傾度管資料`,
        type: 'info',
        center: true,
        duration: 1800
      })
      this.$store
        .dispatch('export', {
          type,
          projectId: this.$route.params.projectId
        })
        .then(() => {
          this.$message({
            message: `成功下載 ${this.project.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
    }
  }
}
</script>
<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.configImage {
  width: 100%;
  height: auto;
}

.vgECharts,
.soECharts {
  overflow-y: auto;
}
</style>
<style>
.echarts {
  margin: auto;
}
</style>
