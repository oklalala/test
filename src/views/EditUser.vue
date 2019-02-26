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
    <!-- {{selectedSOItem}}
    <br>
    {{user}}
    <br>
    {{newUser}} -->
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
      //   name: '',
      //   roleName: 'OPT', // default setting for isShow method
      //   companyId: null,
      //   soId: '',
      //   account: ''
      // }
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
      console.log(this.user,'this is user')
      this.selectedRole = this.user.roleName
      this.selectedCompany = this.user.company.id
      this.selectedSOItem = this.user.soItem ?  this.user.soItem.id : ''
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
    },
    isShow(feature) {
      return this.$store.getters.rolePermissions
        .filter(permissions => permissions.role === this.selectedRole)
        .shift()
        .permissions.filter(permission => permission.value)
        .map(permission => permission.name)
        .includes(feature)
    },
    saveCurrentAndGo() {
      this.newUser.roleName = this.selectedRole
      this.newUser.company.id = this.selectedCompany
      this.newUser.soItem = { id: this.selectedSOItem }
      this.$store.dispatch('updateCurrentUser', this.newUser)
      this.toPath('CompanyList')
    }
  }
}
</script>
