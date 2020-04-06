<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="号码">
          <el-input v-model="query.callee" placeholder="号码" />
        </el-form-item>

        <el-form-item label="白名单">
         <el-select v-model="query.isHit" placeholder="全部" clearable="">
           <el-option
             v-for="item in options"
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
      <el-table-column align="center" label="呼叫时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="被叫号码" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否白名单" width="220"  align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="呼叫标识"  align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>

    </el-table>
    <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />



  </div>
</template>

<script>
import { getList, destroy } from '@/api/user'

import Pagination from '@/components/Pagination'

export default {
  components: {

    'pb-pagination': Pagination
  },

  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        callee:null ,
        pageNo: 1,
        pageSize: 15
      },
      isHit:null,
      options:[
        {id:1,name:"是"},
        {id:0,name:"否"},
      ]

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
