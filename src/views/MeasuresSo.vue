<!-- @format -->

<template lang="html">
  <div class="measuresSo">
    <h1>傾度管量測</h1>
    <el-form label-position="top">
      <section>
        <h2>基本資料</h2>
        <p>案號： {{ project.number }}</p>
        <p>名稱： {{ project.name }}</p>
        <p>傾度管: {{ soItem.number }}</p>
      </section>
      <section>
        <h2>量測作業</h2>
        <el-form-item label="專案階段" required>
          <el-select
            v-model="projectPhaseId"
            placeholder="第 1 次開挖"
            @change="clearMeasuresDatas"
          >
            <el-option
              v-for="projectPhase in projectPhaseOptions"
              :key="projectPhase.id"
              :label="projectPhase.name"
              :value="projectPhase.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="量測點編號" required>
          <el-select
            v-model="soLocationNumber"
            placeholder="SO-01"
            @change="onChangeLocation"
          >
            <el-option
              v-for="location in project.soLocation"
              :key="location.number"
              :label="location.number"
              :value="location.number"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="傾度管連線 IP" required>
          <el-input
            v-model="wiseIP"
            @change="clearMeasuresDatas"
            placeholder="192.168.58.200"
          >
          </el-input>
        </el-form-item>
        <span>應量測深度 {{ currentDepth }} 公尺</span>
        <el-form-item
          label=" 請由下往上量，間隔 1m 量測一次"
          label-width="300px"
        >
        </el-form-item>
        <el-button
          @click="measures"
          :disabled="
            measuresSoDatas.length >= currentDepth ||
              !projectPhaseId ||
              isMeasuring ||
              !soItem
          "
        >
          <span v-if="isMeasuring">量測中</span>
          <span v-else>量測</span>
        </el-button>
      </section>
      <section v-if="measuresSoDatas.length">
        <p>
          應量測 {{ currentDepth }} 筆，已量測{{ measuresSoDatas.length }}筆
        </p>
        <el-table :data="measuresSoDatas">
          <el-table-column fixed type="index" width="50"> </el-table-column>
          <el-table-column prop="date" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="time" label="時間" width="100">
          </el-table-column>
          <el-table-column prop="depth" label="深度(m)" width="80">
          </el-table-column>
          <el-table-column prop="temp" label="溫度(c)" width="150">
          </el-table-column>
          <el-table-column prop="VoltageX" label="原始電壓" width="120">
          </el-table-column>
          <el-table-column prop="degreeX" label="傾斜角度(度C)" width="150">
          </el-table-column>
          <el-table-column prop="displacement" label="位移量(cm)" width="150">
          </el-table-column>
          <el-table-column
            prop="totalDisplacement"
            label="總位移量(cm)"
            width="150"
          >
          </el-table-column>
        </el-table>
        <el-button @click="clearMeasuresDatas">清除資料</el-button>
        <el-button
          @click="uploadMeasuresDatas"
          :disabled="measuresSoDatas.length < currentDepth || isSend"
        >
          <span v-if="isSend">已上傳</span>
          <span v-else>確認無誤並上傳</span>
        </el-button>
      </section>
    </el-form>
  </div>
</template>

<script>
import startMeasures from '@/utils/measuresSo'
export default {
  data() {
    return {
      wiseIP: '192.168.58.200',
      measuresSoDatas: [],
      projectPhaseId: '',
      soLocationNumber: '',
      // soItem: {},
      isSend: false,
      isMeasuring: false,
      currentSoLocationIndex: -1
    }
  },
  methods: {
    measures: function() {
      let racePromise = new Promise(resolve => {
        setTimeout(() => {
          resolve('Promise A win!')
        }, 5000)
      })

      let raceMeasures = startMeasures(
        this.wiseIP,
        this.measuresSoDatas,
        this.soItem,
        this.currentDepth
      )
      if (!this.isMeasuring) {
        Promise.race([racePromise, raceMeasures])
          .then(() => {
            this.isMeasuring = false
          })
          .catch(() => {
            this.isMeasuring = false
          })
        this.isMeasuring = true
      }
    },
    clearMeasuresDatas: function() {
      this.measuresSoDatas = []
      this.isSend = false
    },
    uploadMeasuresDatas: function() {
      let measuresData = {
        projectId: this.$route.params.projectId,
        projectPhaseId: this.projectPhaseId,
        soLocationNumber: this.soLocationNumber,
        soItemId: this.soItem.id,
        soItemParameters: this.soItem.parameters,
        measureResult: this.measuresSoDatas
      }
      this.$store.dispatch('uploadMeasuresDatas', measuresData)
      this.isSend = true
    },
    onChangeLocation: function() {
      let filterResult
      filterResult = this.project.soLocation.filter(item => {
        return item.number === this.soLocationNumber
      })
      this.currentSoLocationIndex = this.project.soLocation.indexOf(
        filterResult.shift()
      )
      this.clearMeasuresDatas()
    }
  },
  computed: {
    project() {
      return this.$store.getters.project
    },
    projectPhaseOptions() {
      return this.$store.getters.projectPhases
    },
    me() {
      return this.$store.getters.me
    },
    currentDepth() {
      return ~this.currentSoLocationIndex
        ? this.project.soLocation[this.currentSoLocationIndex].depth
        : 0
    },
    soItem() {
      return this.$store.getters.mySoItem
    }
  },
  beforeDestroy() {
    if (window.location.protocol === 'https:') {
      window.location.protocol = 'https:'
    }
  }
}
</script>
