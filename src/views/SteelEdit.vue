<!-- @format -->

<template>
  <div class="steel-edit">
    <h1>鋼材資料</h1>
    <el-form
      label-position="top"
      label-width="80px"
      :model="steel"
      :rules="rules"
    >
      <el-form-item label="型號" prop="name">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="ES ( kg/cm^2 )" prop="es">
            <el-input v-model.number="es"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="TCM" prop="tcm">
            <el-input v-model.number="tcm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="TCG" prop="tcg">
            <el-input v-model.number="tcg"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="截面積 ( cm^2 )" prop="sectionArea">
            <el-input v-model.number="sectionArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="toPath('Steels')">
          回上一頁
        </el-button>
        <el-button type="primary" @click="onSubmit">
          確定送出
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      rules: {
        name: [
          {
            required: true,
            message: '請輸入鋼材名稱',
            trigger: 'blur'
          }
        ],
        tcg: [
          {
            required: true,
            message: '請輸入 TCG',
            trigger: 'blur'
          }
        ],
        tcm: [
          {
            required: true,
            message: '請輸入 TCM',
            trigger: 'blur'
          }
        ],
        es: [
          {
            required: true,
            message: '請輸入 ES',
            trigger: 'blur'
          }
        ],
        sectionArea: [
          {
            required: true,
            message: '請輸入截面積',
            trigger: 'blur'
          }
        ]
      },
      isEdit: false,
      isShow: false
    }
  },
  computed: {
    steel() {
      return this.$store.getters.steel
    },
    deletable() {
      return this.deleteList.length != 0
    },
    name: {
      get() {
        return this.$store.getters.steel.name
      },
      set(value) {
        this.$store.commit('steelName', value)
      }
    },
    sectionArea: {
      get() {
        return this.$store.getters.steel.sectionArea
      },
      set(value) {
        this.$store.commit('steelSectionArea', value)
      }
    },
    es: {
      get() {
        return this.$store.getters.steel.es
      },
      set(value) {
        this.$store.commit('steelEs', value)
      }
    },
    tcm: {
      get() {
        return this.$store.getters.steel.tcm
      },
      set(value) {
        this.$store.commit('steelTcm', value)
      }
    },
    tcg: {
      get() {
        return this.$store.getters.steel.tcg
      },
      set(value) {
        this.$store.commit('steelTcg', value)
      }
    }
  },
  methods: {
    addSteel() {
      this.resetInput()
      this.isEdit = false
      this.isShow = true
    },
    updateDeleteList(value) {
      this.isEdit = true
      this.deleteList = value.map(steel => steel.id)
    },
    onSubmit() {
      this.$store
        .dispatch('updateSteel', this.$route.params.steelId)
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.steel.name}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('Steels')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    }
  },
  resetTable() {
    this.$store.dispatch('fetchSteels').then(() => {
      this.isEdit = false
      this.resetInput()
      this.isShow = false
    })
  }
}
</script>
