<template>
  <div id="app">
    <el-row :gutter="20">
      <navbar/>
      <el-col :span="18" :offset="6">
        <router-view></router-view>
      </el-col>
    </el-row>
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
</style>
