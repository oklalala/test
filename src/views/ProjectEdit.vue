<!-- @format -->

<template>
  <div class="ProjectEdit">
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newProject"
      :rules="rules"
    >
      <h2>基本資料</h2>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="專案案號">
            <el-input v-model="newProject.number" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="專案狀態">
            <el-select
              v-model="selectedStatus"
              @change="updateSelectedStatus"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col>
          <el-form-item label="專案名稱" required>
            <el-input v-model="newProject.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點">
        <el-input
          v-model="newProject.address"
          placeholder="大武街 34 號"
          style="width: 100%"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="selectedCompany"
          @change="updateSelectedCompany"
          placeholder="雨宮營造"
          style="width: 100%"
        >
          <el-option
            v-for="company in companiesList"
            :key="company.id"
            :label="company.name"
            :value="company.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <h2>參與人員</h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="OPT">
          <el-form-item>
            <el-select
              v-model="selectedOPT"
              placeholder="請選擇 OPT"
              multiple
              @change="updateSelectedOPTs"
              style="width: 100%"
            >
              <el-option
                v-for="opt in OPTList"
                :key="opt.id"
                :label="opt.name"
                :value="opt.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="USER">
          {{selectedUSER}}
          <el-form-item label="客戶公司名稱">
            <el-select
              v-model="selectedUSER"
              placeholder="請選擇 USER"
              multiple
              @change="updateSelectedUSERs"
              style="width: 100%"
            >
              <el-option
                v-for="user in USERList"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <h1>配置圖</h1>
      <el-upload
        class="upload-demo"
        drag
        :action="uploadURL"
        :on-change="getImage"
        list-type="picture"
        :before-upload="beforeImgUpload"
        :auto-upload="true"
      >
        <img :src="image" v-if="!!newProject.sitePlan" />
        <i class="el-icon-upload" v-if="!newProject.sitePlan"></i>
        <div class="el-upload__text" v-if="!newProject.sitePlan">
          將文件拖到此處，或<em>點擊上傳</em>
        </div>
        <div slot="tip" class="el-upload__tip">上傳文件不能超過2Mb</div>
        <el-button
          class="reselect"
          size="small"
          type="primary"
          v-if="!!newProject.sitePlan"
          >另選圖片</el-button
        >
      </el-upload>

      <h2>監控設定</h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="軸力計 ( VG )">
          <el-form-item label="使用軸力計編號">
            <el-select
              v-model="newProject.vgIds"
              multiple
              disabled
              @change="updateSelectedVGs"
              style="width: 100%"
            >
              <el-option
                v-for="vg in VGs"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="換軸力計">
            <el-select v-model="removedVG" style="width: 100%">
              <el-option
                v-for="vg in removeVGList"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="換成">
            <el-select v-model="addedVG" style="width: 100%">
              <el-option
                v-for="vg in addedVGList"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button @click="switchVG(removedVG, addedVG)" v-show="vgVariable"
            >確認轉換</el-button
          >
          <div class="block" v-if="!!newProject.vgLocation.length">
            <span class="demonstration">請選擇支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentFloor"
              :total="getPagination"
            >
            </el-pagination>
          </div>

          <el-row :gutter="20" v-if="!!newProject.vgLocation.length">
            <el-col :md="6" :sm="8" :span="24">
              <h2>管理值<span>單位：噸</span></h2>
              <el-form-item
                label="注意值"
                :prop="'vgManagement[' + this.floorIndex + '].notice'"
                :rules="[
                  {
                    required: true,
                    message: '請檢查注意值',
                    trigger: ['blur', 'change']
                  },
                  {
                    pattern: /^\d+(\.\d{0,1})?$/,
                    message: '小數點下最多一位 0.1',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  size="mini"
                  v-model="newProject.vgManagement[floorIndex].notice"
                  placeholder="68.3"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="警戒值"
                :prop="'vgManagement[' + this.floorIndex + '].warning'"
                :rules="[
                  {
                    required: true,
                    message: '請檢查警戒值',
                    trigger: ['blur', 'change']
                  },
                  {
                    pattern: /^\d+(\.\d{0,1})?$/,
                    message: '小數點下最多一位 0.1',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  size="mini"
                  v-model="newProject.vgManagement[floorIndex].warning"
                  placeholder="79.6"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="行動值"
                :prop="'vgManagement[' + this.floorIndex + '].action'"
                :rules="[
                  {
                    required: true,
                    message: '請檢查行動值',
                    trigger: ['blur', 'change']
                  },
                  {
                    pattern: /^\d+(\.\d{0,1})?$/,
                    message: '小數點下最多一位 0.1',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  size="mini"
                  v-model="newProject.vgManagement[floorIndex].action"
                  placeholder="104.2"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="16" :sm="16" :span="24">
              <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
              <el-button class="maintainSteel" @click="saveCurrentAndGo">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgTable">
                <el-table-column prop="vgNumber" label="VG" width="120">
                </el-table-column>
                <el-table-column prop="port" label="Port" width="100">
                </el-table-column>
                <el-table-column prop="number" label="編碼" width="100">
                </el-table-column>
                <el-table-column prop="steelId" label="鋼材" width="100">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.steelId"
                      placeholder="請選擇鋼材"
                    >
                      <el-option
                        v-for="steel in Steels"
                        :key="steel.id"
                        :label="steel.name"
                        :value="steel.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="傾度管 ( SO )">
          <el-row :gutter="20" v-if="!!newProject.soLocation.length">
            <el-col :span="8">
              <h2>管理值<span>單位：cm</span></h2>
              <el-form-item label="注意值" prop="soManagement.notice">
                <el-input
                  size="mini"
                  v-model="newProject.soManagement.notice"
                  placeholder="1.68"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="警戒值" prop="soManagement.warning">
                <el-input
                  size="mini"
                  v-model="newProject.soManagement.warning"
                  placeholder="2.88"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="行動值" prop="soManagement.action">
                <el-input
                  size="mini"
                  v-model="newProject.soManagement.action"
                  placeholder="3.77"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <h2>位置編號<span>( SO - 流水號 )</span></h2>
              <h5>相同位置編碼 量測深度間隔 1 m</h5>
              <el-table class="so-table" :data="newProject.soLocation">
                <el-table-column prop="number" label="編碼" width="200">
                </el-table-column>
                <el-table-column prop="depth" label="深度" width="200">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <br />

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" style="width: 100%" @click="edit">
              確定送出
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%" @click="cancel">
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
  name: 'ProjectEdit',

  mixins: [ToPathMixin, CalculateVGMixin],
  created() {
    this.image = `${process.env.VUE_APP_API_URL}/${this.newProject.sitePlan}`
  },
  data() {
    return {
      removedVG: '',
      addedVG: '',
      floorIndex: 0, // used in array
      VGList: [], // get usable VGs
      vgTable: [], // every floor VGs
      image: '', // preview url in blob
      OPTList: [],
      USERList: [],
      selectedOPT: [], // custom and self OPTs
      selectedUSER: [], // custom USERs
      selectedCompany: '',
      selectedStatus: '',
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
      rules: {
        'soManagement.notice': [
          {
            required: true,
            message: '請輸入注意值',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\d+(\.\d{0,2})?$/,
            message: '小數點下最多兩位 0.01',
            trigger: ['blur', 'change']
          }
        ],
        'soManagement.warning': [
          {
            required: true,
            message: '請輸入警戒值',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\d+(\.\d{0,2})?$/,
            message: '小數點下最多兩位 0.01',
            trigger: ['blur', 'change']
          }
        ],
        'soManagement.action': [
          {
            required: true,
            message: '請輸入行動值',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\d+(\.\d{0,2})?$/,
            message: '小數點下最多兩位 0.01',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  watch: {
    selectedCompany(newCompanyId) {
      var allOPT = this.$store.getters.OPTs
      var customersOPT = allOPT.filter(OPT => OPT.company.id == newCompanyId)
      var selfOPT = allOPT.filter(OPT => OPT.company.id == this.myCompany.id)
      this.OPTList = selfOPT.concat(customersOPT)

      var allUSER = this.$store.getters.USERs
      var customersUSER = allUSER.filter(
        user => user.company.id == newCompanyId
      )
      this.USERList = customersUSER
    }
  },
  computed: {
    project() {
      return this.$store.getters.currentProject
    },
    companiesList() {
      var allCompany = this.$store.getters.companies
      return allCompany.filter(company => company.id != this.myCompany.id)
    },
    myCompany() {
      return this.$store.getters.me.company
    },
    uploadURL() {
      return `${process.env.VUE_APP_API_URL}/uploads`
    },
    VGs() {
      return this.$store.getters.vgs
    },
    removeVGList() {
      var list = []
      this.newProject.vgIds.forEach(id => {
        var selected = this.VGs.filter(vg => vg.id === id)
        list = list.concat(selected)
      })
      return list
    },
    addedVGList() {
      return this.VGs.filter(vg => !this.removeVGList.includes(vg))
    },
    vgVariable() {
      return !!this.removedVG && !!this.addedVG
    },
    getPagination() {
      return this.newProject.floor * 10
    },
    Steels() {
      return this.$store.getters.steels
    },
    numOfFloor() {
      return this.project.vgLocation.length / this.project.floor
    },
    fullVGsInfo() {
      return this.project.vgLocation
    },
    newProject() {
      this.getVGTable(0)
      this.setSelectedBox()
      return {
        number: this.project.number, // CNT-16Q3
        status: this.project.status, // end or in-progress
        name: this.project.name, // 測試專案
        address: this.project.address, // 北門路二段
        companyId: this.project.companyId,
        sitePlan: this.project.sitePlan, // 上傳的圖片
        OPT: this.project.OPT,
        USER: this.project.USER,
        floor: this.project.floor, //. vg階數
        vgManagement: this.project.vgManagement,
        soManagement: this.project.soManagement,
        vgIds: this.project.vgIds,
        vgLocation: this.project.vgLocation,
        soLocation: this.project.soLocation
      }
    }
  },
  methods: {
    cancel() {
      this.toPath('ProjectSetting')
    },
    edit() {
      delete this.newProject.floor
      this.newProject.vgLocation.map(vg => {
        delete vg.vgId
        delete vg.vgNumber
        delete vg.steelName
      })
      this.strToNumArrayObject(this.newProject.vgManagement)
      this.strToNumObject(this.newProject.soManagement)
      this.newProject.OPT = this.selectedOPT
      this.newProject.USER = this.selectedUSER
      this.$store
        .dispatch('updateProject', {
          projectId: this.$route.params.projectId,
          payload: this.newProject
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.newProject.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('ProjectSetting')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    strToNumArrayObject(array) {
      array.forEach(object => {
        this.strToNumObject(object)
      })
    },
    strToNumObject(object) {
      for (let key in object) {
        object[key] = +object[key]
      }
    },
    updateSelectedStatus(value) {
      this.newProject.status = value
    },
    updateSelectedOPTs(value) {
      var OPTList = []
      value.forEach(id => {
        var selectedOPT = this.OPTs.filter(opt => opt.id == id)
        OPTList = OPTList.concat(selectedOPT)
      })
      this.newProject.OPT = OPTList
    },
    updateSelectedUSERs(value) {
      var USERList = []
      value.forEach(id => {
        var selectedUSER = this.USERs.filter(user => user.id == id)
        USERList = USERList.concat(selectedUSER)
      })
      this.newProject.USER = USERList
    },
    updateSelectedCompany(value) {
      this.newProject.companyId = value
      this.selectedUSER = []
      this.selectedOPT = []
      this.newProject.OPT = []
      this.newProject.USER = []
    },
    updateSelectedVGs(value) {
      var VGList = []
      value.forEach(id => {
        var selectedVG = this.VGs.filter(vg => vg.id == id)
        VGList = VGList.concat(selectedVG)
      })
      this.VGList = VGList
    },
    getImage(file) {
      this.$store.dispatch('uploadConfigImage', file.raw).then(() => {
        this.image = `${process.env.VUE_APP_API_URL}/${
          this.newProject.sitePlan
        }`
      })
    },
    beforeImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上傳圖片大小不能超過 2MB!')
      }
      return isLt2M
    },
    switchVG(removedVG, addedVG) {
      var index = this.newProject.vgIds.indexOf(removedVG)
      this.newProject.vgIds.splice(index, 1, addedVG)
      this.removedVG = ''
      this.addedVG = ''
    },
    currentFloor(selectedFloor) {
      this.floorIndex = selectedFloor - 1
      this.getVGTable(this.floorIndex)
    },
    getVGTable(floorIndex) {
      var start = floorIndex * this.numOfFloor
      var end = (floorIndex + 1) * this.numOfFloor
      this.vgTable = this.fullVGsInfo.slice(start, end)
    },
    saveCurrentAndGo() {
      this.$store.dispatch('updateCurrentProject', this.newProject)
      this.toPath('SteelList')
    },
    setSelectedBox() {
      this.selectedOPT = this.project.OPT.map(opt => opt.id)
      this.selectedUSER = this.project.USER.map(user => user.id)
      this.selectedCompany = this.project.companyId
      this.selectedStatus = this.project.status
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
  width: 100%;
  height: auto;
}

.reselect {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.maintainSteel {
  float: right;
}
</style>
