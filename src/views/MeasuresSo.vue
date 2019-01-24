<template lang="html">
<div class="measuresSo">
  <h1>傾度管量測</h1>
  <el-form label-width="100px" label-position="left">
    <section>
      <h2>基本資料</h2>
      <p>案號： {{projectId}}</p>
      <p>名稱： {{projectName}}</p>
    </section>
    <section>
      <h2>量測作業</h2>
      <el-form-item label="專案階段">
        <el-select v-model="value" placeholder="第一次開挖">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="請度管編號">
        <el-select v-model="value" placeholder="SO-01">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="WISE IP">
        <el-input :value="wiseIP" >
        </el-input>
      </el-form-item>
      <el-form-item label="請由上往下量，間隔 1m 量測一次" label-width="300px">
      </el-form-item>
    <el-button @click="measures">量測</el-button>
    </section>
    <section v-if="measuresSoDatas.length">
      <p>應量測10筆，已量測{{measuresSoDatas.length}}筆</p>
      <el-table
        :data="measuresSoDatas"
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="time"
          label="時間"
          width="200">
        </el-table-column>
        <el-table-column
          prop="temp"
          label="溫度(c)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="VoltageX"
          label="原始電壓"
          width="120">
        </el-table-column>
        <el-table-column
          prop="degreeX"
          label="傾斜角度(度C)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="displacement"
          label="位移量(cm)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="totalDisplacement"
          label="總位移量(cm)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="depth"
          label="深度(m)"
          width="120">
        </el-table-column>
      </el-table>
      <el-button @click="clearMeasuresDatas">清除資料</el-button>
      <el-button @click="uploadMeasuresDatas" :disabled="measuresSoDatas.length<10">確認無誤並上傳</el-button>
    </section>
  </el-form>
  <p>要加入故障排除方式</p>
</div>
</template>

<script>
import startMeasures from '@/utils/measuresSo'
export default {
  data() {
    return {
      wiseIP: '192.168.58.200',
      measuresSoDatas: [],
      projectId:'',
    }
  },
  methods: {
    measures: function() {
      startMeasures(this.wiseIP, this.measuresSoDatas)
    },
    clearMeasuresDatas: function() {
      this.measuresSoDatas = []
    },
    uploadMeasuresDatas: function() {
      console.log('fuck')
    },
    getProjectId: function() {
      this.projectId = this.$route.params.projectId
    },
    getProjects:function(){
      this.$store.dispatch('getProjects')
    }
  },
  computed:{
    projects:function(){
      return this.$store.getters.projects
    },
    projectName:function(){
      let project = this.projects.filter(item=>{
        return item.id === this.projectId
      })
      return project[0].name
    }
  },
  mounted() {
    this.getProjectId(),
    this.getProjects()
  }
}
</script>
