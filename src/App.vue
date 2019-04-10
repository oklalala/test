<!-- @format -->

<template>
  <div id="app">
    <el-container>
      <el-header height="auto">
        <navbar />
      </el-header>
      <el-main id="main">
        <div class="main-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
.el-header {
  background: #545c64;
  padding: 0;

  & + main {
    margin-top: 0;
    @media screen and (max-width: 768px) {
      margin-top: 40px;
    }
  }
}

.main-container {
  max-width: 768px;
  margin: auto;
}
</style>
