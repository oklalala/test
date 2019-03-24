<!-- @format -->

<template>
  <el-row class="user-info" type="flex" justify="center">
    <el-col :xs="18" :sm="12" :md="12">
      <h1>帳號資料</h1>
      <el-form :model="me" :rules="rules">
        <section>
          <h3>基本資料</h3>
          <p>姓名：{{ me.name }}</p>
          <p>角色：{{ me.roleName }}</p>
          <p v-if="me.company">公司：{{ me.company.name }}</p>
          <p v-if="me.soItem">傾度管 編號：{{ me.soItem.number }}</p>
        </section>
        <h3>聯絡方式</h3>
        <section>
          <el-form-item label="電話" prop="phone">
            <el-input
              :value="me.phone"
              @change="value => this.updateMe({ phone: value })"
              :disabled="!isShow()"
              placeholder="請輸入電話"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input
              :value="me.email"
              @change="value => this.updateMe({ email: value })"
              :disabled="!isShow()"
              placeholder="請輸入 email"
            >
            </el-input>
          </el-form-item>
        </section>
        <section>
          <h3>密碼設定</h3>
          <el-form-item label="密碼">
            <el-checkbox @change="showPassword()" style="float:right;"
              >顯示密碼</el-checkbox
            >
            <el-input
              :value="me.password"
              :type="password"
              @change="value => this.updateMe({ password: value })"
              :disabled="!isShow()"
              placeholder="請輸入密碼"
            >
            </el-input>
          </el-form-item>
        </section>
        <div class="button-container">
          <el-button type="primary" @click="submit">
            確認
          </el-button>
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'UserInfo',
  mixins: [ToPathMixin],
  data() {
    return {
      password: 'password',
      rules: {
        phone: [
          {
            required: true,
            pattern: /^[0][9]\d{8}$/,
            message: '請輸入電話號碼 : 09xxxxxxxx',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '請輸入 email', trigger: 'blur' },
          {
            type: 'email',
            message: '請確認格式 example@chuen.com.tw',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    me() {
      return this.$store.getters.me
    }
  },
  methods: {
    updateMe(payload) {
      this.$store.commit('updateMe', payload)
    },
    submit() {
      this.$store
        .dispatch('updateMe')
        .then(() => {
          this.$message({ message: '資料更新成功', type: 'success' })
          this.toPath('ProjectList')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    isShow() {
      return this.$store.getters.myPermissions.includes('account:updateSelf')
    },
    showPassword() {
      this.password === 'password'
        ? (this.password = 'text')
        : (this.password = 'password')
    }
  }
}
</script>
