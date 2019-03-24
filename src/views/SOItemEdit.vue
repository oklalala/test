<!-- @format -->

<template>
  <div class="user-info">
    <el-form>
      <section>
        <h1>傾度管設備 配置</h1>
        <h2>基本資料</h2>
        <el-form-item label="編號" required>
          <el-input v-model="newSOItem.number" placeholder="請輸入編號">
          </el-input>
        </el-form-item>
        <el-form-item label="廠牌型號" required>
          <el-select
            v-model="newSOItem.soModelId"
            @change="initSOModelParameters"
            placeholder="請選擇"
            style="width: 100%"
          >
            <el-option
              v-for="model in soModels"
              :key="model.id"
              :label="model.name"
              :value="model.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </section>
      <template v-if="!!newSOItem.soModelId">
        <h1>傾度管 參數</h1>
        <section>
          <el-table :data="soModelParameters" style="width: 100%">
            <el-table-column prop="key" label="參數名稱" width="180">
            </el-table-column>
            <el-table-column prop="value" label="參數值">
              <template slot-scope="scope">
                <el-input
                  @blur="editSO(scope.row.key, scope.row.value)"
                  v-model.number="scope.row.value"
                >
                </el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="button-container">
            <el-button type="primary" @click="resetSOModels">
              清除參數值
            </el-button>
          </div>
        </section>
        <el-table :data="soModelMeasurable" style="width: 100%">
          <el-table-column prop="name" label="欄位名稱" width="180">
          </el-table-column>
        </el-table>
        <div class="button-container">
          <el-button type="warning" @click="cancel">
            取消
          </el-button>
          <el-button type="primary" @click="submit">
            確定送出
          </el-button>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'SOItemEdit',
  mixins: [ToPathMixin],
  created() {
    if (this.$route.params.soId) {
      this.loadSOItem(this.$route.params.soId).then(() => {
        this.initSOModelParameters()
      })
    }
  },
  data() {
    return {
      newSOItem: {
        number: '',
        soModelId: '',
        parameters: {}
      },
      soModelParameters: [
        //   {key: 'C9', value: 0},
        //   {key: 'C8', value: 0},
        //   {key: 'C7', value: 0},
        //   {key: 'C6', value: 0},
        //   {key: 'C5', value: 0},
        //   {key: 'C4', value: 0},
        //   {key: 'C3', value: 0},
        //   {key: 'C2', value: 0},
        //   {key: 'C1', value: 0},
        //   {key: 'C0', value: 0},
        //   {key: 'length ( m )', value: 0},
      ],
      soModel: {
        //   "id": "",
        //   "name": "",
        //   "parameters": {
        // "c0": 0.000134,
        // "c1": 0.000135,
        // "c2": 0.000136,
        // "c3": 0.000137,
        // "c4": 0.000138,
        // "c5": 0.000139,
        // "c6": 0.00013,
        // "c7": 0.000131,
        // "c8": 0.000132,
        // "c9": 0.000133
        //   },
        //   "measurable": [
        // "日期",
        // "溫度",
        // "偏移量"
        //   ]
      }
    }
  },
  watch: {
    'newSOItem.soModelId': function(soModelId) {
      if (!soModelId) return
      this.soModel = this.soModels.filter(item => item.id === soModelId)[0]
    }
  },
  computed: {
    soModels() {
      return this.$store.getters.soModels
    },
    soModelMeasurable() {
      var measurableArr = this.soModel.measurable || []
      var soModelMeasurable = []
      measurableArr.forEach(item => {
        soModelMeasurable.push({ name: item })
      })
      return soModelMeasurable
    }
  },
  methods: {
    resetSOModels() {
      this.soModelParameters = [
        { key: 'C9', value: 0 },
        { key: 'C8', value: 0 },
        { key: 'C7', value: 0 },
        { key: 'C6', value: 0 },
        { key: 'C5', value: 0 },
        { key: 'C4', value: 0 },
        { key: 'C3', value: 0 },
        { key: 'C2', value: 0 },
        { key: 'C1', value: 0 },
        { key: 'C0', value: 0 },
        { key: 'length ( m )', value: 0 }
      ]
      this.newSOItem.parameters = {
        C9: 0,
        C8: 0,
        C7: 0,
        C6: 0,
        C5: 0,
        C4: 0,
        C3: 0,
        C2: 0,
        C1: 0,
        C0: 0,
        length: 0
      }
    },
    loadSOItem(soItemId) {
      return this.$store.dispatch('getSOItem', soItemId).then(res => {
        let soItem = res.data.data
        this.newSOItem = {
          number: soItem.number,
          parameters: soItem.parameters,
          soModelId: soItem.soModel.id
        }
      })
    },
    initSOModelParameters() {
      var parametersObj = this.newSOItem.parameters
      this.newSOItem.parameters = parametersObj
      for (var key in parametersObj) {
        this.soModelParameters.push({ key: key, value: parametersObj[key] })
      }
    },
    editSO(key, value) {
      this.newSOItem.parameters[key] = value
    },
    cancel() {
      this.toPath('SOItemList')
    },
    submit() {
      this.$store
        .dispatch('updateSOItem', {
          soId: this.$route.params.soId,
          payload: this.newSOItem
        })
        .then(() => {
          this.$message({
            message: `成功編輯 ${this.newSOItem.number}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('SOItemList')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    }
  }
}
</script>
