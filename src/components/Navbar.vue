<template>
  <nav class="layout-navbar">
    <h1 class="layout-navbar-title">大地監控</h1>
    <ul v-if="isLogined" class="layout-navbar-menu">
      <div class="layout-navbar-menu-forUser">
        <li><a href="#" @click="toPath('UserInfo')">帳號資料</a></li>
        <li><a href="#">專案列表</a></li>
      </div>
      <div class="layout-navbar-menu-forAdmin">
        <li><a href="#">傾度管設定</a></li>
        <li><a href="#" @click="toPath('UserList')">帳號設定</a></li>
        <li><a href="#">專案設定</a></li>
        <li><a href="#" @click="toPath('PermissionSetup')">權限設定</a></li>
      </div>
      <li><a href="#" @click="logout">登出</a></li>
    </ul>
  </nav>  
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  mixins: [ToPathMixin],
  computed: {
    ...mapGetters([
      'isLogined'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.toPath('Entry')
    }
  }
}
</script>
