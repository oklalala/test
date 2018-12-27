<template lang="html">
<div class="measuresSo">
  <h1>傾度管量測</h1>
  <el-form label-width="100px" label-position="left">
    <section>
      <h2>基本資料</h2>
      <p>案號：</p>
      <p>名稱：</p>
    </section>
    <section>
      <h2>量測作業</h2>
      <el-form-item label="專案階段">
        <el-select v-model="value" placeholder="第一次開挖">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="請度管編號">
        <el-select v-model="value" placeholder="SO-01">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="WISE IP">
        <el-input :value="IP" >
        </el-input>
      </el-form-item>
      <el-form-item label="請由上往下量，間隔 1m 量測一次" label-width="300px">
      </el-form-item>
    <el-button @click="measures">量測</el-button>
    </section>
    <section v-if="measuresDatas.length">
      fuck
    </section>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      IP: "192.168.50.200",
      measuresDatas: [],
    }
  },
  methods: {
    measures: function() {
      this.measuresDatas.push("fuck")
    }
  }
}
</script>
