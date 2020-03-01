<template>
    <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query">
        <el-form-item label="交易类型" >
           <el-select v-model="query.tradeType" placeholder="交易类型" @change="fetchData" clearable>
             <el-option label="充值" value="1"></el-option>
             <el-option label="消费" value="2"></el-option>
             <el-option label="冲账" value="3"></el-option>
           </el-select> 
          
        </el-form-item>
      </el-form>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" width="170" label="交易时间">
        <template slot-scope="scope">
          {{scope.row.createdAt | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="交易类型" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.tradeType | tradeTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="交易金额" width="100" align="center">
        <template slot-scope="scope">
           {{scope.row.amount | numberFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="120" align="center">
        <template slot-scope="scope">
         系统管理员
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{scope.row.note}}
        </template>
      </el-table-column>
    </el-table>
    <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />
  </div>
</template>

<script>
import { getList } from '@/api/tenant/trade'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  components:{
      'pb-pagination':Pagination
  },  
  props:["id"],
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        productCode:'',  
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  filters:{
      formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
      tradeTypeFilter(type){
          const statusMap = {
                1: '充值',
                2: '消费',
                3: '冲账'
            }
      return statusMap[type]
      },
      numberFormat(val) {
        val = val/1000;    
        val = val + ''
        var pattern = /(?=((?!\b)\d{3})+$)/g
        return val.replace(pattern, ',')
    }  
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.query.tenantId = this.id
      getList(this.query).then(response => {
        const { data } = response
        this.list = data.list
        this.total = data.total
        this.query.pageNo = data.pageNum
        this.query.pageSize = data.pageSize
        this.listLoading = false
      })
    },
    pageChange(data) {
      if (data.pageNo) {
        this.query.pageNo = data.pageNo
      } else if (data.pageSize) {
        this.query.pageSize = data.pageSize
      }
      this.fetchData()
    },
  }
}
</script>

<style scoped>
    .app-container{
        margin-top:-15px;
     }
    .query-form-box .el-form-item{
        width:40%;
    }
</style>