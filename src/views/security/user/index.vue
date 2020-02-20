<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="query.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="query.userName" placeholder="用户名" />
        </el-form-item>

        <el-form-item class="form-btns">
          <el-button type="primary" size="small" @click="fetchData">查询</el-button>
          <el-button type="success" size="small" @click="add()">新增</el-button>
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
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
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
      :visible.sync="addView"
      destroy-on-close
      direction="rtl"
      size="50%"
    >
      <user-add :id="userId" :mode="drawer.mode" @createSuccess="createSuccess" />
    </el-drawer>

    <el-drawer
      title="用户详情"
      :visible.sync="showView"
      direction="rtl"
      size="50%"
    >
      <user-show :id="userId" />
    </el-drawer>

  </div>
</template>

<script>
import { getList, destroy } from '@/api/user'
import userAdd from './add'
import userShow from './show'
import Pagination from '@/components/Pagination'

export default {
  components: {
    'user-add': userAdd,
    'user-show': userShow,
    'pb-pagination': Pagination
  },
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
        name: '',
        userName: '',
        pageNo: 1,
        pageSize: 10
      },
      addView: false,
      showView: false,
      userId: '',
      drawer: {
        mode: 'add',
        title: '新增'
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
    createSuccess() {
      const that = this
      that.addView = false
      that.fetchData()
    },
    add() {
      this.drawer.title = '新增'
      this.drawer.mode = 'add'
      this.addView = true
    },
    /**
     * 查看用户详情
     */
    show(row) {
      this.userId = row.id
      this.showView = true
    },
    edit(row) {
      this.drawer.title = '编辑'
      this.drawer.mode = 'update'
      this.userId = row.id
      this.addView = true
    },
    /**
     * 删除
     */
    destroy(row) {
      this.$confirm('是否确认删除此记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroy(row.id).then(response => {
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
