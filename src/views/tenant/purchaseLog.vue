<template>
    <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query">
        <el-form-item label="产品服务">
           <el-select v-model="query.productCode" placeholder="产品服务" @change="fetchData" clearable>
             <el-option label="黑名单" value="1001"></el-option>
             <el-option label="白名单" value="1002"></el-option>
           </el-select> 
          
        </el-form-item>

        <!-- <el-form-item class="form-btns">
          <el-button type="success" size="small" @click="add()">充值</el-button>
          <el-button type="danger" size="small" @click="add()">冲账</el-button>
        </el-form-item> -->
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
      <el-table-column align="center" width="170" label="购买时间">
        <template slot-scope="scope">
         {{scope.row.createdAt | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="产品服务" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.productCode | productTypeFilter}}
        </template>
      </el-table-column>
        <el-table-column label="账单类型" width="100" align="center">
        <template slot-scope="scope">
           {{scope.row.billType | billTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.fee | numberFormat}}
        </template>
      </el-table-column>
      <el-table-column label="购买时长" width="120" align="center">
        <template slot-scope="scope">
         {{scope.row.duration}}
        </template>
      </el-table-column>
      <el-table-column label="总额" align="center">
        <template slot-scope="scope">
          {{scope.row.amount |  numberFormat}}
        </template>
      </el-table-column>
    </el-table>
    <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />
  </div>
</template>

<script>
import { getList  } from '@/api/tenant/bill'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  props:["id"],
  components:{
      'pb-pagination':Pagination
  },  
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
  created() {
    this.fetchData()
  },
  filters:{
      formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
      productTypeFilter(type){
          const statusMap = {
                '1001': '黑名单',
                '1002': '白名单'
            }
      return statusMap[type]
      },
      billTypeFilter(type){
          const statusMap = {
                '1': '包月费用',
                '2': '接口调用费'
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