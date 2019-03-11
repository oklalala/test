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
        width="40">
      </el-table-column>
      <el-table-column
        prop="id"
        label="編號">
        <template slot-scope="scope">
          <h4 
            class="clickable"
            @click="readAndOpenCompanyDialog(scope.row.name)">
            {{ scope.row.id }}
          </h4>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名稱">
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增公司"
      :visible.sync="createCompanyDialogVisible">
      <el-input v-model="newCompanyName" placeholder="請輸入公司名稱"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="createCompany">
          確認
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
      this.newCompanyName = ''
      this.createCompanyDialogVisible = true
    },
    readAndOpenCompanyDialog(name) {
      this.newCompanyName = name
      this.createCompanyDialogVisible = true
    },
    createCompany() {
      this.$store.dispatch('createCompany', {
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
