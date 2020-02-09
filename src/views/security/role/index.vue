<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="query.name" placeholder="角色名"></el-input>
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
      <el-table-column align="center" label="角色名" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="更新时间" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
    
      
      
      <el-table-column align="center"  width="80"  label="操作">
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
    }
  }
}
</script>
