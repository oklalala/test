<template>
  <div id="app">
    <el-container>
      <el-header>
        <navbar/>
      </el-header>
      <el-main id='main'>
        <el-row type='flex' justify='center'>  
          <el-col :span='22' :sm='18' :md='14'>
            <router-view></router-view>
          </el-col>
        </el-row>
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
@media screen and (min-width: 600px) {
  #main {
    padding-top: 60px;
  }
} 
</style>

