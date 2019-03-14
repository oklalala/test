<template>
  <el-container>
    <el-header>
      <h1 class="layout-navbar-title" style="color: #fff">大地監控</h1>
    </el-header>
    <label for="menu" id="burger" @click="isMobile = !isMobile">
      <font-awesome-icon icon="bars" />
    </label>
    <section id="nav" v-if="!isMobile" v-show="isLogined">
      <ul class="nav__items">
        <li class="nav__item" :class="{ active: isActive('/user-info') }" @click="toPath('UserInfo')">帳號資料</li>
        <li class="nav__item" :class="{ active: isActive('/projects') }" @click="toPath('ProjectList')">專案列表</li>
      </ul>
      <ul class="nav__items">
        <li class="nav__item" :class="{ active: isActive('/vgs') }" @click="toPath('VGList')" v-if="isShow('vg:CRUD')">軸力計設定</li>
        <li class="nav__item" :class="{ active: isActive('/so-items') }" @click="toPath('SOItemList')" v-if="isShow('soItem:CRUD')">傾度管設定</li>
        <li class="nav__item" :class="{ active: isActive('/users') }" @click="toPath('UserList')" v-if="isShow('account:CRUD')">帳號設定</li>
        <li class="nav__item" 
          :class="{ active: isActive('/project-setting') || isActive('/project-phases') }" 
          @click.capture="projectSubMenuShow = !projectSubMenuShow" 
          v-if="isShow('project:CRUD')">專案設定
          <ul class="nav__sub" v-if="projectSubMenuShow">
            <li class="nav__item" :class="{ active: isActive('/project-setting') }" @click="toPath('ProjectSetting')">專案資料</li>
            <li class="nav__item" :class="{ active: isActive('/project-phases') }" @click="toPath('ProjectPhaseList')">執行階段</li>
          </ul>
        </li>
        <li class="nav__item" :class="{ active: isActive('/permisson-setup') }" @click="toPath('PermissionSetup')" v-if="isShow('permission:CRUD')">權限設定</li>
        <li class="nav__item" @click="logout">登出</li>
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
    return {
      projectSubMenuShow: false,
      isMobile: screen.width <= 700
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    isLogined() {
      return !!this.$store.getters.token
    },
    currentRoute() {
      return this.$route.path
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    isShow(feature) {
      return this.$store.getters.myPermissions.includes(feature)
    },
    isActive(route) {
      return this.$route.path === route
    }
  },
  watch: {
    currentRoute: function(val) {
      if (val !== '/project-setting' && val !== '/project-phases') {
        this.projectSubMenuShow = false
      }
    }
  }
}
</script>

<style>
#nav {
  display: flex;
  justify-content: space-between;
  background: #545c64;
  z-index: 4;
}
.nav__items {
  padding: 0;
  margin: 0;
}
/* navbar for mobile */
@media screen and (max-width: 700px) {
  #nav {
    display: block;
  }
}
.nav__item {
  display: inline-block;
  padding: 0 15px;
  font-size: 14px;
  line-height: 60px;
  color: white;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .nav__item {
    display: block;
    line-height: 40px;
  }
}

@media screen and (min-width: 700px) {
  .nav__sub {
    position: absolute;
    background: #545c64;
    padding: 0;
    top: 120px;
    right: 58px;
  }
}

.nav__item:hover {
  background: #434a50;
}

.active {
  outline: none;
  color: #ffd04b;
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

#menu,
#burger {
  color: white;
  display: none;
}
#burger {
  font-size: 30px;
  position: absolute;
  top: 15px;
  right: 15px;
}

@media screen and (max-width: 700px) {
  #burger {
    display: block;
  }

  #menu:checked ~ #nav {
    display: none;
  }
}
</style>
