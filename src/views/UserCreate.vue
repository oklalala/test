<!-- @format -->

<template>
  <div class="userCreate">
    <h1>帳號設定</h1>
    <h2>基本資料</h2>
    <el-form label-position="top" label-width="80px" :model="user">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="角色">
            <el-select v-model="roleName" placeholder="請選擇">
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
            <el-input v-model="account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="預設密碼">
            <div class="password">000</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司名稱">
        <el-row :gutter="20">
          <el-col :xs="17" :sm="20">
            <el-form-item>
              <el-select v-model="company" placeholder="請選擇" value-key="id">
                <el-option
                  v-for="item in companiesOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="7" :sm="4">
            <el-button @click="toPath('Companies')">維護</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="傾度管" v-if="isShow('account:soItemSelf')">
        <el-select v-model="soItem" placeholder="請選擇" value-key="id">
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
        <el-button @click="toPath('Users')">
          回上一頁
        </el-button>
        <el-button type="primary" @click="onSubmit">
          確定送出
        </el-button>
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
    onSubmit() {
      this.$store
        .dispatch('createUser')
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
