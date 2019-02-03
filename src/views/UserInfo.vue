<template>
  <div class="user-info">
    <h1>帳號資料</h1>
    <el-form>
      <section>
        <h2>基本資料</h2>
        <p>姓名：{{ me.name }}</p>
        <p>角色：{{ me.roleName}}</p>
        <p v-if="me.company">公司：{{ me.company.name}}</p>
        <p v-if="me.soItem">傾度管 編號：{{ me.soItem.number}}</p>
      </section>
      <section>
        <h2>聯絡方式</h2>
          <el-form-item label="電話">
            <el-input
              :value="me.phone"
              @change="value => this.updateMe({ phone: value })"
              :disabled="!isShow()"
              placeholder="請輸入電話">
            </el-input>
          </el-form-item>
          <el-form-item label="email">
            <el-input
              :value="me.email"
              @change="value => this.updateMe({ email: value })"
              :disabled="!isShow()"
              placeholder="請輸入 email">
            </el-input>
          </el-form-item>
      </section>
      <section>
        <h2>密碼設定</h2>
        <el-form-item label="密碼">
          <el-input
            :value="me.password"
            :type='password'
            @change="value => this.updateMe({ password: value })"
            :disabled="!isShow()"
            placeholder="請輸入密碼">
          </el-input>
        </el-form-item>
        <el-checkbox @change='showPassword()'>顯示密碼</el-checkbox>
      </section>
      <section>
        <h2>參與專案</h2>
        <el-table
          :data="me.projects"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="案號"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名稱">
          </el-table-column>
        </el-table>
      </section>
      <div class="button-container">
        <el-button type="primary" @click="submit">
          確認
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'UserInfo',
  mixins: [ToPathMixin],
  data() {
    return {
      password: 'password'
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
          this.$message.error(e, '資料更新失敗')
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
