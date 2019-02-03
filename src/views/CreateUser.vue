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
            <h6 type="info">預設密碼: 000</h6>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公司名稱">
        <el-row :gutter="20">
          <el-col :span="22">
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
          <el-col :span="2">
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
      newUser: {
        name: '',
        roleName: 'USER',
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
    reset() {
      this.newUser = {
        name: '',
        roleName: null,
        companyId: null,
        soId: '',
        account: ''
      }
    },
    cancel() {
      this.reset()
      this.toPath('UserList')
    },
    submit() {
      this.$store.dispatch('createUser', this.newUser).then(() => {
        this.reset()
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
