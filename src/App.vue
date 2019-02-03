<template>
  <div id="app">
    <el-container>
      <el-header>
        <navbar/>
      </el-header>
      <el-main id='main'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
#main {
  padding: 60px 10px;
}
</style>
