<!-- @format -->

<template>
  <div class="nav-container">
    <h1 class="web-title" style="color: #fff">大地監控</h1>
    <label for="menu" id="burger" v-if="isLogined" @click="toggleHidenNav">
      <font-awesome-icon icon="bars" />
    </label>
    <section id="nav" v-if="isShowNav && isLogined">
      <ul class="nav__items">
        <li
          class="nav__item"
          :class="{ active: isActive('/user-info') }"
          @click="toNavPath('UserInfo')"
        >
          帳號資料
        </li>
        <li
          class="nav__item"
          :class="{ active: isActive('/projects') }"
          @click="toNavPath('Projects')"
        >
          專案列表
        </li>
      </ul>
      <ul class="nav__items">
        <li
          class="nav__item"
          :class="{ active: isActive('/vg-items') }"
          @click="toNavPath('VGItems')"
          v-if="isShow('vg:CRUD')"
        >
          軸力計設定
        </li>
        <li
          class="nav__item"
          :class="{ active: isActive('/so-items') }"
          @click="toNavPath('SOItems')"
          v-if="isShow('soItem:CRUD')"
        >
          傾度管設定
        </li>
        <li
          class="nav__item"
          :class="{ active: isActive('/users') }"
          @click="toNavPath('Users')"
          v-if="isShow('account:CRUD')"
        >
          帳號設定
        </li>
        <li
          class="nav__item"
          :class="{
            active: isActive(['/projects-setting', '/project-phases'])
          }"
          v-if="isShow('project:CRUD')"
          @click="toggleProjectSubNav"
        >
          專案設定
          <ul class="nav__sub" v-if="projectSubMenuShow">
            <li
              class="nav__item"
              :class="{ active: isActive('/projects-setting') }"
              @click="toNavPath('ProjectsSetting')"
            >
              專案資料
            </li>
            <li
              class="nav__item"
              :class="{ active: isActive('/project-phases') }"
              @click="toNavPath('ProjectPhaseList')"
            >
              執行階段
            </li>
          </ul>
        </li>
        <li
          class="nav__item"
          :class="{ active: isActive('/permisson-setup') }"
          @click="toNavPath('PermissionSetup')"
          v-if="isShow('permission:CRUD')"
        >
          權限設定
        </li>
        <li class="nav__item" @click="logout">登出</li>
      </ul>
    </section>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Navbar',
  mixins: [ToPathMixin],
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      projectSubMenuShow: false,
      isShowNav: null,
      width: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initHidNav()
      window.addEventListener('orientationchange', this.initHidNav)
    })
  },
  beforeDestroy() {
    window.removeEventListener('orientationchange', this.initHidNav)
  },
  computed: {
    isLogined() {
      return !!this.$store.getters.token
    }
  },
  watch: {
    width() {
      this.isShowNav = this.width > 768
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    isShow(feature) {
      return (
        this.isLogined && this.$store.getters.myPermissions.includes(feature)
      )
    },
    toNavPath(path) {
      this.toPath(path)
      if (this.width <= 768) {
        //mobile
        this.isShowNav = false
      } else {
        //desktop
        this.projectSubMenuShow = false
      }
    },
    isActive(route) {
      if (Array.isArray(route)) {
        return route.some(item => item === this.$route.path)
      } else if (typeof route === 'string') {
        return this.$route.path === route
      }
    },
    initHidNav() {
      setTimeout(() => {
        this.width = document.body.clientWidth
      }, 20) // 等待行動裝置轉置的動畫時間 (min: 15, max)
    },
    toggleProjectSubNav(e) {
      if (e.target.innerText.split('\n').shift() === '專案設定') {
        this.projectSubMenuShow = !this.projectSubMenuShow
      }
    },
    toggleHidenNav() {
      this.isShowNav = !this.isShowNav
    }
  }
}
</script>

<style lang="scss" scoped>
$item_active_bgc: #434a50;
$nav_vgc: #545c64;

.web-title {
  font-size: 30px;
  padding: 15px;
  margin: 0;
}

.nav-container {
  position: relative;
}

.nav__items {
  padding: 0;
  margin: 0;
}

.nav__item {
  display: inline-block;
  line-height: 40px;
  @media screen and (max-width: 768px) {
    display: block;
  }
  padding: 0 15px;
  font-size: 14px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ffd04b;
  }
}

.nav__sub {
  position: absolute;
  z-index: 1;

  background: $nav_vgc;
  padding: 0;
  transform: translateX(-15px);
  @media screen and (max-width: 768px) {
    position: static;
    padding: 0;
    transform: translateX(0);
  }
  & > .nav__item {
    display: block;
  }
}

.nav__item.active {
  background: $item_active_bgc;
  .nav__sub {
    background: $item_active_bgc;
  }
}

.active {
  color: #ffd04b;
}

.el-header {
  padding: 0;
}

#menu {
  color: white;
  display: none;
  &:checked ~ #nav {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}

#nav {
  display: flex;
  justify-content: space-between;
  background: #545c64;
  @media screen and (max-width: 768px) {
    display: block;
  }
}

#burger {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    color: white;
    font-size: 30px;
    position: absolute;
    top: 15px;
    right: 15px;
  }
}

/* navbar for mobile */
</style>
