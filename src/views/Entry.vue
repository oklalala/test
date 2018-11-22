<template>
  <div class="entry">
    <el-form>
      <el-form-item label="帳號">
        <el-input
          type="text"
          name="account"
          v-model="account"
          placeholder="請輸入帳號">
        </el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input
          type="password"
          name="password"
          v-model="password"
          placeholder="請輸入密碼">
        </el-input>
      </el-form-item>
      <el-form-item>
        <p class="feedback">
          {{ feedback }}
        </p>
        <el-button
          type="primary"
          native-type="submit"
          @click.prevent="submit">
          登入
        </el-button>
      </el-form-item>
    </el-form>
  </div>
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
      if (!this.account || !this.password) {
        return (this.feedback = '帳號密碼不匹配')
      }
      this.$store
        .dispatch('login', {
          account: this.account,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'ProjectList' })
        })
        .catch(err => {
          console.log(err.message)
          this.feedback = '帳號密碼不匹配'
        })
    }
  }
}
</script>
