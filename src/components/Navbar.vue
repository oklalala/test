<template>
  <el-container>
    <el-header>
      <h1 class="layout-navbar-title" style="color: #fff">大地監控</h1>
    </el-header>
    <label for="menu" id="burger">
      <font-awesome-icon icon="bars" />
    </label>
    <input type="checkbox" id="menu">
    <section id="nav">
      <ul class="nav__items">
        <li class="nav__item" tabindex='0' @click="toPath('UserInfo')">帳號資料</li>
        <li class="nav__item" tabindex='0' @click="toPath('ProjectList')">專案列表</li>
      </ul>
      <ul class="nav__items">
        <li class="nav__item" tabindex='0' @click="toPath('VGList')" v-if="isShow('vg:CRUD')">軸力計設定</li>
        <li class="nav__item" tabindex='0' @click="toPath('SOItemList')" v-if="isShow('soItem:CRUD')">傾度管設定</li>
        <li class="nav__item" tabindex='0' @click="toPath('UserList')" v-if="isShow('account:CRUD')">帳號設定</li>
        <!-- <el-submenu>
          <template slot="title" id='popupLevel2'>專案設定</template>
          <li class="nav__item" tabindex='0' @click="toPath('ProjectSetting')">專案資料</li>
          <li class="nav__item" tabindex='0' @click="toPath('ProjectPhaseList')">執行階段</li>
        </el-submenu> -->
        <li class="nav__item" tabindex='0' @click="toPath('PermissionSetup')" v-if="isShow('permission:CRUD')">權限設定</li>
        <li class="nav__item" tabindex='0' @click="logout">登出</li>
      </ul>
    </section>
  </el-container>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import RoleIsMixin from '@/mixins/RoleIs'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Navbar',
  mixins: [ToPathMixin, RoleIsMixin],
  data() {
    return {}
  },
  components: {
    FontAwesomeIcon
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
    }
  }
}
</script>

<style>
#nav {
  display: flex;
  justify-content: space-between;
  background:#545c64;
}
.nav__items {
  padding: 0;
  margin: 0;
}
.nav__item {
  display: inline-block;
  padding: 0 15px;
  font-size: 14px;
  line-height: 60px;
  color: white;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.nav__item:hover {
  background: #434a50;
}

.nav__item:focus {
  outline: none;
  color: #ffd04b;
  border-bottom: 3px solid #ffd04b;
}

.layout-navbar-title {
  font-size: 30px;
  background: #545c64;
  padding: 15px;
  margin: 0;
}
.el-header {
  padding: 0;
}

#menu, #burger {
  color: white;
  display: none;
}
#burger {
  font-size: 30px;
  position: absolute;
  top: 15px;
  right: 15px;
}

@media screen and (max-width: 600px) {
  #burger {
    display: block;
  }
  
  #menu:checked ~ #nav {
    display: none;
  }
}
</style>
