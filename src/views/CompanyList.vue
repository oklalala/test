<template>
  <div class="companyList">
    <div class="operationGroup">
      <div class="operationGroup-left">
        <el-button type="primary" @click="openCompanyDialog">新增</el-button>
      </div>
      <div class="operationGroup-right">
        <el-button
          type="primary"
          v-if="hasDeleteItems"
          @click="deleteCompany">
          刪除
        </el-button>
      </div>
    </div>
    <el-table
      :data="companyList"
      class="companyList-table"
      @selection-change="updateDeleteList">
      <el-table-column
        type="selection"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="編號"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名稱"
        width="180">
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="toPath('CreateUser')">
      離開
    </el-button>
    <el-dialog
      title="新增公司"
      :visible.sync="createCompanyDialogVisible">
      <el-input v-model="newCompanyID" placeholder="請輸入公司 ID"></el-input>
      <el-input v-model="newCompanyName" placeholder="請輸入公司名稱"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="createCompany">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ToPathMixin from '@/mixins/ToPath'
export default {
  name: 'CompanyList',
  mixins: [ToPathMixin],
  data() {
    return {
      createCompanyDialogVisible: false,
      deleteList: [],
      newCompanyID: null,
      newCompanyName: null
    }
  },
  computed: {
    hasDeleteItems() {
      return this.deleteList.length > 0
    },
    companyList() {
      return this.$store.getters.companies
    }
  },
  methods: {
    openCompanyDialog() {
      this.createCompanyDialogVisible = true
    },
    createCompany() {
      this.$store.dispatch('createCompany', {
        id: this.newCompanyID,
        name: this.newCompanyName
      })
      this.createCompanyDialogVisible = false
    },
    deleteCompany() {
      if (this.deleteList.length === 0) return
      this.$store.dispatch('deleteCompanies', this.deleteList)
    },
    updateDeleteList(value) {
      this.deleteList = value.map(company => company.id)
    }
  }
}
</script>

<style lang="scss">
</style>
