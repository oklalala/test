<!-- @format -->

<template>
  <div class="createProject">
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newProject"
      ref="newProject"
      :rules="rules"
    >
      <h2>基本資料</h2>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="專案案號" prop="number">
            <el-input
              v-model="newProject.number"
              placeholder="請輸入專案號"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="專案狀態" prop="status">
            <el-select
              v-model="newProject.status"
              placeholder="請選擇"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusList"
                :key="item.name"
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
          <el-form-item label="專案名稱" prop="name">
            <el-input
              v-model="newProject.name"
              placeholder="阡福町商業大樓"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點" prop="address">
        <el-input
          v-model="newProject.address"
          placeholder="請輸入地址"
          style="width: 100%"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="selectedCompany"
          @change="updateSelectedCompany"
          placeholder="請選擇公司名稱"
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
              v-model="selectedOPTs"
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
          <el-form-item>
            <el-select
              v-model="selectedUSERs"
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
        :on-change="getImage"
        list-type="picture"
        :before-upload="beforeImgUpload"
        :auto-upload="true"
      >
        <img :src="image" alt="" v-if="imageSelected" />
        <i class="el-icon-upload" v-if="!imageSelected"></i>
        <div class="el-upload__text" v-if="!imageSelected">
          將文件拖到此處，或<em>點擊上傳</em>
        </div>
        <div slot="tip" class="el-upload__tip">上傳文件不能超過2Mb</div>
        <el-button
          class="reselect"
          size="small"
          type="primary"
          v-if="imageSelected"
          >另選圖片</el-button
        >
      </el-upload>

      <h2>監控設定</h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="軸力計 ( VG )">
          <el-form-item label="使用軸力計編號" prop="vgIds">
            <el-select
              v-model="newProject.vgIds"
              placeholder="可複選"
              multiple
              @change="updateSelectedVGs"
              style="width: 100%"
            >
              <el-option
                v-for="vg in VGs"
                :disabled="disableVG(vg.projectName)"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
            <h3 v-if="!isEnoughtVG">請增加軸力計</h3>
          </el-form-item>
          <el-form-item label="支撐階數：" prop="floor">
            <el-input
              @keyup.native="fullVGsInfo = []"
              v-model.number="newProject.floor"
              placeholder="3"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="每層數量：" required>
            <el-input
              @keyup.native="fullVGsInfo = []"
              v-model.number="numOfFloor"
              placeholder="5"
            >
            </el-input>
          </el-form-item>
          <br />
          <el-button @click.native="getVGItems()" :disabled="!preparedShowVG"
            >請產生軸力計編碼</el-button
          >
          <br />
          <br />

          <div class="block" v-if="!!fullVGsInfo.length">
            <span class="demonstration">請選擇支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentFloor"
              :total="getPagination"
            >
            </el-pagination>
          </div>

          <el-row :gutter="20" v-if="!!fullVGsInfo.length">
            <el-col :span="5">
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
            <el-col :span="19">
              <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
              <el-button @click="toPath('SteelList')">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgTable">
                <el-table-column prop="host.number" label="VG" width="120">
                </el-table-column>
                <el-table-column prop="port" label="Port" width="80">
                </el-table-column>
                <el-table-column prop="serial" label="編碼" width="100">
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
          <el-form-item label="數量：" prop="vgAction">
            <el-input
              @keyup.native="newProject.soLocation = []"
              v-model.number="soQt"
              placeholder="5"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="每孔深度 ( m )：" prop="vgAction">
            <el-input
              @keyup.native="newProject.soLocation = []"
              v-model.number="soDepth"
              placeholder="20.5"
            >
            </el-input>
          </el-form-item>
          <br />
          <el-button @click.native="getSOItems()" :disabled="!preparedShowSO"
            >產生傾度管編碼</el-button
          >
          <br />

          <el-row :gutter="20" v-if="!!newProject.soLocation.length">
            <el-col :span="8">
              <h2>管理值<span>單位：cm</span></h2>
              <el-form-item label="注意值" prop="soManagement.notice">
                <el-input
                  :controls="false"
                  v-model="newProject.soManagement.notice"
                  placeholder="1.68"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="警戒值" prop="soManagement.warning">
                <el-input
                  :controls="false"
                  v-model="newProject.soManagement.warning"
                  placeholder="2.88"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="行動值" prop="soManagement.action">
                <el-input
                  :controls="false"
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
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.depth"> </el-input>
                  </template>
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
            <el-button
              type="primary"
              style="width: 100%"
              @click="submit('newProject')"
              :disabled="this.fullVGsInfo.length === 0"
            >
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
import API from '@/utils/API'

