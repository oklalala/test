<template>
  <div class="createUser">
    
    <h1>專案設定</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="project">
      
      <h2>基本資料</h2>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="專案案號">
            <el-input v-model="project.numbering"
              placeholder="CNT - 16Q4"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="專案狀態">
            <el-select
              v-model="project.status"
              placeholder="請選擇"
              style="width: 100%">
              <el-option
                v-for="item in roles"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col>
          <el-form-item label="專案名稱">
            <el-input v-model="project.name"
              placeholder="阡福町商業大樓"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="地點">
        <el-row :gutter="20">
          <el-col :span="22">
            <el-select
              v-model="project.address"
              placeholder="大武街 34 號"
              style="width: 100%">
              <el-option
                v-for="item in companies"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              style="width: 100%"
              @click="toPath('CompanyList')">
              維護
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="客戶公司名稱">
        <el-select
          v-model="project.companies"
          placeholder="雨宮營造"
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
          
        </el-tab-pane>
        <el-tab-pane label="USER">配置管理


        </el-tab-pane>
      </el-tabs>


      <h1>配置圖</h1>


      <h2>監控設定</h2>
      <el-tabs type="border-card">

        <el-tab-pane label="軸力計 ( VG )"> 
          <el-form-item label="使用軸力計編號">
            <el-select
              v-model="project.companies"
              placeholder="1,4"
              style="width: 100%">
              <el-option
                v-for="item in companies"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <br>

          <div class="demo-input-suffix">
            支撐階數：
            <el-input
              placeholder="3"
              v-model="input2">
            </el-input>
            每層數量：
            <el-input
              placeholder="5"
              v-model="input21">
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
                placeholder="3"
                v-model="input2">
              </el-input>
              警戒值
              <el-input
                placeholder="5"
                v-model="input21">
              </el-input>
              行動值
              <el-input
                placeholder="8"
                v-model="input21">
              </el-input>
            </el-col>
            <el-col :span="13" :offset="2">
              <h2>位置編號<span>( VG 層數/流水數 )</span></h2>
              <el-button
                @click="toPath('CompanyList')">
                維護鋼材資料
              </el-button>
              <el-table
                :data="vgList"
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
                      @click="toPath('EditProject', { projectId: scope.row.id })">
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
            支撐階數：
            <el-input
              placeholder="3"
              v-model="input2">
            </el-input>
            每層數量：
            <el-input
              placeholder="5"
              v-model="input21">
            </el-input>
          </div>
          <br>

          <div class="block" v-show="go" >
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
                placeholder="3"
                v-model="input2">
              </el-input>
              警戒值
              <el-input
                placeholder="5"
                v-model="input21">
              </el-input>
              行動值
              <el-input
                placeholder="8"
                v-model="input21">
              </el-input>
            </el-col>
            <el-col :span="13" :offset="2">
              <h2>位置編號<span>( VG 層數/流水數 )</span></h2>
              <el-button
                @click="toPath('CompanyList')">
                維護鋼材資料
              </el-button>
              <el-table
                :data="vgList"
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
                      @click="toPath('EditProject', { projectId: scope.row.id })">
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
export default {
  name: 'CreateUser',

  mixins: [ToPathMixin],
  data() {
    return {
      project: {
        numbering: '',
        name: '',
        status: null,
        companies: '',
        address: ''
      }
    }
  },
  computed: {
    projectList() {
      return this.$store.getters.users
    },
    roles() {
      return this.$store.getters.roles
    },
    companies() {
      return this.$store.getters.companies
    },
    soItems() {
      return this.$store.getters.soItems
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
    reset() {
      this.project = {
        name: '',
        roleName: null,
        companyId: null,
        soId: '',
        account: ''
      }
    },
    cancel() {
      this.reset()
      this.toPath('ProjectList')
    },
    submit() {
      this.$store.dispatch('createProject', this.project).then(() => {
        this.reset()
        this.toPath('ProjectList')
      })
    }
  }
}
</script>

<style>
h2 span{
  font-size: 14px;
  padding-left: 30px;
}
</style>
