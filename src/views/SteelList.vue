<template>
  <div class="steelList">
    <h1>鋼材資料</h1>
    <h3>新增鋼材</h3>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newSteel">
      <el-form-item label="型號">
        <el-input v-model="newSteel.name"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="ES ( kg/cm^2 )">
            <el-input v-model.number="newSteel.es"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">        
          <el-form-item label="TCM">
            <el-input v-model.number="newSteel.tcm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="TCG">
            <el-input v-model.number="newSteel.tcg"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截面積 ( cm^2 )">
            <el-input v-model.number="newSteel.sectionArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="createSteel">
        <i class="el-icon-plus"></i>
      </el-button>
    </el-form>

    <h3>鋼材列表</h3>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="deleteSteels">刪除</el-button>
      </div>
      <!-- <div class="operationGroup-right">
        <el-input v-model="newSteel.number"></el-input>
        <el-button type="primary" @click="createSteel">
          <i class="el-icon-plus"></i>
        </el-button>
      </div> -->
    </div>
    <el-table
      :data="steelList"
      class="steelList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        :selectable="checkable"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="鋼材名稱"
        width="100">
        <template slot-scope="scope">
          <span class="clickable"
            @click="loadSteel(scope.row)">
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sectionArea"
        label="截面積 (cm^2)"
        width="140">
      </el-table-column>
      <el-table-column
        prop="es"
        label="ES (kg/cm^2)"
        width="140">
      </el-table-column>
      <el-table-column
        prop="tcm"
        label="TCM"
        width="140">
      </el-table-column>
      <el-table-column
        prop="tcg"
        label="TCG"
        width="240">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath';
export default {
  number: 'SteelList',

  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      newSteel: {
        name: '',
        sectionArea: 0,
        es: 0,
        tcm: 0,
        tcg: 0
      },
    }
  },
  computed: {
    steelList() {
      return this.$store.getters.steels
    }
  },
  methods: {
    reset() {
      this.newSteel = {
        name: '',
        sectionArea: 0,
        es: 0,
        tcm: 0,
        tcg: 0
      }
    },
    createSteel() {
      if ( !this.newSteel.number ) alert("Enter the steel's name PLZ")
        this.$store.dispatch('createSteel', this.newSteel).then(() => {
        this.reset()
        this.toPath('SteelList')
      })
    },
    deleteSteels() {
      if ( this.deleteList.length === 0 ) return
      this.$store.dispatch('deleteSteels', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(steel => steel.id)
    },
    checkable(row, index) {
      return !row.projectName
    },
    editSteel(id,newNumber) {
      this.$store
        .dispatch('updateSteel', {
          steelId: id,
          payload: {number: newNumber}
        })
        .then(() => {
          this.reset()
        })
    },
    loadSteel(steelObj) {
      this.newSteel = {
        name: steelObj.name,
        sectionArea: steelObj.sectionArea,
        es: steelObj.es,
        tcm: steelObj.tcm,
        tcg: steelObj.tcg
      }
    }
  }
}
</script>
