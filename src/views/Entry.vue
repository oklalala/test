<!-- @format -->

<template>
  <div class="entry-container">
    <el-form class="entry">
      <el-form-item label="帳號">
        <el-input
          type="text"
          name="account"
          v-model="account"
          placeholder="請輸入帳號"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input
          type="password"
          name="password"
          v-model="password"
          placeholder="請輸入密碼"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button
            type="primary"
            native-type="submit"
            @click.prevent="submit"
          >
            登入
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  data() {
    return {
      account: null,
      password: null
    }
  },
  methods: {
    async submit() {
      if (!this.account) {
        this.$message.error(`請輸入帳號`)
        return
      }
      if (!this.password) {
        this.$message.error(`請輸入密碼`)
        return
      }

      try {
        await this.$store.dispatch('login', {
          account: this.account,
          password: this.password
        })
        this.$message({
          message: `${this.account} 歡迎您`,
          type: 'success',
          center: true,
          duration: 1800
        })
        this.$router.push({
          name: 'Projects'
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style>
.entry-container {
  height: 75vh;
  position: relative;
}

.entry {
  max-width: 240px;
  height: 284px;
  position: absolute;
  top: 10vh;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
