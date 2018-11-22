<template>
  <nav class="layout-navbar">
    <h1 class="layout-navbar-title">大地監控</h1>
    <ul class="layout-navbar-menu">
      <div class="layout-navbar-menu-forUser">
        <li><router-link to="">帳號資料</router-link></li>
        <li><router-link to="">專案列表</router-link></li>
      </div>
      <div class="layout-navbar-menu-forAdmin">
        <li><router-link to="">傾度管設定</router-link></li>
        <li><router-link to="">帳號設定</router-link></li>
        <li><router-link to="">專案設定</router-link></li>
        <li><router-link to="">權限設定</router-link></li>
      </div>
      <li><router-link to="">登出</router-link></li>
    </ul>
  </nav>  
</template>

<script>
export default {
  name: 'Navbar'
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
