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
          v-model="customerCompanyId"
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
            collapse-tags
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
            collapse-tags
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
              collapse-tags
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
          <el-button @click.native="getVGItems(newProject.floor,numOfFloor,newProject.vgIds)" :disabled="!preparedShowVG">import vgitems</el-button>
          <br>
          <br>

          <div class="block">
            <span class="demonstration">請選擇支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentFloor"
              :total="getPagination">
            </el-pagination>
          </div>

          <el-row :gutter="20">
            <el-col :span="9">
              <h2>管理值<span>單位：噸</span></h2>
              注意值
              <el-input
                v-model.number="newProject.vgManagement.notice"
                placeholder="68.3">
              </el-input>
              警戒值
              <el-input
                v-model.number="newProject.vgManagement.warning"
                placeholder="79.6">
              </el-input>
              行動值
              <el-input
                v-model.number="newProject.vgManagement.action"
                placeholder="104.2">
              </el-input>
            </el-col>
            <el-col :span="13" :offset="2">
              <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
              <el-button
                @click="toPath('SteelList')">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgTable">
                <el-table-column
                  prop="host"
                  label="VG ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="port"
                  label="Port"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="serial"
                  label="編碼"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="steel"
                  label="鋼材"
                  width="100">
                  <template slot-scope="scope">
                    <span class="clickable"
                      @click="toPath('ProjectEdit', { projectId: scope.row.id })">
                      {{ scope.row.id }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="傾度管 ( SO )">
          <el-form-item label="使用傾度管編號:32">
          </el-form-item>
          <br>
          <div class="demo-input-suffix">
            數量：
            <el-input
              v-model.number="newProject.soLocation.number"
              placeholder="5">
            </el-input>
            每孔深度 ( m )：
            <el-input
              v-model.number="newProject.soLocation.depth"
              placeholder="20.5">
            </el-input>
          </div>
          <br>

          <el-row :gutter="20">
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
            <el-col :span="14" :offset="2">
              <h2>位置編號<span>( SO - 流水號 )</span></h2>
              <h5>相同位置編碼 量測深度間隔 1 m</h5>
              <el-table class="vg-table">
                <el-table-column
                  prop="name"
                  label="編碼"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="深度"
                  width="200">
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

export default {
  name: 'CreateUser',

  mixins: [ToPathMixin, CalculateVGMixin],
  data() {
    return {
      needMoreGauge: '',
      floorIndex: 0,
      numOfFloor: 0,
      VGList: [],
      vgTable: [],
      fullVGsInfo: [],
      imageSelected: false,
      image: [{url: "haha"}],
      customerCompanyId: '',
      OPTList: [],
      USERList: [],
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
      VGItems: [],
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
        vgManagement: [{
          notice: 0,
          warning: 0,
          action: 0
        }],
        soManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
        vgIds: [],
        vgLocation: [
          {
            number: '',
            steelId: ''
          }
        ],
        soLocation: [
          {
            number: '',
            depth: 0
          }
        ]
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
      var customersOPT = allOPT.filter(user => user.company.id == this.customerCompanyId)
      var selfOPT = allOPT.filter(user => user.company.id == this.myCompany.id)
      return selfOPT.concat(customersOPT)
    },
    USERs() {
      var allUSER = this.$store.getters.USERs
      var customeersUSER = allUSER.filter(user => user.company.id == this.customerCompanyId)
      return customeersUSER
    },
    myCompany() {
      return this.$store.getters.me.company
    },
    VGs() {
      return this.$store.getters.vgs
    },
    preparedShowVG() {
      if (!this.isEnoughtVG) {
        this.needMoreGauge = "Add more gauge please"
        return false
      }
      this.needMoreGauge = ''
      var hasFloor = !!this.newProject.floor
      var hasNumOfFloor = !!this.numOfFloor
      var hasSelectedVG = (this.newProject.vgIds.length !== 0)
      return (hasFloor && hasNumOfFloor && hasSelectedVG)
    },
    isEnoughtVG() {
      var neededGauge = this.newProject.floor * this.numOfFloor
      var usableGauge = this.VGList.length * 14  // a host have 14 port
      return (usableGauge >= neededGauge)
    },
    getPagination() {
      return this.newProject.floor * 10
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
        vgManagement: [{
          notice: 0,
          warning: 0,
          action: 0
        }],
        soManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
        vgIds: [],
        vgLocation: [
          {
            number: '',
            steelId: ''
          }
        ],
        soLocation: [
          {
            number: '',
            depth: 0
          }
        ]
      }
    },
    cancel() {
      this.reset()
      this.toPath('ProjectSetting')
    },
    submit() {
      this.newProject.companyId = customerCompanyId
      this.$store.dispatch('createProject', this.newProject).then(() => {
        this.reset()
        this.toPath('ProjectSetting')
      })
    },

    updateSelectedOPTs(value) {
      var OPTList = []
      value.forEach(id => {
        var selectedOPT = this.OPTs.filter(opt => opt.id == id)
        OPTList = OPTList.concat(selectedOPT)
      });
      this.OPTList = OPTList
    },
    updateSelectedUSERs(value) {
      var USERList = []
      value.forEach(id => {
        var selectedUSER = this.USERs.filter(user => user.id == id)
        USERList = USERList.concat(selectedUSER)
      });
      this.USERList = USERList
    },
    uploadChange(file, fileList) {
      this.imageSelected = true
      this.image = file
    },
    getVGItems() {
      var floor = this.newProject.floor
      var vgList = this.newProject.vgIds
      this.fullVGsInfo = this.importVGItems(floor, this.numOfFloor, vgList)
      this.getVGTable()
    },
    currentFloor(selectedFloor) {
      this.floorIndex = selectedFloor - 1
      this.getVGTable()
    },
    updateSelectedVGs(value) {
      var VGList = []
      value.forEach(id => {
        var selectedVG = this.VGs.filter(vg => vg.id == id)
        VGList = VGList.concat(selectedVG)
      });
      this.VGList = VGList
    },
    getVGTable() {
      var start = this.floorIndex * this.numOfFloor
      var end =  (this.floorIndex + 1) * this.numOfFloor
      this.vgTable = this.fullVGsInfo.slice(start, end)
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

.el-upload-dragger, .el-upload--picture{
  width: 60vw;
  height: auto; 
}

.reselect {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
