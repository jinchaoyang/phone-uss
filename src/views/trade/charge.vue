<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="交易类型">
          <el-select v-model="query.tradeType" placeholder="全部" clearable="">
            <el-option
              v-for="item in tradeTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="query.payType" placeholder="全部" clearable="">
            <el-option
              v-for="item in payTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>


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
      <el-table-column align="center" label="交易时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.createdAt | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="交易类型" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeType | tradeTypeFilter  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.payType | payTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="交易金额" width="180" align="center">
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
    payTypeFilter(payType) {
      const map = {
        'alipay':"支付宝",
        'wx': '微信',
        'other': '其他'
      }
      return map[payType]
    },
    tradeTypeFilter(tradeType){
      const map = {
        1: '充值',
        2: '消费',
        3: '冲账'
      }
      return map[tradeType];
    },
    formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    amountFormat(value){
      value = (value / 10000)+''
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return value.replace(pattern, ',')
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        payType: null,
        tradeType:null,
        pageNo: 1,
        pageSize: 10,
        resultType:1
      },
      tradeTypes:[
        {id:"1",name:"充值"},
        {id:"2",name:"冲账"},
      ],
      payTypes:[
        {id:"alipay",name:"支付宝"},
        {id:"wx",name:"微信"},
        {id:"other",name:"其他"},
      ],
      showView: false,
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
    },
    /**
     * 查看交易详情
     */
    show(row) {
      this.tradeId = row.id
      this.showView = true
    }
  }
}
</script>