export default {
  name: 'ProjectCreate',
  mixins: [ToPathMixin, CalculateVGMixin],
  data() {
    return {
      soQt: 0,
      soDepth: 0,
      floorIndex: 0, // used in array
      numOfFloor: 0, //
      VGList: [], // get usable VGs
      vgTable: [], // every floor VGs
      fullVGsInfo: [], // from calculateVG.js
      OPTList: [], // custom and self OPTs
      USERList: [], // custom USERs
      selectedCompany: '',
      selectedOPTs: [],
      selectedUSERs: [],
      image: '',
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
        status: 'in-progress', // end or in-progress
        name: '', // 測試專案
        address: '', // 三路
        companyId: '',
        sitePlan: '', // 上傳的圖片
        OPT: [], // {id:..} 公司或客戶的 operator
        USER: [], // {id:..} 客戶的使用者
        floor: 1, //. vg階數
        vgManagement: [],
        soManagement: {
          notice: '',
          warning: '',
          action: ''
        },
        vgIds: [],
        vgLocation: [],
        soLocation: []
      },
      rules: {
        number: [
          {
            required: true,
            message: '請輸入編號',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '長度在 3 到 12 個字元',
            trigger: ['blur', 'change']
          }
        ],
        name: {
          required: true,
          message: '請輸入專案名稱',
          trigger: ['blur', 'change']
        },
        vgIds: {
          required: true,
          message: '請選擇軸力計',
          trigger: ['blur', 'change']
        },
        floor: {
          required: true,
          message: '請選擇層數',
          trigger: ['blur', 'change']
        },
        'soManagement.notice': [
          {
            required: true,
            message: '請輸入注意值',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\d(\.\d{0,2})?$/,
            message: '數字格式為 x.xx',
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
            pattern: /^\d(\.\d{0,2})?$/,
            message: '數字格式為 x.xx',
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
            pattern: /^\d(\.\d{0,2})?$/,
            message: '數字格式為 x.xx',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  watch: {
    selectedCompany(company) {
      var allOPT = this.$store.getters.OPTs
      var customersOPT = allOPT.filter(user => user.company.id == company)
      var selfOPT = allOPT.filter(user => user.company.id == this.myCompany.id)
      this.OPTList = selfOPT.concat(customersOPT)

      var allUSER = this.$store.getters.USERs
      var customersUSER = allUSER.filter(user => user.company.id == company)
      this.USERList = customersUSER
    }
  },
  computed: {
    companiesList() {
      var allCompany = this.$store.getters.companies
      return allCompany.filter(company => company.id != this.myCompany.id)
    },
    myCompany() {
      return this.$store.getters.myCompany
    },
    uploadURL() {
      return `${process.env.VUE_APP_API_URL}/uploads`
    },
    VGs() {
      return this.$store.getters.vgs
    },
    isEnoughtVG() {
      var needed = this.newProject.floor * this.numOfFloor
      var usable = this.VGList.length * 14 // a host have 14 port
      return usable >= needed
    },
    preparedShowVG() {
      var hasFloor = !!this.newProject.floor
      var hasNumOfFloor = !!this.numOfFloor
      var hasSelectedVG = this.newProject.vgIds.length !== 0
      var required = hasFloor && hasNumOfFloor && hasSelectedVG
      return required && this.isEnoughtVG
    },
    getPagination() {
      return this.newProject.floor * 10
    },
    Steels() {
      return this.$store.getters.steels
    },
    preparedShowSO() {
      return !!this.soQt && !!this.soDepth
    },
    imageSelected() {
      return this.newProject.sitePlan
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
        floor: 0, //. vg階數
        vgManagement: [
          {
            notice: 0,
            warning: 0,
            action: 0
          }
        ],
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
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createProject()
        } else {
          this.$message.error(`請重新檢查必填欄位`)
          return false
        }
      })
    },
    createProject() {
      this.strToNumArrayObject(this.newProject.vgManagement)
      this.strToNumObject(this.newProject.soManagement)
      this.initVGLocation()
      this.mergeVGLocation(this.newProject.vgLocation, this.fullVGsInfo)
      this.$store
        .dispatch('createProject', this.newProject)
        .then(() => {
          this.reset()
          this.$message({
            message: `成功新增 ${this.newProject.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('ProjectSetting')
        })
        .catch(e => {
          if (e.response.data.result === 'number must be unique') {
            this.$message.error(`請重新檢查 案號重複`)
          } else {
            this.$message.error(`請重新檢查 ${e.response.data.result}`)
          }
        })
    },
    updateSelectedCompany(company_id) {
      this.newProject.companyId = company_id
      this.selectedOPTs = []
      this.selectedUSERs = []
    },
    updateSelectedOPTs(opts_id) {
      this.newProject.OPT = opts_id
    },
    updateSelectedUSERs(users_id) {
      this.newProject.USER = users_id
    },
    getImage(file) {
      API.uploadImg(file.raw).then(res => {
        this.newProject.sitePlan = res.data.url
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
    getVGItems() {
      var floor = this.newProject.floor
      this.fullVGsInfo = this.importVGItems(floor, this.numOfFloor, this.VGList)
      this.initVGManagement()
      this.getVGTable(0)
    },
    currentFloor(selectedFloor) {
      this.floorIndex = selectedFloor - 1
      this.getVGTable(this.floorIndex)
    },
    updateSelectedVGs(value) {
      this.fullVGsInfo = []
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
      })
    },
    initVGLocation() {
      var length = this.newProject.floor * this.numOfFloor
      var vgLocation = []
      for (var i = 0; i < length; i++) {
        vgLocation.push({ number: '', steelId: '' })
      }
      this.newProject.vgLocation = vgLocation
    },
    disableVG(project) {
      return project && project !== '使用的專案被刪除'
    }
  }
}
</script>

<style lang="scss" scoped>
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

h3 {
  color: red;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 20px;
}
</style>
