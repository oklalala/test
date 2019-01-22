<template>
  <div class="user-info">
    <el-form>
      <section>
      <h1>傾度管設備 配置</h1>
        <h2>基本資料</h2>
          <el-form-item label="編號" required>
            <el-input
              v-model="newSO.number"
              placeholder="請輸入編號">
            </el-input>
          </el-form-item>
          <el-form-item label="廠牌型號" required>
            <el-select
              v-model="newSO.soModelId"
              @change="initSOModelParameters"
              placeholder="請選擇"
              style="width: 100%">
              <el-option
                v-for="model in soModels"
                :key="model.id"
                :label="model.name"
                :value="model.id">
              </el-option>
            </el-select>
          </el-form-item>
      </section>
      <template v-if="!!newSO.soModelId">
        <h1>傾度管 參數</h1>
        <section>
          <el-table
            :data="soModelParameters"
            style="width: 100%">
            <el-table-column
              prop="key"
              label="參數名稱"
              width="180">
            </el-table-column>
            <el-table-column
              prop="value"
              label="參數值">
              <template slot-scope="scope">
                <el-input 
                @keyup.native="editSO(scope.row.key,scope.row.value)"
                v-model.number="scope.row.value">
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
        <el-table
          :data="soModelMeasurable"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="欄位名稱"
            width="180">
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
  name: 'SOCreate',
  mixins: [ToPathMixin],
  data() {
    return {
      newSO: {
        number: "",
        soModelId: "",
        parameters: {
          c9: 0,
          c8: 0,
          c7: 0,
          c6: 0,
          c5: 0,
          c4: 0,
          c3: 0,
          c2: 0,
          c1: 0,
          c0: 0,
          length: 0
        }
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
      ]
      // soModel: {
      //   "id": "",
      //   "name": "",
      //   "parameters": {
      //     // "c0": 0.000134,
      //     // "c1": 0.000135,
      //     // "c2": 0.000136,
      //     // "c3": 0.000137,
      //     // "c4": 0.000138,
      //     // "c5": 0.000139,
      //     // "c6": 0.00013,
      //     // "c7": 0.000131,
      //     // "c8": 0.000132,
      //     // "c9": 0.000133
      //   },
      //   "measurable": [
      //     // "日期",
      //     // "溫度",
      //     // "偏移量"
      //   ]
      // }
    }
  },
  computed: {
    soModels() {
      return this.$store.getters.soModels
    },
    soModel() {
      return this.soModels.filter(item => item.id == this.newSO.soModelId)[0]
    },
    soModelMeasurable() {
      var measurableArr = this.soModel.measurable
      var soModelMeasurable = []
      measurableArr.forEach(item => {
        soModelMeasurable.push({name: item})
      })
      return soModelMeasurable
    }
  },
  methods: {
    initNewSO() {
      this.newSO = {
        parameters: {
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
      }
    },
    resetSOModels() {
      this.soModelParameters = [
        {key: 'C9', value: 0},
        {key: 'C8', value: 0},
        {key: 'C7', value: 0},
        {key: 'C6', value: 0},
        {key: 'C5', value: 0},
        {key: 'C4', value: 0},
        {key: 'C3', value: 0},
        {key: 'C2', value: 0},
        {key: 'C1', value: 0},
        {key: 'C0', value: 0},
        {key: 'length ( m )', value: 0},
        ]
      this.newSO.parameters = {
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
    initSOModelParameters() {
      var parametersObj = this.soModel.parameters || {}
      this.newSO.parameters = parametersObj
      for (var key in parametersObj){
        this.soModelParameters.push({key: key, value: parametersObj[key]})
      }
    },
    editSO(key, value) {
      this.newSO.parameters[key] = value
    },
    cancel() {
      this.toPath('SOItems')
    },
    submit() {
      this.$store.dispatch('createSOItem', this.newSO).then(() => {
        this.toPath('SOItems')
      })
    }
  }
}
</script>
