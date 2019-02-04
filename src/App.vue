<template>
  <div id="app">
    <el-container>
      <el-header height='120px'>
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
