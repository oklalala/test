<template>
  <el-menu :default-active="activeIndex"
        class="lel-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
    <h1 class="layout-navbar-title" style="color: #fff">大地監控</h1>
    <template v-if="isLogined" class="layout-navbar-menu">
      <template class="layout-navbar-menu-forUser">
        <el-menu-item index="1" @click="toPath('UserInfo')">帳號資料</el-menu-item>
        <el-menu-item index="2" @click="toPath('ProjectList')">專案列表</el-menu-item>
      </template>
      <template class="layout-navbar-menu-forAdmin">
        <el-menu-item index="3" @click="toPath('VGList')" v-if="isShow('vg:CRUD')">軸力計設定</el-menu-item>
        <el-menu-item index="4" @click="toPath('SOItemList')" v-if="isShow('soItem:CRUD')">傾度管設定</el-menu-item>
        <el-menu-item index="5" @click="toPath('UserList')" v-if="isShow('account:CRUD')">帳號設定</el-menu-item>
        <el-submenu index="6" menu-trigger="click" v-if="isShow('project:CRUD')">
          <template slot="title">專案設定</template>
          <el-menu-item index="6-1" @click="toPath('ProjectSetting')">設定專案資料</el-menu-item>
          <el-menu-item index="6-2" @click="toPath('ProjectPhaseList')">設定執行階段</el-menu-item>
        </el-submenu>
        <el-menu-item index="7" @click="toPath('PermissionSetup')" v-if="isShow('permission:CRUD')">權限設定</el-menu-item>
      </template>
      <el-menu-item index="8" @click="logout">登出</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import RoleIsMixin from '@/mixins/RoleIs'
export default {
  name: 'Navbar',
  mixins: [ToPathMixin, RoleIsMixin],
  data() {
    return {
      activeIndex: '0'
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
    },
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
      // return true
    }
  }
}
</script>

<style>
.lel-menu-vertical-demo {
  height: 100vh;
  position: fixed;
  left: 0;
}
h1 {
  padding: 20px;
}
</style>
