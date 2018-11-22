<template>
  <nav class="layout-navbar">
    <h1 class="layout-navbar-title">大地監控</h1>
    <ul class="layout-navbar-menu">
      <div class="layout-navbar-menu-forUser">
        <li><a href="#" @click="toPath()">帳號資料</a></li>
        <li><a href="#">專案列表</a></li>
      </div>
      <div class="layout-navbar-menu-forAdmin">
        <li><a href="#">傾度管設定</a></li>
        <li><a href="#">帳號設定</a></li>
        <li><a href="#">專案設定</a></li>
        <li><a href="#" @click="toPath('permissonSetup')">權限設定</a></li>
      </div>
      <li><a href="#" @click="logout">登出</a></li>
    </ul>
  </nav>  
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toPath(name) {
      this.$router.push({ name })
    },
    logout() {
      this.$store.dispatch('logout')
      this.toPath('Entry')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout {
  &-navbar {
    display: flex;
    &-title {
      flex: 1;
      display: flex;
      align-items: center;
    }
    &-menu {
      flex: 8;
      list-style-type: none;
      display: flex;
      padding-left: 0;
      li {
        margin: 20px;
        a {
          text-decoration: none;
        }
      }
      &-forUser {
        flex: 4;
        display: flex;
      }
      &-forAdmin {
        flex: 4;
        display: flex;
      }
    }
  }
}
</style>
