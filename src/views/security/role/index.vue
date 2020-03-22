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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | formatDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="show(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="destroy(scope.row)">删除</el-button>
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
      <role-add @createSuccess="onSuccess" :mode="drawer.mode" :id="id" v-if="drawer.view=='add'"></role-add>
      <role-show  :id="id" v-if="drawer.view=='show'"></role-show>
    </el-drawer>

  </div>
</template>

<script>
import { getList , destroy } from '@/api/security/role'
import addView from './add'
import showView from './show'
import Pagination from '@/components/Pagination'
import moment from 'moment'



export default {
  components:{
     "role-add":addView,
     "role-show": showView,
     'pb-pagination': Pagination
  },
  filters: {
    formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      drawer:{
          title:'',
          show: false,
          mode: '',
          view:''
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
      getList(this.query).then(response => {
        const { data } = response
        this.list = data.list
        this.total = data.total
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
      this.list = []
      this.fetchData()
    },
    add(){
      let drawer = {
          title: '新增角色',
          show: true,
          mode: 'add',
          view: 'add'
      }
      this.drawer = drawer
    },
    show(data){
      this.id = data.id;
      let drawer = {
          title: '角色详情',
          show: true,
          view: 'show'

      }
      this.drawer = drawer
    },
    edit(data){
      this.id = data.id
      let drawer = {
          title: '编辑角色',
          show: true,
          mode: 'update',
          view: 'add'
      }
      this.drawer = drawer
    },
    destroy(data){
      this.$confirm('是否确认删除此记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroy(data.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      })
    }
  }
}
</script>
