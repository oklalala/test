<!-- @format -->

<template>
  <div class="userEdit">
    <h1>帳號設定</h1>
    <h2>基本資料</h2>
    <el-form label-position="top" :model="user">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="角色">
            <el-select
              v-model="roleName"
              placeholder="請選擇"
              style="width: 100%"
            >
              <el-option
                v-for="item in rolesOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="登入帳號">
            <el-input v-model="account" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="密碼">
            <div class="password">{{ password }}</div>
            <el-checkbox v-model="isShowPassword">顯示密碼</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司名稱">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="20">
            <el-select
              v-model="company"
              placeholder="請選擇"
              style="width: 100%"
              value-kay="id"
              disabled
            >
              <el-option
                v-for="company in companiesOptions"
                :key="company.id"
                :label="company.name"
                :value="company"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="4">
            <el-button style="width: 100%" @click="toPath('CompanyList')"
              >維護</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="傾度管" v-if="isShow('account:soItemSelf')">
        <el-select
          v-model="soItem"
          placeholder="請選擇"
          value-key="id"
          style="width: 100%"
        >
          <el-option
            v-for="item in soItemOptions"
            :key="item.id"
            :label="item.number"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" style="width: 100%" @click="edit">
              確定送出
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%" @click="toPath('Users')">
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
  name: 'UserEdit',
  mixins: [ToPathMixin],
  data() {
    return {
      isShowPassword: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.currentUser
    },
    name: {
      get() {
        return this.$store.getters.currentUser.name
      },
      set(value) {
        this.$store.commit('currentUserName', value)
      }
    },
    roleName: {
      get() {
        return this.$store.getters.currentUser.roleName
      },
      set(value) {
        this.$store.commit('currentUserRoleName', value)
      }
    },
    rolesOptions() {
      return this.$store.getters.roles
    },
    account: {
      get() {
        return this.$store.getters.currentUser.account
      },
      set(value) {
        this.$store.commit('currentUserAccount', value)
      }
    },
    password() {
      const key = this.$store.getters.currentUser.password
      // eslint-disable-next-line
      return (this.isShowPassword) ? key : key.split('').map(() => '*').join('')
    },
    companiesOptions() {
      return this.$store.getters.companies
    },
    company: {
      get() {
        return this.$store.getters.currentUser.company
      },
      set(value) {
        this.$store.commit('currentUserCompany', value)
      }
    },
    soItem: {
      get() {
        return this.$store.getters.currentUser.soItem
      },
      set(value) {
        this.$store.commit('currentUserSoItem', value)
      }
    },
    soItemOptions() {
      return this.$store.getters.soItemsFree
    }
  },
  methods: {
    edit() {
      this.$store
        .dispatch('updateUser', {
          userId: this.$route.params.userId
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.user.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('Users')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    },
    isShow(feature) {
      return this.$store.getters.currentUserPermissions
        .filter(permission => permission.value)
        .map(permission => permission.name)
        .includes(feature)
    }
  }
}
</script>
<style lang="scss" scoped>
.password {
  font-family: monospace;
}
</style>
