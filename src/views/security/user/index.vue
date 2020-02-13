<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
           <el-input v-model="query.userName" placeholder="用户名"></el-input>
        </el-form-item>
    
        <el-form-item class="form-btns">
          <el-button type="primary" @click="fetchData"  size="small">查询</el-button>
          <el-button type="success" @click="onSubmit"  size="small">新增</el-button>
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
      <el-table-column align="center" label="姓名" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
    
      <el-table-column label="用户名" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="220" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        </div>
  </div>
</template>

<script>
import { getList } from '@/api/user'

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
      total: 0,
      query: {
        name:'',
        userName:'',
        pageNo: 1,
        pageSize: 15
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.query).then(response => {
        const { data } = response;
        this.list = data.list;
        this.total = data.total;
        this.query.pageNo = data.pageNum;
        this.query.pageSize = data.pageSize;
        this.listLoading = false;
      })
    },
      handleSizeChange(val) {
        console.log('xxxx');
    },
    handleCurrentChange(val) {
    console.log('xxxx');
    },
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>
