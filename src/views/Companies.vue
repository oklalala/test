<!-- @format -->

<template>
  <div class="companies">
    <h1>公司列表</h1>
    <el-row class="operationGroup" type="flex" justify="between">
      <el-col class="operationGroup-left" :span="4">
        <el-button
          type="danger"
          @click="deleteCompanies"
          v-if="!!deleteCompaniesId.length"
          >刪除</el-button
        >
      </el-col>
      <el-col class="operationGroup-right" :xs="18" :sm="8">
        <el-input v-model="newCompanyName" placeholder="新增公司名稱">
          <el-button
            slot="append"
            @click="sendNewCompany"
            :disabled="!newCompanyName"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="companies"
      class="companies-table"
      @selection-change="updateDeleteList"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="name" label="公司名稱">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            @focus="beforeEdit(scope.row.id, scope.row.name)"
            @blur="afterEdit(scope.row.id, scope.row.name)"
          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  mixins: [ToPathMixin],
  data() {
    return {
      oldCompany: {
        id: '',
        name: ''
      },
      deleteCompaniesId: [],
      newCompanyName: ''
    }
  },
  computed: {
    companies() {
      return this.$store.getters.companies
    }
  },
  methods: {
    async sendNewCompany() {
      try {
        await this.$store.dispatch('createCompany', {
          name: this.newCompanyName
        })
        this.$message({
          message: `成功新增 ${this.newCompanyName}`,
          type: 'success',
          center: true,
          duration: 1800
        })
        this.newCompanyName = ''
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    },
    async deleteCompanies() {
      if (this.deleteCompaniesId.length === 0) return

      try {
        await this.$confirm('確定要刪除？', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
        return
      }

      try {
        await this.$store.dispatch('deleteCompanies', this.deleteCompaniesId)
        this.$message({
          message: `成功刪除`,
          type: 'success',
          center: true,
          duration: 1800
        })
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    },
    updateDeleteList(value) {
      this.deleteCompaniesId = value.map(company => company.id)
    },
    beforeEdit(id, name) {
      this.oldCompany = {
        id,
        name
      }
    },
    async afterEdit(id, name) {
      try {
        if (name === this.oldCompany.name) return // not change
        await this.$store.dispatch('updateCompany', {
          id,
          payload: { name }
        })
        this.$message({
          message: `成功編輯 ${this.oldCompany.name} → ${name}`,
          type: 'success',
          center: true,
          duration: 1800
        })
      } catch (e) {
        this.$message.error(`請重新檢查 ${e.message}`)
      }
    }
  }
}
</script>
