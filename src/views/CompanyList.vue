<template>
  <div class="companyList">
    <h1>公司列表</h1>
    <el-row class="operationGroup" type='flex' justify="between">
      <el-col class="operationGroup-left" :sm='4'>
        <el-button type="primary" @click="deleteCompanies" v-if="!!deleteList.length">刪除</el-button>
      </el-col>
      <el-col class="operationGroup-right" :span='24' :sm='8'>
        <el-input v-model="newCompany.name" placeholder="新增公司名稱"></el-input>
        <el-button class='addButton' type="primary" @click="createCompany" v-if="!!newCompany.name">
          <i class="el-icon-plus"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="companyList"
      class="companyList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名稱">
        <template slot-scope="scope">
          <el-input 
            @blur="editCompany(scope.row.id,scope.row.name)"
            v-model="scope.row.name">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'companyList',
  mixins: [ToPathMixin],
  data() {
    return {
      deleteList: [],
      newCompany: {
        name: ''
      }
    }
  },
  computed: {
    companyList() {
      return JSON.parse(JSON.stringify(this.$store.getters.companies))
    }
  },
  methods: {
    createCompany() {
      this.$store.dispatch('createCompany', {
        name: this.newCompany.name
      })
    },
    deleteCompanies() {
      if (this.deleteList.length === 0) return
      this.$store
        .dispatch('deleteCompanies', this.deleteList)
        .then(() => {
          this.$message({
            message: `成功刪除 ${this.deleteList}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    },
    updateDeleteList(value) {
      this.deleteList = value.map(company => company.id)
    },
    editCompany(id, newName) {
      if (
        newName ===
        this.$store.getters.companies.filter(company => company.id == id)[0]
          .name
      )
        return
      this.$store.dispatch('updateCompany', {
        companyId: id,
        payload: { name: newName }
      }).then(() => {
          this.$message({
            message: `成功編輯 ${this.newName}`,
            type: 'success',
            center: true,
            duration: 1800
          })
        })
        .catch(e => {
          this.$message.error(`請重新檢查 ${e.response.data.result}`)
        })
    }
  }
}
</script>
