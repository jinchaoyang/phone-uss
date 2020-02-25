<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="query.name" placeholder="企业名称" />
        </el-form-item>
        <el-form-item label="企业编码">
          <el-input v-model="query.tenantCode" placeholder="企业编码" />
        </el-form-item>
        <el-form-item label="服务IP">
          <el-input v-model="query.ip" placeholder="企业编码" />
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
      <el-table-column align="center" label="企业名称" width="300">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="企业编码" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tenantCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务IP" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tenantType  | tenantTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactName }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactPhone}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | cssFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" width="160" fixed="right" label="操作">
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
      <tenant-add :id="tenantId" :mode="drawer.mode" @createSuccess="createSuccess" />
    </el-drawer>

    <el-drawer
      title="企业详情"
      :with-header="false"
      :visible.sync="showView"
      direction="rtl"
      size="60%"
    >
      <tenant-show :id="tenantId"  @onLoad="onLoad" />
    </el-drawer>

      <el-drawer
      :title="drawer.title"
      :with-header="drawer.withHeader"
      :visible.sync="drawer.show"
      direction="rtl"
      destroy-on-close
      :size="drawer.size"
    >
      <tenant-setting :id="tenantId" v-if="drawer.view=='setting'"/>
      <tenant-charge  :id="tenantId" @onSuccess="onSuccess" v-if="drawer.view=='charge'"/>
      <tenant-reserve  :id="tenantId" @onSuccess="onSuccess" v-if="drawer.view=='reserve'"/>
      

    </el-drawer>


 <!--     <el-drawer
      title="账户充值"
      :with-header="false"
      :visible.sync="chargeView"
      direction="rtl"
      size="60%"
    >
      <tenant-charge :id="tenantId" />
    </el-drawer>
 -->
  </div>
</template>

<script>
import { getList, destroy } from '@/api/tenant'
import Pagination from '@/components/Pagination'
import tenantAdd from './add'
import tenantShow from './show'
import tenantSetting from './setting'
import tenantCharge from './charge'
import tenantReserve from './reserve'

export default {
  components: {
    'pb-pagination': Pagination,
    'tenant-add': tenantAdd,
    'tenant-show': tenantShow,
    'tenant-setting': tenantSetting,
    'tenant-charge': tenantCharge,
    'tenant-reserve': tenantReserve
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '启用',
        2: '禁用',
        3: '停用'
      }
      return statusMap[status]
    },
    cssFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return statusMap[status]
    },
    tenantTypeFilter(tenantType){
      const statusMap = {
        1: '外网',
        2: '内网'
      }
      return statusMap[tenantType]
    }  
},
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        name: '',
        ip: '',
        tenantCode: '',
        pageNo: 1,
        pageSize: 10
      },
      drawer:{
        show: false,
        view: '',
        title: '',
        withHeader: true,
        size: '50%'
      },
      addView: false,
      showView: false,
      settingView: false,
      chargeView: false,
      tenantId: '',
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
      this.tenantId = row.id
      this.showView = true
    },
    edit(row) {
      this.drawer.title = '编辑'
      this.drawer.mode = 'update'
      this.tenantId = row.id
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
    },
    onLoad(data){
     let view = data.type;
     let drawer = {show:true,withHeader:true,size:'50%'};
     drawer.view = view;
     if(view=='charge'){
       drawer.title='账户充值';
       drawer.size='40%';
     }else if(view=='setting'){
       drawer.title='服务设置';
       drawer.withHeader = false;
     }else if(view == 'reserve'){
       drawer.title='账户冲账';
       drawer.size='40%';
     }
     this.drawer = drawer
    },
    onSuccess(){
      this.drawer.show = false;
    }

  }
}
</script>
