<template>
  <div class="createUser">
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
      <el-form-item label="帳號">
        <el-input v-model="newUser.account"></el-input>
        <h6 class='hint' type="info">預設密碼: 000</h6>
      </el-form-item>
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
              @click="saveCurrentAndGo">維護</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="傾度管" v-if="isShow('account:soItemSelf')">
        <el-select
          v-model="selectedSOItem"
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
      selectedRole: 'USER',
      selectedCompany: '',
      selectedSOItem: ''
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
      this.selectedRole = this.user['roleName'] || 'USER'
      this.selectedCompany = this.user['companyId'] || ''
      this.selectedSOItem = this.user['soId'] || ''
      return this.user
    }
  },
  methods: {
    cancel() {
      this.toPath('UserList')
    },
    submit() {
      this.newUser.roleName = this.selectedRole
      this.newUser.companyId = this.selectedCompany
      this.newUser.soId = this.selectedSOItem
      this.$store
        .dispatch('createUser', this.newUser)
        .then(() => {
          this.$message({
            message: `成功新增 ${this.newUser.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
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
      this.newUser.companyId = this.selectedCompany
      this.newUser.soId = this.selectedSOItem
      this.$store.dispatch('updateCurrentUser', this.newUser).then(() => {
        this.toPath('CompanyList')
      })
    }
  }
}
</script>
<style>
.hint {
  margin: 0;
  color: #797d85;
}
</style>
