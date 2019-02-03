<template>
  <el-container>
    <el-header>
      <h1 class="layout-navbar-title" style="color: #fff">大地監控</h1>
    </el-header>
    <el-main>
      <template v-if="isLogined" class="layout-navbar-menu">
        <template class="layout-navbar-menu-forAdmin">
          <el-menu 
            :default-active="menu1"
            @select="closeMenu('menu2')"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            mode="horizontal"
            active-text-color="#ffd04b">
          <el-menu-item index="1" @click="toPath('UserInfo')">帳號資料</el-menu-item>
          <el-menu-item index="2" @click="toPath('ProjectList')">專案列表</el-menu-item>
          <!-- <template class="layout-navbar-menu-forAdmin" >
            <el-menu-item index="3" @click="toPath('VGList')" v-if="isShow('vg:CRUD')">軸力計設定</el-menu-item>
            <el-menu-item index="4" @click="toPath('SOItemList')" v-if="isShow('soItem:CRUD')">傾度管設定</el-menu-item>
            <el-menu-item index="5" @click="toPath('UserList')" v-if="isShow('account:CRUD')">帳號設定</el-menu-item>
            <el-submenu index="6" menu-trigger="click" v-if="isShow('project:CRUD')">
              <template slot="title">專案設定</template>
              <el-menu-item index="6-1" @click="toPath('ProjectSetting')">設定專案資料</el-menu-item>
              <el-menu-item index="6-2" @click="toPath('ProjectPhaseList')">設定執行階段</el-menu-item>
            </el-submenu>
            <el-menu-item index="7" @click="toPath('PermissionSetup')" v-if="isShow('permission:CRUD')">權限設定</el-menu-item>
          </template> -->
            <el-menu-item index="4" class='submenu' @click="logout">登出</el-menu-item>
            <el-submenu index="3" class='submenu'>
              <template slot="title" id='popupLevel1'>設定</template>
              <el-menu-item index="3-1" @click="toPath('VGList')" v-if="isShow('vg:CRUD')">軸力計設定</el-menu-item>
              <el-menu-item index="3-2" @click="toPath('SOItemList')" v-if="isShow('soItem:CRUD')">傾度管設定</el-menu-item>
              <el-menu-item index="3-3" @click="toPath('UserList')" v-if="isShow('account:CRUD')">帳號設定</el-menu-item>
              <el-submenu index="3-4">
                <template slot="title" id='popupLevel2'>專案設定</template>
                <el-menu-item index="3-4-1" @click="toPath('ProjectSetting')">專案資料</el-menu-item>
                <el-menu-item index="3-4-2" @click="toPath('ProjectPhaseList')">執行階段</el-menu-item>
              </el-submenu>
              <el-menu-item index="3-5" @click="toPath('PermissionSetup')" v-if="isShow('permission:CRUD')">權限設定</el-menu-item>
            </el-submenu>
          </el-menu>
        </template>
        
      </template>
    </el-main>
  </el-container>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import RoleIsMixin from '@/mixins/RoleIs'
export default {
  name: 'Navbar',
  mixins: [ToPathMixin, RoleIsMixin],
  data() {
    return {
      menu1: '0',
      menu2: '0'
    }
  },
  computed: {
    isLogined() {
      return !!this.$store.getters.token
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
    },
    closeMenu(menu) {
      console.log(menu)
      if (menu == 'menu1') this.menu1 = '0'
      if (menu == 'menu2') this.menu2 = '0'
      console.log('menu1=', this.menu1, 'menu2=', this.menu2)
    }
  }
}
</script>

<style>
.el-header,
.el-main {
  padding: 0;
}

.el-menu-item.submenu {
  float: right;
}
.el-submenu.submenu {
  float: right;
}

.layout-navbar-title {
  font-size: 30px;
  background: #545c64;
  padding: 15px;
  margin: 0;
}

.el-menu--popup.el-menu--popup-bottom-start {
  left: 50px;
  min-width: 100px;
}

li.is-opened > div.el-menu--horizontal {
  left: -85px !important;
  top: 108px !important;
}
.el-menu--horizontal > ul, .el-submenu .el-menu-item{
  min-width: 70px;
}
</style>
