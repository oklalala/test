<!-- @format -->

<template>
  <el-form :model="me">
    <h1>帳號資料</h1>
    <section>
      <h2>基本資料</h2>
      <p>姓名：{{ me.name }}</p>
      <p>角色：{{ me.roleName }}</p>
      <p>公司：{{ me.company.name }}</p>
      <p v-if="me.soItem">傾度管 編號：{{ me.soItem.number }}</p>
    </section>

    <h2>聯絡方式</h2>
    <el-form-item
      label="電話"
      prop="phone"
      :rules="[
        {
          required: true,
          pattern: /^[0][9]\d{8}$/,
          message: '請輸入電話號碼 : 09xxxxxxxx',
          trigger: 'blur'
        }
      ]"
    >
      <el-input v-model="phone" placeholder="請輸入電話"> </el-input>
    </el-form-item>
    <el-form-item
      label="email"
      prop="email"
      :rules="[
        {
          required: true,
          message: '請輸入 email',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '請確認格式 example@chuen.com.tw',
          trigger: ['blur', 'change']
        }
      ]"
    >
      <el-input v-model="email" placeholder="請輸入 email"> </el-input>
    </el-form-item>

    <h2>登入密碼</h2>
    <el-form-item label="密碼">
      <el-checkbox v-model="isText" style="float:right;">顯示密碼</el-checkbox>
      <el-input
        v-model="password"
        :type="passwordShowType"
        placeholder="請輸入密碼"
      >
      </el-input>
    </el-form-item>

    <el-form-item class="button-container">
      <el-button type="primary" @click="submit">
        確認送出
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// @ is an alias to /src
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'UserInfo',
  mixins: [ToPathMixin],
  data() {
    return {
      isText: false
    }
  },
  computed: {
    me() {
      return this.$store.getters.me
    },
    phone: {
      get() {
        return this.$store.getters.myPhone
      },
      set(phone) {
        this.$store.commit('myPhone', phone)
      }
    },
    email: {
      get() {
        return this.$store.getters.myMail
      },
      set(mail) {
        this.$store.commit('myMail', mail)
      }
    },
    passwordShowType() {
      return this.isText ? 'text' : 'password'
    },
    password: {
      get() {
        return this.$store.getters.myPassword
      },
      set(password) {
        this.$store.commit('myPassword', password)
      }
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
          this.$message({
            message: '資料更新成功',
            type: 'success'
          })
          this.toPath('Projects')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    }
  }
}
</script>
