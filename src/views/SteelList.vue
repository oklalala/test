<template>
  <div class="steelList">
    <h1>鋼材資料</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="newSteel"
      :rules="rules">
      <h3>新增鋼材</h3>
      <el-form-item label="型號" prop='name'>
        <el-input v-model="newSteel.name" :disabled="!isShow"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="ES ( kg/cm^2 )" prop='es'>
            <el-input v-model.number="newSteel.es" :disabled="!isShow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">        
          <el-form-item label="TCM" prop='tcm'>
            <el-input v-model.number="newSteel.tcm" :disabled="!isShow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="TCG" prop='tcg'>
            <el-input v-model.number="newSteel.tcg" :disabled="!isShow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截面積 ( cm^2 )" prop='sectionArea'>
            <el-input v-model.number="newSteel.sectionArea" :disabled="!isShow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="createSteel" v-if="!isEdit" :disabled="passRequired">
        新增鋼材
      </el-button>
      <el-button type="primary" @click="editSteel" v-if="isEdit" :disabled="passRequired">
        編輯鋼材
      </el-button>
    </el-form>

    <h3>鋼材列表</h3>
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button @click="addSteel">新增</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button type="primary" @click="deleteSteels" v-show="deletable">刪除</el-button>
      </div>
    </div>
    <el-table
      :data="steelList"
      class="steelList-table"
      :highlight-current-row="isEdit"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        :selectable="checkable"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="鋼材名稱"
        width="200">
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="es"
        label="ES (kg/cm^2)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tcm"
        label="TCM"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tcg"
        label="TCG"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  number: 'SteelList',

  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      choosedId: '',
      newSteel: {
        name: '',
        sectionArea: '',
        es: '',
        tcm: '',
        tcg: ''
      },
      rules: {
        name: [{ required: true, message: '請輸入鋼材名稱', trigger: 'blur' }],
        tcg: [{ required: true, message: '請輸入 TCG', trigger: 'blur' }],
        tcm: [{ required: true, message: '請輸入 TCM', trigger: 'blur' }],
        es: [{ required: true, message: '請輸入 ES', trigger: 'blur' }],
        sectionArea: [
          { required: true, message: '請輸入截面積', trigger: 'blur' }
        ]
      },
      isEdit: false,
      isShow: false
    }
  },
  computed: {
    steelList() {
      return this.$store.getters.steels
    },
    deletable() {
      return this.deleteList.length != 0
    },
    passRequired() {
      let name = this.newSteel.name
      let sectionArea = this.newSteel.sectionArea
      let es = this.newSteel.es
      let tcm = this.newSteel.tcm
      let tcg = this.newSteel.tcg
      console.log(name, sectionArea, es, tcm, tcg)
      return !(name && sectionArea && es && tcm && tcg)
    }
  },
  methods: {
    resetInput() {
      this.choosedId = ''
      this.newSteel = {
        name: '',
        sectionArea: '',
        es: '',
        tcm: '',
        tcg: ''
      }
    },
    addSteel() {
      this.resetInput()
      this.isEdit = false
      this.isShow = true
    },
    createSteel() {
      this.$store
        .dispatch('createSteel', this.newSteel)
        .then(() => {
          this.resetTable()
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    deleteSteels() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteSteels', this.deleteList)
      this.resetTable()
    },
    updateDeleteList(value) {
      this.isEdit = true
      this.deleteList = value.map(steel => steel.id)
    },
    checkable(row) {
      return !row.projectName
    },
    editSteel() {
      this.$store
        .dispatch('updateSteel', {
          steelId: this.choosedId,
          payload: this.newSteel
        })
        .then(() => {
          this.resetTable()
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    loadSteel(steelObj) {
      this.isEdit = true
      this.isShow = true
      this.choosedId = steelObj.id
      this.newSteel = {
        name: steelObj.name,
        sectionArea: steelObj.sectionArea,
        es: steelObj.es,
        tcm: steelObj.tcm,
        tcg: steelObj.tcg
      }
    },
    resetTable() {
      this.$store.dispatch('getSteels').then(() => {
        this.isEdit = false
        this.resetInput()
        this.isShow = false
      })
    }
  }
}
</script>
