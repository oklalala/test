<template>
  <div class="createProject">
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newProject">
      
      <h2>基本資料</h2>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="專案案號">
            <el-input v-model="newProject.number"
              placeholder="CNT - 16Q4"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="專案狀態">
            <el-select
              v-model="newProject.status"
              placeholder="請選擇"
              style="width: 100%">
              <el-option
                v-for="item in statusList"
                :key="item.name"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col>
          <el-form-item label="專案名稱">
            <el-input v-model="newProject.name"
              placeholder="阡福町商業大樓"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點">
        <el-input
          v-model="newProject.address"
          placeholder="大武街 34 號"
          style="width: 100%">
        </el-input>
      </el-form-item>

      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="newProject.companyId"
          @change="resetMember"
          placeholder="雨宮營造"
          style="width: 100%">
          <el-option
            v-for="company in companiesList"
            :key="company.id"
            :label="company.name"
            :value="company.id">
          </el-option>
        </el-select>
      </el-form-item>

      <h2>參與人員</h2>
      <el-tabs type="border-card">
        <el-tab-pane label="OPT">
          <el-select
            v-model="newProject.OPT"
            placeholder="金貝貝"
            multiple
            @change="updateSelectedOPTs"
            style="width: 100%">
            <el-option
              v-for="opt in OPTs"
              :key="opt.id"
              :label="opt.name"
              :value="opt.id">
            </el-option>
          </el-select>
            
          <el-table
            :data="OPTList"
            class="projectList-table">
            <el-table-column
              label="負責人"
              type="selection"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="OPT"
              width="320">
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="USER">
          <el-select
            v-model="newProject.USER"
            placeholder="阿土伯"
            multiple
            @change="updateSelectedUSERs"
            style="width: 100%">
            <el-option
              v-for="user in USERs"
              :key="user.id"
              :label="user.name"
              :value="user.id">
            </el-option>
          </el-select>
            
          <el-table
            :data="USERList"
            class="projectList-table">
            <el-table-column
              label="負責人"
              type="selection"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="USER"
              width="320">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>


      <h1>配置圖</h1>
      <el-upload 
        class="upload-demo" 
        drag
        action="https://jsonplaceholder.typicode.com/posts/" 
        :on-change="uploadChange"
        list-type="picture"
        :auto-upload="false">
        <img :src="this.image.url" alt="" v-if="imageSelected">
        <i class="el-icon-upload" v-if="!imageSelected"></i>
        <div class="el-upload__text" v-if="!imageSelected">將文件拖到此處，或<em>點擊上傳</em></div>
        <el-button class="reselect" size="small" type="primary" v-if="imageSelected">另選圖片</el-button>
      </el-upload>

      <h2>監控設定</h2>
      <el-tabs type="border-card">

        <el-tab-pane label="軸力計 ( VG )"> 
          <el-form-item label="使用軸力計編號">
            {{needMoreGauge}}
            <el-select 
              v-model="newProject.vgIds" 
              placeholder="可複選"
              multiple 
              @change="updateSelectedVGs"
              style="width: 100%">
              <el-option
                v-for="vg in VGs"
                :disabled="!!vg.projectName"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="demo-input-suffix">
            支撐階數：
            <el-input 
              v-model.number="newProject.floor"
              placeholder="3">
            </el-input>
            每層數量：
            <el-input
              v-model.number="numOfFloor"
              placeholder="5">
            </el-input>
          </div>
          <br>
          <el-button @click.native="getVGItems()" :disabled="!preparedShowVG">import VGs</el-button>
          <br>
          <br>

          <div class="block" v-if="!!fullVGsInfo.length">
            <span class="demonstration">請選擇支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentFloor"
              :total="getPagination">
            </el-pagination>
          </div>

          <el-row :gutter="20" v-if="!!fullVGsInfo.length">
            <el-col :span="5">
              <h2>管理值<span>單位：噸</span></h2>
              注意值
              <el-input
                v-model.number="newProject.vgManagement[floorIndex].notice"
                placeholder="68.3">
              </el-input>
              警戒值
              <el-input
                v-model.number="newProject.vgManagement[floorIndex].warning"
                placeholder="79.6">
              </el-input>
              行動值
              <el-input
                v-model.number="newProject.vgManagement[floorIndex].action"
                placeholder="104.2">
              </el-input>
            </el-col>
            <el-col :span="19">
              <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
              <el-button
                @click="toPath('SteelList')">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgTable">
                <el-table-column
                  prop="host"
                  label="VG ID"
                  width="320">
                </el-table-column>
                <el-table-column
                  prop="port"
                  label="Port"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="serial"
                  label="編碼"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="steelId"
                  label="鋼材"
                  width="100">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.steelId"
                      placeholder="请选择">
                      <el-option
                        v-for="steel in Steels"
                        :key="steel.id"
                        :label="steel.name"
                        :value="steel.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="傾度管 ( SO )">
          <div class="demo-input-suffix">
            數量：
            <el-input
              v-model.number="soQt"
              placeholder="5">
            </el-input>
            每孔深度 ( m )：
            <el-input
              v-model.number="soDepth"
              placeholder="20.5">
            </el-input>
          </div>
          <br>
          <el-button @click.native="getSOItems()" :disabled="!preparedShowSO">import SOs</el-button>
          <br>

          <el-row :gutter="20" v-if="!!newProject.soLocation.length">
            <el-col :span="8">
              <h2>管理值<span>單位：cm</span></h2>
              注意值
              <el-input
                v-model.number="newProject.soManagement.notice"
                placeholder="4.24">
              </el-input>
              警戒值
              <el-input
                v-model.number="newProject.soManagement.warning"
                placeholder="9.88">
              </el-input>
              行動值
              <el-input
                v-model.number="newProject.soManagement.action"
                placeholder="15.06">
              </el-input>
            </el-col>
            <el-col :span="14">
              <h2>位置編號<span>( SO - 流水號 )</span></h2>
              <h5>相同位置編碼 量測深度間隔 1 m</h5>
              <el-table class="so-table" :data="newProject.soLocation">
                <el-table-column
                  prop="number"
                  label="編碼"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="depth"
                  label="深度"
                  width="200">
                  <template slot-scope="scope">
                    <el-input 
                    v-model.number="scope.row.depth">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <br>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button
              style="width: 100%"
              @click="submit">
              確定送出
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="width: 100%"
              @click="cancel">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import CalculateVGMixin from '@/mixins/CalculateVG'
