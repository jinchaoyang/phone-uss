<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" >
        <el-form-item label="名称">
          <el-input v-model="query.name" placeholder="名称"></el-input>
        </el-form-item>
    
        <el-form-item class="form-btns">
          <el-button type="primary" @click="onSubmit" >查询</el-button>
          <el-button type="success" @click="onSubmit" >新增</el-button>
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
      <el-table-column align="center" label="aa" width="220">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
    
      <el-table-column label="用户名" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="220" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span>操作</span>
        </template>
      </el-table-column>
    </el-table>
     
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      query: {

      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
  

  }
}
</script>
