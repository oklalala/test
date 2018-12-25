<template>
  <el-menu :default-active="activeIndex"  class="layout-navbar" mode="horizontal" @select="handleSelect">
    <h1 class="layout-navbar-title">大地監控</h1>
    <template v-if="isLogined" class="layout-navbar-menu">
      <template class="layout-navbar-menu-forUser">
        <el-menu-item index="1" @click="toPath('UserInfo')">帳號資料</el-menu-item>
        <el-menu-item index="2" @click="toPath('ProjectList')">專案列表</el-menu-item>
      </template>
      <template class="layout-navbar-menu-forAdmin" v-if="roleIs('ADMIN')">
        <el-menu-item index="3">傾度管設定</el-menu-item>
        <el-menu-item index="4" @click="toPath('UserList')">帳號設定</el-menu-item>
        <el-submenu index="5" menu-trigger="click">
          <template slot="title">專案設定</template>
          <el-menu-item index="5-1" @click="toPath('ProjectList')">專案列表</el-menu-item>
          <el-menu-item index="5-2">專案執行階段</el-menu-item>
        </el-submenu>
        <el-menu-item index="6" @click="toPath('PermissionSetup')">權限設定</el-menu-item>
      </template>
      <el-menu-item index="7" @click="logout">登出</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import RoleIsMixin from '@/mixins/RoleIs'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  mixins: [ToPathMixin, RoleIsMixin],
  data() {
    return {
      activeIndex: '1',
    }
  },
  computed: {
    isLogined() {
      return this.$store.getters.token
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.toPath('Entry')
    }
  }
}
</script>
