<template>
  <div class="user-info">
    <h1>帳號資料</h1>
    <el-form>
      <section>
        <h2>基本資料</h2>
        <p>姓名：{{ me.name }}</p>
        <p>角色：{{ me.role.roleName}}</p>
        <p>公司：{{ me.company.name}}</p>
        <p v-if="me.soItem">傾度管 編號：{{ me.soItem.number}}</p>
      </section>
      <section>
        <h2>聯絡方式</h2>
          <el-form-item label="電話">
            <el-input
              :value="me.phone"
              @change="value => this.updateMe({ phone: value })"
              placeholder="請輸入電話">
            </el-input>
          </el-form-item>
          <el-form-item label="email">
            <el-input
              :value="me.email"
              @change="value => this.updateMe({ email: value })"
              placeholder="請輸入 email">
            </el-input>
          </el-form-item>
      </section>
      <section>
        <h2>密碼設定</h2>
        <el-form-item label="密碼">
          <el-input
            :value="me.password"
            @change="value => this.updateMe({ password: value })"
            placeholder="請輸入密碼">
          </el-input>
        </el-form-item>
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

export default {
  name: 'Entry',
  data() {
    return {
    }
  },
  computed: {
    me () {
      return this.$store.getters.me
    }
  },
  methods: {
    updateMe(payload) {
      this.$store.commit('updateMe', payload)
    },
    submit () {
      this.$store.dispatch('updateMe')
    }
  }
}
</script>
