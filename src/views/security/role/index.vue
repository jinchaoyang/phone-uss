<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="query.name" placeholder="角色名" />
        </el-form-item>

        <el-form-item class="form-btns">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="success" @click="add">新增</el-button>
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
      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="操作">
        <template slot-scope="scope">
          <span>操作</span>
        </template>
      </el-table-column>
    </el-table>
   <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />


    <el-drawer
      :title="drawer.title"
      :visible.sync="drawer.show"
      destroy-on-close
      direction="rtl"
      size="50%"
      ref="drawerBox"
    >
      <role-add @createSuccess="onSuccess" :mode="drawer.mode" :id="id" ></role-add>
    </el-drawer>

  </div>
</template>

<script>
import { getList } from '@/api/security/role'
import addView from './add'
import Pagination from '@/components/Pagination'


export default {
  components:{
     "role-add":addView,
     'pb-pagination': Pagination
  },
  data() {
    return {
      list: null,
      listLoading: true,
      drawer:{
          title:'',
          show: false,
          mode: ''
      },
      query: {
        pageNo:1,
        pageSize:15,
        name:null
      },
      total:0,
      id:''
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
    onSuccess(){
      this.$refs["drawerBox"].closeDrawer();
      this.fetchData();
    },
    pageChange(data) {
      if (data.pageNo) {
        this.query.pageNo = data.pageNo
      } else if (data.pageSize) {
        this.query.pageSize = data.pageSize
      }
      this.fetchData()
    },
    search(){
      this.query.pageNo = 1
      this.fetchData()
    },
    add(){
      let drawer = {
          title: '新增角色',
          show: true,
          mode: 'add'
      }
      this.drawer = drawer
    }
  }
}
</script>
