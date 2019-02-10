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
              v-model="newUser.roleName"
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
            <el-input v-model="newUser.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司名稱">
        <el-row :gutter="20">
          <el-col :span="17" :sm='21' :md='21'>
            <el-select
              v-model="newUser.companyId"
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
              @click="toPath('CompanyList')">
              維護
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="傾度管" v-if="isShow('account:soItemSelf')">
        <el-select
          v-model="newUser.soId"
          placeholder="請選擇"
          style="width: 100%">
          <el-option
            v-for="item in soItems"
            :key="item.id"
            :label="item.name"
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
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'EditUser',

  mixins: [ToPathMixin],
  created() {
    if (this.$route.params.userId) {
      this.loadUser(this.$route.params.userId)
    }
  },
  data() {
    return {
      newUser: {
        name: '',
        roleName: 'OPT', // default setting for isShow method
        companyId: null,
        soId: '',
        account: ''
      }
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
    loadUser(userId) {
      this.$store.dispatch('getUser', userId).then(res => {
        let user = res.data.data
        this.newUser = {
          name: user.name,
          roleName: user.roleName,
          companyId: user.company.id,
          account: user.account,
          soId: ''
        }
      })
    },
    cancel() {
      this.toPath('UserList')
    },
    edit() {
      this.$store
        .dispatch('updateUser', {
          userId: this.$route.params.userId,
          payload: this.newUser
        })
        .then(() => {
          this.toPath('UserList')
        })
    },
    isShow(feature) {
      return this.$store.getters.rolePermissions
        .filter(permissions => permissions.role === this.newUser.roleName)
        .shift()
        .permissions.filter(permission => permission.value)
        .map(permission => permission.name)
        .includes(feature)
    }
  }
}
</script>