import sendImageAPI from '../utils/ImageAPI'

export default {
  name: 'ProjectCreate',

  mixins: [ToPathMixin, CalculateVGMixin],
  data() {
    return {
      soQt: 0,
      soDepth: 0,
      needMoreGauge: '', // alert text
      floorIndex: 0, // used in array
      numOfFloor: 0, //
      VGList: [], // get usable VGs
      vgTable: [], // every floor VGs
      fullVGsInfo: [], // from calculateVG.js
      imageSelected: false, // optimize UX
      image: [{ url: 'haha' }], // preview url in blob
      OPTList: [], // custom and self OPTs
      USERList: [], // custom USERs
      statusList: [
        {
          value: 'end',
          label: '結案'
        },
        {
          value: 'in-progress',
          label: '執行'
        }
      ],
      newProject: {
        number: '', // CNT-16Q3
        status: '', // end or in-progress
        name: '', // 測試專案
        address: '', // 三路
        companyId: '',
        sitePlan: '', // 上傳的圖片
        OPT: [], // {id:..} 公司或客戶的 operator
        USER: [], // {id:..} 客戶的使用者
        floor: 3, //. vg階數
        vgManagement: [],
        soManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
        vgIds: [],
        vgLocation: [],
        soLocation: []
      }
    }
  },
  computed: {
    projectList() {
      return this.$store.getters.projects
    },
    roles() {
      return this.$store.getters.roles
    },
    companiesList() {
      var allCompany = this.$store.getters.companies
      return allCompany.filter(company => company.id != this.myCompany.id)
    },
    soItems() {
      return this.$store.getters.soItems
    },

    OPTs() {
      var allOPT = this.$store.getters.OPTs
      var customersOPT = allOPT.filter(
        user => user.company.id == this.newProject.companyId
      )
      var selfOPT = allOPT.filter(user => user.company.id == this.myCompany.id)
      return selfOPT.concat(customersOPT)
    },
    USERs() {
      var allUSER = this.$store.getters.USERs
      var customeersUSER = allUSER.filter(
        user => user.company.id == this.newProject.companyId
      )
      return customeersUSER
    },
    myCompany() {
      return this.$store.getters.me.company
    },
    VGs() {
      return this.$store.getters.vgs
    },
    isEnoughtVG() {
      var neededGauge = this.newProject.floor * this.numOfFloor
      var usableGauge = this.VGList.length * 14 // a host have 14 port
      return usableGauge >= neededGauge
    },
    getPagination() {
      return this.newProject.floor * 10
    },
    Steels() {
      return this.$store.getters.steels
    },
    preparedShowSO() {
      return !!this.soQt && !!this.soDepth
    }
  },
  methods: {
    reset() {
      this.newProject = {
        number: '', // CNT-16Q3
        status: '', // end or in-progress
        name: '', // 測試專案
        address: '', // 三路
        companyId: '',
        sitePlan: '', // 上傳的圖片
        OPT: [], // {id:..} 公司或客戶的 operator
        USER: [], // {id:..} 客戶的使用者
        floor: 3, //. vg階數
        vgManagement: [],
        soManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
        vgIds: [],
        vgLocation: [], // [{ number: '', steelId:''}]
        soLocation: [] // [{ number: '', depth: 0 }]
      }
    },
    cancel() {
      this.reset()
      this.toPath('ProjectSetting')
    },
    submit() {
      this.initVGLocation()
      this.mergeVGLocation(this.newProject.vgLocation, this.fullVGsInfo)
      this.$store.dispatch('createProject', this.newProject).then(() => {
        this.reset()
        this.toPath('ProjectSetting')
      })
    },

    resetMember() {
      this.USERList = []
      this.OPTList = []
      this.newProject.OPT = []
      this.newProject.USER = []
    },
    updateSelectedOPTs(value) {
      var OPTList = []
      value.forEach(id => {
        var selectedOPT = this.OPTs.filter(opt => opt.id == id)
        OPTList = OPTList.concat(selectedOPT)
      })
      this.OPTList = OPTList
    },
    updateSelectedUSERs(value) {
      var USERList = []
      value.forEach(id => {
        var selectedUSER = this.USERs.filter(user => user.id == id)
        USERList = USERList.concat(selectedUSER)
      })
      this.USERList = USERList
    },
    uploadChange(file) {
      this.imageSelected = true
      this.image = file
      sendImageAPI(file.raw).then(res => {
        this.newProject.sitePlan = res.data.url
      })
    },
    getVGItems() {
      var floor = this.newProject.floor
      var vgList = this.newProject.vgIds
      this.fullVGsInfo = this.importVGItems(floor, this.numOfFloor, vgList)
      this.initVGManagement()
      this.getVGTable(0)
    },
    currentFloor(selectedFloor) {
      this.floorIndex = selectedFloor - 1
      this.getVGTable(this.floorIndex)
    },
    updateSelectedVGs(value) {
      var VGList = []
      value.forEach(id => {
        var selectedVG = this.VGs.filter(vg => vg.id == id)
        VGList = VGList.concat(selectedVG)
      })
      this.VGList = VGList
    },
    getVGTable(floorIndex) {
      var start = floorIndex * this.numOfFloor
      var end = (floorIndex + 1) * this.numOfFloor
      this.vgTable = this.fullVGsInfo.slice(start, end)
    },
    preparedShowVG() {
      if (!this.isEnoughtVG) {
        this.needMoreGauge = 'Add more gauge please'
        return false
      }
      this.needMoreGauge = ''
      var hasFloor = !!this.newProject.floor
      var hasNumOfFloor = !!this.numOfFloor
      var hasSelectedVG = this.newProject.vgIds.length !== 0
      return hasFloor && hasNumOfFloor && hasSelectedVG
    },
    initVGManagement() {
      var arr = []
      for (var i = 0; i < this.newProject.floor; i++) {
        arr.push({ notice: 0, warning: 0, action: 0 })
      }
      this.newProject.vgManagement = arr
    },
    getSOItems() {
      this.newProject.soLocation = this.initSOLocation(this.soQt, this.soDepth)
    },
    initSOLocation(number, depth) {
      var arr = []
      for (var i = 1; i <= number; i++) {
        arr.push({
          number: `SO-0${i}`, // todo: if i > 10
          depth: depth
        })
      }
      return arr
    },
    mergeVGLocation(vgLocation, fullVGsInfo) {
      fullVGsInfo.forEach((vg, index) => {
        vgLocation[index].number = vg.serial
        vgLocation[index].steelId = vg.steelId
        console.log(vgLocation)
      })
    },
    initVGLocation() {
      var length = this.newProject.floor * this.numOfFloor
      var vgLocation = []
      for (var i = 0; i < length; i++) {
        vgLocation.push({ number: '', steelId: '' })
      }
      this.newProject.vgLocation = vgLocation
    }
  }
}
</script>

<style>
h2 span {
  font-size: 14px;
  padding-left: 30px;
}

img {
  width: 100%;
}

.el-upload-list--picture {
  display: none;
}

.el-upload-dragger,
.el-upload--picture {
  width: 60vw;
  height: auto;
}

.reselect {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
