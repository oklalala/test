<!-- @format -->

<template>
  <div class="so-item-create">
    <el-form>
      <section>
        <h1>傾度管設備 配置</h1>
        <h2>基本資料</h2>
        <el-form-item label="編號" required>
          <el-input v-model="soNumber" placeholder="請輸入編號"> </el-input>
        </el-form-item>
        <el-form-item label="廠牌型號" required>
          <el-select
            v-model="soModel"
            value-key="id"
            placeholder="請選擇"
            style="width: 100%"
          >
            <el-option
              v-for="model in soModelsOptions"
              :key="model.id"
              :label="model.name"
              :value="model"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </section>
      <template v-if="!!soItem.soModel.id">
        <h2>傾度管參數</h2>
        <el-form-item>
          <el-button type="primary" plain @click="useModelParameters">
            恢復原廠值
          </el-button>
        </el-form-item>
        <section>
          <el-form-item>
            <el-table :data="soItemParameters" style="width: 100%">
              <el-table-column prop="key" label="參數名稱" width="100">
              </el-table-column>
              <el-table-column prop="value" label="參數值">
                <template slot-scope="scope">
                  <el-input-number
                    controls-position="right"
                    v-model="scope.row.value"
                    @change="updateSoParameter(scope.row)"
                  >
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button @click="toPath('SOItems')">
              回上一頁
            </el-button>
            <el-button type="primary" @click="onSubmit">
              確定送出
            </el-button>
          </el-form-item>
        </section>
      </template>
    </el-form>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'

export default {
  name: 'SOItemCreate',
  mixins: [ToPathMixin],
  computed: {
    soNumber: {
      get() {
        return this.$store.getters.soItem.number
      },
      set(value) {
        this.$store.commit('soItemNumber', value)
      }
    },
    soModel: {
      get() {
        return this.$store.getters.soItem.soModel
      },
      set(value) {
        this.$store.dispatch('soModelOfItem', value)
      }
    },
    soModelsOptions() {
      return this.$store.getters.soModels
    },
    soItem() {
      return this.$store.getters.soItem
    },
    soItemParameters() {
      return this.$store.getters.soItemParameters
    }
  },
  methods: {
    useModelParameters() {
      this.$store.dispatch('useModelParameters', this.soItem.soModel.id)
    },
    updateSoParameter({ key, value }) {
      this.$store.commit('soItemParameter', {
        key,
        value
      })
    },
    onSubmit() {
      this.$store
        .dispatch('createSOItem')
        .then(() => {
          this.$message({
            message: `成功新增 ${this.soItem.number}`,
            type: 'success',
            center: true,
            duration: 1800
          })
          this.toPath('SOItems')
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.message}`)
        })
    }
  }
}
</script>
