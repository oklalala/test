<!-- @format -->

<template>
  <div class="createProject">
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="project"
      ref="project"
    >
      <h2>基本資料</h2>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="專案案號"
            prop="number"
            :rules="[
              {
                required: true,
                message: '請輸入專案案號',
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-input v-model="number" placeholder="請輸入專案號"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="專案狀態"
            prop="status"
            :rules="[
              {
                required: true,
                message: '請輸入專案狀態',
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-select
              v-model="status"
              placeholder="請選擇"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusOptions"
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
          <el-form-item
            label="專案名稱"
            prop="name"
            :rules="[
              {
                required: true,
                message: '請輸入專案名稱',
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-input v-model="name" placeholder="請輸入專案名稱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點" prop="address">
        <el-input
          v-model="address"
          placeholder="請輸入地址"
          style="width: 100%"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="companyId"
          placeholder="請選擇公司名稱"
          style="width: 100%"
        >
          <el-option
            v-for="company in companiesOptions"
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
              v-model="optsInProject"
              placeholder="請選擇 OPT"
              multiple
              value-key="id"
              style="width: 100%"
            >
              <el-option
                v-for="opt in optsOptions"
                :key="opt.id"
                :label="opt.name"
                :value="opt"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="USER">
          <el-form-item>
            <el-select
              v-model="usersInProject"
              placeholder="請選擇 USER"
              value-key="id"
              multiple
              style="width: 100%"
            >
              <el-option
                v-for="user in usersOptions"
                :key="user.id"
                :label="user.name"
                :value="user"
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
        list-type="picture"
        :action="uploadURL"
        :before-upload="verificationImgSize"
        :on-change="uploadImg"
        :auto-upload="false"
        :limit="1"
      >
        <img :src="sitePlan" alt="" v-if="sitePlan" />
        <i class="el-icon-upload" v-if="!sitePlan"></i>
        <div class="el-upload__text" v-if="!sitePlan">
          將文件拖到此處，或<em>點擊上傳</em>
        </div>
        <div slot="tip" class="el-upload__tip">上傳文件不能超過 2MB</div>
        <el-button
          class="reselect"
          size="small"
          type="primary"
          v-if="!!sitePlan"
          >另選圖片</el-button
        >
      </el-upload>

      <h2>監控設定</h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="軸力計 (VG)">
          <el-form-item label="使用軸力計編號(可複選)" required>
            <el-select
              v-model="vgItemIdsInProject"
              value-key="id"
              multiple
              style="width: 100%"
            >
              <el-option
                v-for="vgItem in vgsOptions"
                :key="vgItem.id"
                :label="vgItem.number"
                :value="vgItem.id"
              >
              </el-option>
            </el-select>
            <div v-if="isNeedMoreVg" class="need-more-vg">請增加軸力計</div>
          </el-form-item>
          <el-form-item label="支撐階數" required>
            <el-input-number
              v-model="totalFloor"
              controls-position="right"
              :step="1"
              :precision="0"
              :min="0">
            </el-input-number>
          </el-form-item>
          <el-form-item label="每層數量" required>
            <el-input-number
              v-model="totalVgPreFloor"
              controls-position="right"
              :step="1"
              :precision="0"
              :min="0">
            </el-input-number>
          </el-form-item>

          <el-button @click.native="configVgCode()" :disabled="isConfigVgCode"
            >產生軸力計編碼</el-button
          >
          <div class="block" v-if="totalVgLocation">
            <span class="demonstration">切換支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              :page-size="totalVgLocationPreFloor"
              :total="totalVgLocation"
              @current-change="onChangeFloor"
            >
            </el-pagination>
          </div>

          <el-row :gutter="20" v-if="totalVgLocation">
            <el-col :span="5">
              <h2>管理值<span>單位：噸</span></h2>
              <el-form-item
                :key="key"
                v-for="(value, key) in vgManagementValueOfCurrFloor"
                :label="`${managementLabel[key]}值`"
                :prop="key"
                :rules="[
                  {
                    required: true,
                    validator: validateVgManagementValue,
                    message: `請檢查${managementLabel[key]}值`,
                    label: key,
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input-number
                  size="small"
                  controls-position="right"
                  :step="1"
                  :precision="1"
                  :min="0"
                  :value="vgManagementValueOfCurrFloor[key]"
                  @input="updateVgManagementValue(key, $event)"
                >
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <h2>位置編碼<span> (VG-層數-流水號)</span></h2>
              <el-button @click="toPath('SteelList')">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgLocationCurrFloor">
                <el-table-column prop="vgNumber" label="軸力計" width="120">
                </el-table-column>
                <el-table-column prop="port" label="Port" width="80">
                </el-table-column>
                <el-table-column prop="number" label="配置編碼" width="100">
                </el-table-column>
                <el-table-column prop="steelName" label="使用鋼材" width="100">
                  <template slot-scope="scope">
                    <el-select
                      :value="scope.row.steelId"
                      @input="onChangeSteel($event, scope.row)"
                      placeholder="請選擇鋼材"
                    >
                      <el-option
                        v-for="steel in steelsOptions"
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

        <el-tab-pane label="傾度管 (SO)">
          <el-form-item label="數量" required>
            <el-input-number
              v-model="totalEstimatedSoLocation"
              controls-position="right"
              :step="1"
              :precision="0"
              :min="0"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="每孔深度 (m)" required>
            <el-input-number
              v-model="defaultDepth"
              controls-position="right"
              :step="1"
              :precision="2"
              :min="0"
            >
            </el-input-number>
          </el-form-item>
          <el-button @click.native="configSoCode()" :disabled="isConfigSoCode"
            >產生傾度管編碼</el-button
          >
          <el-row :gutter="20" v-if="totalSoLocation">
            <el-col :span="8">
              <h2>管理值<span>單位：cm</span></h2>
              <el-form-item
                :key="key"
                v-for="(value, key) in soManagementValue"
                :label="`${managementLabel[key]}值`"
                :prop="key"
                :rules="[
                  {
                    required: true,
                    message: `請檢查${managementLabel[key]}值`,
                    validator: validateSoManagementValue,
                    label: key,
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input-number
                  size="small"
                  controls-position="right"
                  :step="1"
                  :precision="2"
                  :min="0"
                  :value="soManagementValue[key]"
                  @input="updateSoManagementValue(key, $event)"
                >
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <h2>位置編號<span>(SO-流水號)</span></h2>
              <h5>相同位置編碼 量測深度間隔 1 m</h5>
              <el-table class="so-table" :data="soLocation">
                <el-table-column prop="number" label="配置編碼" width="200">
                </el-table-column>
                <el-table-column prop="depth" label="量測深度" width="200">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.depth"
                      controls-position="right"
                      :step="1"
                      :precision="2"
                      :min="0"
                    >
                    </el-input-number>
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
            <el-button type="primary" style="width: 100%" @click="onSubmit" :disabled="!this.totalSoLocation || !this.totalVgLocation">
              確定送出
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%" @click="toPath('ProjectSetting')">
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
  name: 'ProjectCreate',
  mixins: [ToPathMixin, CalculateVGMixin],
  data() {
    return {
      MAX_PORT_FOR_VG: 14,
      managementLabel: {
        notice: '注意',
        warning: '警戒',
        action: '行動'
      },
      //------------------------,
      soQt: 0,
      soDepth: 0,
      newProject: {
        // number: '', // CNT-16Q3
        // status: 'in-progress', // end or in-progress
        // name: '', // 測試專案
        // address: '', // 三路
        // companyId: '',
        // sitePlan: '', // 上傳的圖片
        // OPT: [], // {id:..} 公司或客戶的 operator
        // USER: [], // {id:..} 客戶的使用者
        // floor: 1, //. vg階數
        // vgManagement: [],
        // soManagement: {
        //   notice: '',
        //   warning: '',
        //   action: ''
        // },
        // vgIds: [],
        // vgLocation: [],
        // soLocation: []
      }
    }
  },
  computed: {
    project() {
      return this.$store.getters.project
    },
    number: {
      get() {
        return this.$store.getters.project.number
      },
      set(value) {
        this.$store.commit('project', {
          property: 'number',
          value
        })
      }
    },
    statusOptions() {
      return this.$store.getters.statusOptions
    },
    status: {
      get() {
        return this.$store.getters.project.status
      },
      set(value) {
        this.$store.commit('project', {
          property: 'status',
          value
        })
      }
    },
    name: {
      get() {
        return this.$store.getters.project.name
      },
      set(value) {
        this.$store.commit('project', {
          property: 'name',
          value
        })
      }
    },
    address: {
      get() {
        return this.$store.getters.project.address
      },
      set(value) {
        this.$store.commit('project', {
          property: 'address',
          value
        })
      }
    },
    companiesOptions() {
      return this.$store.getters.notMyCompanies
    },
    companyId: {
      get() {
        return this.$store.getters.project.companyId
      },
      set(value) {
        this.$store.commit('project', {
          property: 'companyId',
          value
        })
      }
    },
    optsOptions() {
      return [
        ...this.$store.getters.optsOfCustomerCompany,
        ...this.$store.getters.optsOfMyCompany
      ]
    },
    optsInProject: {
      get() {
        return this.$store.getters.optsInProject
      },
      set(value) {
        this.$store.commit('project', {
          property: 'OPT',
          value
        })
      }
    },
    usersOptions() {
      return [
        ...this.$store.getters.usersOfCustomerCompany,
        ...this.$store.getters.usersOfMyCompany
      ]
    },
    usersInProject: {
      get() {
        return this.$store.getters.usersInProject
      },
      set(value) {
        this.$store.commit('project', {
          property: 'USER',
          value
        })
      }
    },
    sitePlan() {
      return this.$store.getters.sitePlan
    },
    uploadURL() {
      return `${process.env.VUE_APP_API_URL}/uploads`
    },
    vgItemIdsInProject: {
      get() {
        return this.$store.getters.vgItemIdsInProject
      },
      set(value) {
        this.$store.commit('project', {
          property: 'vgIds',
          value
        })
      }
    },
    vgsOptions() {
      return this.$store.getters.vgsFree
    },
    totalFloor: {
      get() {
        return this.$store.getters.totalFloor
      },
      set(value) {
        this.$store.commit('project', {
          property: 'floor',
          value
        })
      }
    },
    isNeedMoreVg() {
      var needed = this.totalFloor * this.totalVgPreFloor
      var usable = this.vgItemIdsInProject.length * this.MAX_PORT_FOR_VG
      return usable < needed
    },
    isConfigVgCode() {
      return (
        this.isNeedMoreVg ||
        !this.totalFloor ||
        !this.totalVgPreFloor ||
        !this.vgItemIdsInProject.length
      )
    },
    steelsOptions() {
      return this.$store.getters.steels
    },
    totalVgLocation() {
      return this.$store.getters.totalVgLocation
    },
    vgManagementValueOfCurrFloor() {
      return this.$store.getters.vgManagementValueOfCurrFloor
    },
    vgLocationCurrFloor() {
      return this.$store.getters.vgLocationCurrFloor
    },
    totalSoLocation() {
      return this.$store.getters.totalSoLocation
    },
    defaultDepth: {
      get() {
        return this.$store.getters.defaultDepth
      },
      set(value) {
        this.$store.commit('defaultDepth', value)
      }
    },
    totalVgLocationPreFloor() {
      return this.$store.getters.totalVgLocationPreFloor
    },
    totalVgPreFloor: {
      get() {
        return this.$store.getters.totalVgPreFloor
      },
      set(value) {
        this.$store.commit('totalVgPreFloor', value)
      }
    },
    isConfigSoCode() {
      return !this.totalEstimatedSoLocation || !this.defaultDepth
    },
    soManagementValue() {
      return this.$store.getters.soManagementValue
    },
    soLocation() {
      return this.$store.getters.soLocation
    },
    totalEstimatedSoLocation: {
      get() {
        return this.$store.getters.totalEstimatedSoLocation
      },
      set(value) {
        this.$store.commit('totalEstimatedSoLocation', value)
      }
    }
  },
  methods: {
    getSOItems() {
      this.project.soLocation = this.initSOLocation(this.soQt, this.soDepth)
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
    uploadImg(file) {
      this.$store.dispatch('uploadConfigImage', file.raw)
    },
    verificationImgSize(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上傳圖片大小不能超過 2MB!')
      }
      return isLt2M
    },
    configVgCode() {
      const totalFloor = this.totalFloor
      const totalVgPreFloor = this.totalVgPreFloor
      this.$store.dispatch('configVgCode', {
        totalFloor,
        totalVgPreFloor
      })
    },
    configSoCode() {
      const depth = this.defaultDepth
      const total_location = this.totalEstimatedSoLocation
      this.$store.dispatch('configSoCode', {
        depth,
        total_location
      })
    },
    updateVgManagementValue(label, value) {
      this.$store.commit('vgManagementValue', {
        value,
        label
      })
    },
    onChangeSteel(selectedSteelId, location) {
      const selectedSteel = this.steelsOptions
        .filter(item => item.id === selectedSteelId)
        .shift()
      this.$store.commit('steelOfVgLocation', {
        location,
        selectedSteel
      })
    },
    onChangeFloor(selectedFloor) {
      this.$store.commit('currentFloor', selectedFloor)
    },
    validateSoManagementValue(rule, value, next) {
      value = this.soManagementValue[rule.label]
      if (rule.required) !value && next(new Error(rule.message))
      next()
    },
    validateVgManagementValue(rule, value, next) {
      value = this.vgManagementValueOfCurrFloor[rule.label]
      if (rule.required) !value && next(new Error(rule.message))
      next()
    },
    updateSoManagementValue(label, value) {
      this.$store.commit('soManagementValue', {
        value,
        label
      })
    },
    onSubmit() {
      console.log(this.$refs)
      this.$refs.project.validate(isValidSuccess => {
        if (isValidSuccess) {
          this.submitProject()
        } else {
          this.$message.error(`請重新檢查必填欄位`)
          return false
        }
      })
    },
    submitProject() {
      this.$store
        .dispatch('createProject')
        .then(() => {
          this.$message({
            message: `成功新增 ${this.project.name}`,
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

.el-upload--picture,
.el-upload-dragger {
  width: 100%;
  height: auto;
}

.reselect {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.need-more-vg {
  color: red;
  font-size: 0.8em;
  position: absolute;
  right: 0;
  top: 100%;
  line-height: 1.5em;
}

.el-input-number {
  width: 100%;
}
</style>
