<template>
  <div class="editUser">
    <h1>帳號設定</h1>
    <h2>基本資料</h2>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newUser">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="newUser.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select
              v-model="selectedRole"
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
          <el-form-item label="帳號">
            <el-input v-model="newUser.account" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司名稱">
        <el-row :gutter="20">
          <el-col :span="17" :sm='21' :md='21'>
            <el-select
              v-model="selectedCompany"
              placeholder="請選擇"
              style="width: 100%">
              <el-option
                v-for="item in companies"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7" :sm='3' :md='3'>
            <el-button
              style="width: 100%"
              @click="saveCurrentAndGo">
              維護
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="傾度管" v-if="isShow('account:soItemSelf')">
        <el-select
          v-model='selectedSOItem'
          placeholder="請選擇"
          style="width: 100%">
          <el-option
            v-for="item in soItems"
            :key="item.id"
            :label="item.number"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button
              type="primary"
              style="width: 100%"
              @click="edit">
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
  name: 'EditUser',
  mixins: [ToPathMixin],
  data() {
    return {
      selectedRole: '',
      selectedCompany: '',
      selectedSOItem: ''
      // newUser: {
      //   "account": "zxcvzc",
      //   "name": "OPT1-2",
      //   "password": "000",
      //   "phone": "00000",
      //   "email": "enioy74@gmail.com",
      //   "roleName": "OPT",
      //   "company": {
      //     "id": "83b4c898-68cd-4b7a-9da2-608c7feaf472",
      //     "name": "湯尼水泥"
      //     },
      //   "soItem": {
      //     "id": "5a6b4845-3233-44b9-89cb-290228fe7e71",
      //     "number": "這是蝦米"
      //     },
      //   "projects": [
      //     { "id": "a3f8f558-3e3b-450e-a4cf-2b02ac565da9",
      //       "number": "VG-TEST",
      //       "name": "測試軸力計" },
      //     { "id": "b9f58673-07cb-4caa-8374-f1e5364d08a9",
      //       "number": "test0003",
      //       "name": "傾度管測試專案" },
      //     { "id": "d6d94b1e-4127-4463-9c68-2bc1c3da899b",
      //       "number": "qweqwe",
      //       "name": "最完整的資料" }
      //     ]
      //   }
    }
  },
  computed: {
    userList() {
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
    },
    user() {
      return this.$store.getters.currentUser
    },
    newUser() {
      this.selectedRole = this.user.roleName
      this.selectedCompany = this.user.company.id
      this.selectedSOItem = this.user.soItem ? this.user.soItem.id : ''
      return this.user
    }
  },
  methods: {
    deleteUsers() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteUsers', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(user => user.id)
    },
    cancel() {
      this.toPath('UserList')
    },
    edit() {
      let user = {
        name: this.newUser.name,
        roleName: this.selectedRole,
        companyId: this.selectedCompany,
        account: this.newUser.account,
        soId: this.selectedSOItem
      }
      this.$store
        .dispatch('updateUser', {
          userId: this.$route.params.userId,
          payload: user
        })
        .then(() => {
          this.toPath('UserList')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    isShow(feature) {
      return this.$store.getters.rolePermissions
        .filter(auth => auth.role === this.selectedRole)
        .shift()
        .permissions.filter(permission => permission.value)
        .map(permission => permission.name)
        .includes(feature)
    },
    saveCurrentAndGo() {
      this.newUser.roleName = this.selectedRole
      this.newUser.company.id = this.selectedCompany
      this.newUser.soItem = { id: this.selectedSOItem }
      this.$store.dispatch('updateCurrentUser', this.newUser).then(() => {
        this.toPath('CompanyList')
      })
    }
  }
}
</script>
