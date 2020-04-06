<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="开始日期">
           <el-date-picker
                v-model="query.beginAt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
              </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
           <el-date-picker
                v-model="query.endAt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束日期">
              </el-date-picker>
        </el-form-item>

        <!-- <el-form-item label="用户名">
          <el-input v-model="query.userName" placeholder="用户名" />
        </el-form-item>
 -->
        <el-form-item class="form-btns">
          <el-button type="primary" size="small" @click="fetchData">查询</el-button>
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
      <el-table-column align="center" label="消费时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.createdAt | formatDate }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="消费金额" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount | amountFormat }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="备注"  align="center">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>

    </el-table>
    <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />



  </div>
</template>

<script>
import { getList } from '@/api/tenant/trade'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  components: {
    'pb-pagination': Pagination
  },
  filters: {
    formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    amountFormat(value){
      value = value / 10000
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return val.replace(pattern, ',')
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
        resultType:2,
        beginAt: null,
        endAt: null
      },
      tradeId:null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
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
    }
  }
}
</script>
