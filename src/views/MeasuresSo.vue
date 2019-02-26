<template lang="html">
<div class="measuresSo">
  <h1>傾度管量測</h1>
  <el-form label-width="100px" label-position="left">
    <section>
      <h2>基本資料</h2>
      <p>案號： {{projectNumber}}</p>
      <p>名稱： {{projectName}}</p>
    </section>
    <section>
      <h2>量測作業</h2>
      <el-form-item label="專案階段" required>
        <el-select v-model="projectPhaseId" placeholder="第一次開挖">
         <el-option
           v-for="projectPhase in projectPhases"
           :key="projectPhase.id"
           :label="projectPhase.name"
           :value="projectPhase.id">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="量測點編號" required>
        <el-select v-model="soLocationNumber" placeholder="SO-01" @change="changeLocation">
         <el-option
           v-for="location in project.soLocation"
           :key="location.number"
           :label="location.number"
           :value="location.number">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="WISE IP" required>
        <el-input  v-model="wiseIP">
        </el-input>
      </el-form-item>
      <span>應量測深度 {{currentDepth}} 公尺</span>
      <el-form-item label=" 請由下往上量，間隔 1m 量測一次" label-width="300px">
      </el-form-item>
    <el-button @click="measures" :disabled="measuresSoDatas.length === currentDepth || !projectPhaseId || isMeasures">
      <span v-if="isMeasures">量測中</span>
      <span v-else>量測</span>
    </el-button>
    </section>
    <section v-if="measuresSoDatas.length">
      <p>應量測 {{currentDepth}} 筆，已量測{{measuresSoDatas.length}}筆</p>
      <el-table
        :data="measuresSoDatas"
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="time"
          label="時間"
          width="100">
        </el-table-column>
        <el-table-column
          prop="depth"
          label="深度(m)"
          width="80">
        </el-table-column>
        <el-table-column
          prop="temp"
          label="溫度(c)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="VoltageX"
          label="原始電壓"
          width="120">
        </el-table-column>
        <el-table-column
          prop="degreeX"
          label="傾斜角度(度C)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="displacement"
          label="位移量(cm)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalDisplacement"
          label="總位移量(cm)"
          width="150">
        </el-table-column>
      </el-table>
      <el-button @click="clearMeasuresDatas">清除資料</el-button>
      <el-button @click="uploadMeasuresDatas" :disabled="measuresSoDatas.length < currentDepth || isPost" >
        <span v-if="isPost">已上傳</span>
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
      projectId: '',
      projectPhaseId: '',
      soLocationNumber: '',
      soItem: {},
      isPost: false,
      isMeasures: false,
      currentSoLocationIndex: -1
    }
  },
  methods: {
    measures: function() {
      console.log('fuck')
      // startMeasures(
      //   this.wiseIP,
      //   this.measuresSoDatas,
      //   this.soItem,
      //   this.currentDepth
      // )
      // this.isMeasures = true
    },
    clearMeasuresDatas: function() {
      this.measuresSoDatas = []
      this.isPost = false
    },
    uploadMeasuresDatas: function() {
      let measuresData = {}
      measuresData.projectId = this.projectId
      measuresData.projectPhaseId = this.projectPhaseId
      measuresData.soLocationNumber = this.soLocationNumber
      measuresData.soItemId = this.soItem.id
      measuresData.soItemParameters = this.soItem.parameters
      measuresData.measureResult = this.measuresSoDatas
      this.$store.dispatch('uploadMeasuresDatas', measuresData)
      this.isPost = true
    },
    getProjectId: function() {
      this.projectId = this.$route.params.projectId
    },
    getProjectPhases: function() {
      this.$store.dispatch('getProjectPhases')
    },
    getSOItem: function() {
      this.$store.dispatch('getSOItem', this.me.soItem.id).then(response => {
        this.soItem = response.data.data
        console.log(this.soItem)
      })
    },
    changeLocation: function() {
      let filterResult
      filterResult = this.project.soLocation.filter(item => {
        return item.number === this.soLocationNumber
      })
      this.currentSoLocationIndex = this.project.soLocation.indexOf(filterResult[0])
    },

  },
  computed: {
    projects: function() {
      return this.$store.getters.projects
    },
    project: function() {
      return this.$store.getters.currentProject
    },
    projectNumber: function() {
      return this.project.number
    },
    projectName: function() {
      return this.project.name
    },
    projectPhases: function() {
      return this.$store.getters.projectPhases
    },
    me: function() {
      return this.$store.getters.me
    },
    currentDepth: function(){
      return this.currentSoLocationIndex !== -1 ? this.project.soLocation[this.currentSoLocationIndex].depth : 0
    }
  },
  watch:{
    measuresSoDatas: function(){
      this.isMeasures = false
    }
  },
  mounted() {
    this.getProjectId(),
    this.getProjectPhases(),
    this.getSOItem()
  }
}
</script>
