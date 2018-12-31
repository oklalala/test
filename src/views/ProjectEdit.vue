<template>
  <div class="projectEdit">
    
    <h1>編輯專案</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newProject">
      
      <h2>基本資料</h2>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="專案案號">
            <el-input v-model="newProject.number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="專案狀態">
            <el-select
              v-model="newProject.status"
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
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點">
        <el-input
          v-model="newProject.address"
          style="width: 100%">
        </el-input>
      </el-form-item>

      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="newProject.companyId"
          style="width: 100%">
          <el-option
            v-for="item in companies"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      

      <h2>參與人員</h2>
      <el-tabs type="border-card">
        <el-tab-pane label="OPT">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-select
                style="width: 100%">
                <el-option
                  v-for="item in OPTS"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button
                @click="toPath('CompanyList')">
                加入專案
              </el-button>
            </el-col>
          </el-row>
          <el-table
            :data="projectList"
            class="projectList-table"
            @selection-change="updateDeleteList">
            <el-table-column
              label="負責人"
              type="selection"
              width="180">
            </el-table-column>
            <el-table-column
              prop="id"
              label="OPT"
              width="320">
              <template slot-scope="scope">
                <span class="clickable"
                  @click="toPath('ProjectEdit', { projectId: scope.row.id })">
                  {{ scope.row.id }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="USER">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-select
                style="width: 100%">
                <el-option
                  v-for="item in companies"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button
                @click="toPath('CompanyList')">
                加入專案
              </el-button>
            </el-col>
          </el-row>
          <el-table
            :data="projectList"
            class="projectList-table"
            @selection-change="updateDeleteList">
            <el-table-column
              label="負責人"
              type="selection"
              width="180">
            </el-table-column>
            <el-table-column
              prop="id"
              label="OPT"
              width="320">
              <template slot-scope="scope">
                <span class="clickable"
                  @click="toPath('ProjectEdit', { projectId: scope.row.id })">
                  {{ scope.row.id }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>


      <h1>配置圖</h1>
      <el-upload
        v-model="newProject.sitePlan"
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">將文件拖到此處，或<em>點擊上傳</em></div>
        <div class="el-upload__tip" slot="tip">只能上傳jpg/png文件，且不超過500kb</div>
      </el-upload>


      <h2>監控設定</h2>
      <el-tabs type="border-card">

        <el-tab-pane label="軸力計 ( VG )"> 
          <el-form-item label="使用軸力計編號">
            <!-- <el-select v-model="vgSelectedItems" multiple placeholder="可複選">
              <el-option
                v-for="item in vgUsableItems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <br>

          <div class="demo-input-suffix">
            支撐階數：
            <el-input 
              v-model.number="newProject.floor">
            </el-input>
            每層數量：
            <el-input>
            </el-input>
          </div>
          <br>

          <div class="block">
            <span class="demonstration">請選擇支撐階數</span>
            <el-pagination
              layout="prev, pager, next"
              :total="30">
            </el-pagination>
          </div>

          <el-row :gutter="20">
            <el-col :span="9">
              <h2>管理值<span>單位：噸</span></h2>
              注意值
              <el-input
                v-model.number="newProject.vgManagement.notice">
              </el-input>
              警戒值
              <el-input
                v-model.number="newProject.vgManagement.warning">
              </el-input>
              行動值
              <el-input
                v-model.number="newProject.vgManagement.action">
              </el-input>
            </el-col>
            <el-col :span="13" :offset="2">
              <h2>位置編碼<span>( VG - 層數 - 流水號 )</span></h2>
              <el-button
                @click="toPath('SteelList')">
                維護鋼材資料
              </el-button>
              <el-table
                class="vg-table"
                @selection-change="updateDeleteList">
                <el-table-column
                  label="VG ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="Port"
                  width="100">
                  <template slot-scope="scope">
                    <span class="clickable"
                      @click="toPath('ProjectEdit', { projectId: scope.row.id })">
                      {{ scope.row.id }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="編碼"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="鋼材"
                  width="100">
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
              v-model.number="newProject.soLocation.number">
            </el-input>
            每孔深度 ( m )：
            <el-input
              v-model.number="newProject.soLocation.depth">
            </el-input>
          </div>
          <br>

          <el-row :gutter="20">
            <el-col :span="8">
              <h2>管理值<span>單位：cm</span></h2>
              注意值
              <el-input
                v-model.number="newProject.soManagement.notice">
              </el-input>
              警戒值
              <el-input
                v-model.number="newProject.soManagement.warning">
              </el-input>
              行動值
              <el-input
                v-model.number  ="newProject.soManagement.action">
              </el-input>
            </el-col>
            <el-col :span="14" :offset="2">
              <h2>位置編號<span>( SO - 流水號 )</span></h2>
              <h5>相同位置編碼 量測深度間隔 1 m</h5>
              <el-table
                class="vg-table"
                @selection-change="updateDeleteList">
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
              @click="edit">
              確定變更
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
export default {
  name: 'ProjectEdit',

  mixins: [ToPathMixin],
  created() {
    if (this.$route.params.projectId) {
      this.loadProject(this.$route.params.projectId)
    }
  },
  data() {
    return {
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
        vgManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
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
    companies() {
      return this.$store.getters.companies
    },
    soItems() {
      return this.$store.getters.soItems
    // },
    // vgItems() {
    //   return this.$store.getters.vgItems
    }
  },
  methods: {
    deleteProjects() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteProjects', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(project => project.id)
    },
    loadProject(projectId) {
      this.$store.dispatch('getProject', projectId).then(res => {
        let project = res.data.data
        this.newProject = {
          number: project.number, // CNT-16Q3
          status: project.status, // end or in-progress
          name: project.name, // 測試專案
          address: project.address, // 三路
          companyId: project.companyId,
          sitePlan: project.sitPlan, // 上傳的圖片
          OPT: project.OPT, // {id:..} 公司或客戶的 operator
          USER: project.USER, // {id:..} 客戶的使用者
          floor: project.floor, //. vg階數
          vgManagement: {
            notice: project.vgManagement.notice,
            warning: project.vgManagement.warning,
            action: project.vgManagement.action
          },
          soManagement: {
            notice: project.soManagement.notice,
            warning: project.soManagement.warning,
            action: project.soManagement.action
          },
          vgIds: project.vgIds,
          vgLocation: [
            {
              number: project.vgLocation.number,
              steelId: project.vgLocation.steelId
            }
          ],
          soLocation: [
            {
              number: project.soLocation.number,
              depth: project.soLocation.depth
            }
          ]
        }
      })
    },
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
        vgManagement: {
          notice: 0,
          warning: 0,
          action: 0
        },
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
      this.toPath('ProjectList')
    },
    edit() {
      this.$store
        .dispatch('updateProject', {
          projectId: this.$route.params.projectId,
          payload: this.newProject
        })
        .then(() => {
          this.reset()
          this.toPath('ProjectList')
        })
    }
  }
}
</script>

<style>
h2 span {
  font-size: 14px;
  padding-left: 30px;
}
</style>
