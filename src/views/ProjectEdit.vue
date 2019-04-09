<!-- @format -->

<template>
  <div class="ProjectEdit">
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="project"
      ref="project"
    >
      <h2>基本資料</h2>
      <el-row :gutter="20">
        <el-col :sm="12" :xs="24">
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
            <el-input v-model="number" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
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
            <el-select v-model="status" style="width: 100%">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

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

      <el-form-item label="地點">
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
      <el-form-item>
        <h2>參與人員</h2>
        <el-tabs type="border-card" stretch>
          <el-tab-pane label="OPT">
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
          </el-tab-pane>
          <el-tab-pane label="USER">
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
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <h2>配置圖</h2>
        <el-upload
          class="upload-image-area"
          drag
          list-type="picture"
          :action="uploadURL"
          :before-upload="verificationImgSize"
          :on-change="uploadImg"
          :auto-upload="false"
          :file-list="[]"
          :limit="1"
        >
          <img :src="sitePlan" v-if="sitePlan" />
          <i class="el-icon-upload" v-if="!sitePlan"></i>
          <div class="el-upload__text" v-if="!sitePlan">
            點一下<em>上傳檔案</em>
          </div>
          <div slot="tip" class="el-upload__tip">上傳文件不能超過 2MB</div>
          <el-button
            class="re-select-image"
            size="small"
            type="primary"
            v-if="sitePlan"
            >另選圖片</el-button
          >
        </el-upload>
      </el-form-item>

      <h2>監控設定</h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="軸力計 (VG)">
          <el-form-item
            label="使用軸力計編號(可複選)"
            prop="vgIds"
            :rules="[
              {
                required: true,
                message: '請選擇軸力計',
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-select
              v-model="vgItemIdsInProject"
              multiple
              disabled
              style="width: 100%"
            >
              <el-option
                v-for="vgItem in vgItemsOptions"
                :key="vgItem.id"
                :label="vgItem.number"
                :value="vgItem.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="將軸力計">
            <el-select v-model="oldVgId" style="width: 100%">
              <el-option
                v-for="vg in vgItemsInProjectOptions"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="換成">
            <el-select v-model="newVgId" style="width: 100%">
              <el-option
                v-for="vg in vgItemsNotInProject"
                :key="vg.id"
                :label="vg.number"
                :value="vg.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="canISwitchVg">
            <el-button @click="switchVG(oldVgId, newVgId)">確認轉換</el-button>
          </el-form-item>
          <el-row :gutter="20" v-if="totalVgLocation">
            <el-col :span="24">
              <el-form-item label="切換支撐階數">
                <el-pagination
                  layout="prev, pager, next"
                  :page-size="totalVgLocationPreFloor"
                  :total="totalVgLocation"
                  @current-change="onChangeFloor"
                >
                </el-pagination>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6">
              <h3>管理值<span class="small">(噸)</span></h3>
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
            <el-col :xs="24" :sm="18">
              <h3>位置編碼<span class="small">(VG-層數-流水號)</span></h3>
              <el-button @click="toPath('Steels')">
                維護鋼材資料
              </el-button>
              <el-table class="vg-table" :data="vgLocationCurrFloor">
                <el-table-column prop="vgNumber" label="軸力計" min-width="150">
                </el-table-column>
                <el-table-column prop="port" label="Port" width="50">
                </el-table-column>
                <el-table-column prop="number" label="配置編碼" width="80">
                </el-table-column>
                <el-table-column
                  prop="steelName"
                  label="使用鋼材"
                  min-width="150"
                >
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
          <el-row :gutter="20" v-if="totalSoLocation">
            <el-col :xs="24" :sm="8">
              <h3>管理值<span class="small">(cm)</span></h3>
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
            <el-col :xs="24" :sm="16">
              <h3 class="so-measure-tips">
                位置編號<span class="small">(SO-流水號)</span>
              </h3>
              <el-table class="so-table" :data="soLocation">
                <el-table-column
                  prop="number"
                  label="配置編碼"
                ></el-table-column>
                <el-table-column
                  prop="depth"
                  label="量測深度"
                  width="200"
                ></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button style="width: 100%" @click="toPath('ProjectsSetting')">
              回上一頁
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              style="width: 100%"
              @click="onSubmit"
              :disabled="!this.totalSoLocation && !this.totalVgLocation"
            >
              確定送出
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'ProjectEdit',
  mixins: [ToPathMixin],
  data() {
    return {
      oldVgId: '',
      newVgId: '',
      managementLabel: {
        notice: '注意',
        warning: '警戒',
        action: '行動'
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
    companiesOptions() {
      return this.$store.getters.notMyCompanies
    },
    vgItemsOptions() {
      return this.$store.getters.vgItems
    },
    vgItemsInProjectOptions() {
      return this.$store.getters.vgItemsInProject
    },
    steelsOptions() {
      return this.$store.getters.steels
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
    companyId: {
      get() {
        return this.$store.getters.project.companyId
      },
      set(value) {
        this.$store.commit('project', {
          property: 'companyId',
          value
        })
        this.$store.commit('project', {
          property: 'OPT',
          value: []
        })
        this.$store.commit('project', {
          property: 'USER',
          value: []
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
    vgItemsNotInProject() {
      return this.$store.getters.vgItemsNotInProject
    },
    vgLocationCurrFloor() {
      return this.$store.getters.vgLocationCurrFloor
    },
    canISwitchVg() {
      return this.oldVgId && this.newVgId
    },
    totalVgLocation() {
      return this.$store.getters.totalVgLocation
    },
    totalVgLocationPreFloor() {
      return this.$store.getters.totalVgLocationPreFloor
    },
    vgManagementValueOfCurrFloor() {
      return this.$store.getters.vgManagementValueOfCurrFloor
    },
    soManagementValue() {
      return this.$store.getters.soManagementValue
    },
    totalSoLocation() {
      return this.$store.getters.totalSoLocation
    },
    soLocation() {
      return this.$store.getters.soLocation
    }
  },
  methods: {
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
    updateVgManagementValue(label, value) {
      this.$store.commit('vgManagementValue', {
        value,
        label
      })
    },
    updateSoManagementValue(label, value) {
      this.$store.commit('soManagementValue', {
        value,
        label
      })
    },
    validateVgManagementValue(rule, value, next) {
      value = this.vgManagementValueOfCurrFloor[rule.label]
      if (rule.required) !value && next(new Error(rule.message))
      next()
    },
    validateSoManagementValue(rule, value, next) {
      value = this.soManagementValue[rule.label]
      if (rule.required) !value && next(new Error(rule.message))
      next()
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
    onSubmit() {
      this.$refs.project.validate(isValidSuccess => {
        if (isValidSuccess) {
          this.submitProject()
        } else {
          this.$message.error(`請重新檢查必填欄位`)
          return false
        }
      })
    },
    switchVG(oldVgId, newVgId) {
      this.$store.dispatch('switchVg', {
        oldVgId,
        newVgId
      })
      this.oldVgId = ''
      this.newVgId = ''
    },
    onChangeFloor(selectedFloor) {
      this.$store.commit('currentFloor', selectedFloor)
    },
    submitProject() {
      this.$store
        .dispatch('updateProject', {
          id: this.$route.params.projectId
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.project.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('ProjectsSetting')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    }
  }
}
</script>

<style lang="scss">
.upload-image-area {
  img,
  .el-upload.el-upload--picture,
  .el-upload-dragger {
    width: 100%;
    height: auto;
  }
}
</style>
<style lang="scss" scoped>
.re-select-image {
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

.el-tabs {
  margin-bottom: 22px;
}

.so-measure-tips {
  position: relative;
}

.so-measure-tips::after {
  font-size: 0.8em;
  font-weight: normal;
}

.so-measure-tips::after {
  content: '深度量測間隔 1 m';
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
