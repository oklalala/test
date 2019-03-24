<!-- @format -->

<template>
  <el-row class="entry" type="flex" justify="center">
    <el-col :md="8" :sm="10" :span="12">
      <el-form>
        <el-form-item label="帳號">
          <el-input
            type="text"
            name="account"
            v-model="account"
            placeholder="請輸入帳號"
            @input="removeError"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            type="password"
            name="password"
            v-model="password"
            placeholder="請輸入密碼"
            @input="removeError"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <p class="feedback">
            {{ feedback }}
          </p>
          <div class="button-container">
            <el-button
              type="primary"
              native-type="submit"
              style="float:right;"
              @click.prevent="submit"
            >
              登入
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Entry',
  data() {
    return {
      account: null,
      password: null,
      feedback: ''
    }
  },
  methods: {
    submit() {
      if (!this.account) return (this.feedback = '請輸入帳號')
      if (!this.password) return (this.feedback = '請輸入密碼')
      this.$store
        .dispatch('login', {
          account: this.account,
          password: this.password
        })
        .then(() => {
          this.$message({
            message: `${this.account} 歡迎您`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.$router.push({ name: 'ProjectList' })
        })
        .catch(() => {
          this.feedback = '帳號密碼不匹配'
        })
    },
    removeError() {
      this.feedback = ''
    }
  }
}
</script>

<style>
.feedback {
  position: absolute;
}
</style>
