<template>

<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业信息" name="baseInfo">
        <el-form  status-icon  label-width="100px" class="drawer-form drawer-show" >
  <el-form-item label="企业名称"> 
   <span>{{tenant.name}}</span>
  </el-form-item>
   <el-form-item label="企业编号">
    <span>{{tenant.tenantCode}}</span>
  </el-form-item>
  <el-form-item label="联系人" prop="contactName">
    <span>{{tenant.contactName}}</span>
  </el-form-item>
  <el-form-item label="联系方式" prop="contactPhone">
     <span>{{tenant.contactPhone}}</span>
  </el-form-item>
  <el-form-item label="联系地址" prop="address">
     <span>{{tenant.address}}</span>
  </el-form-item>
   <el-form-item label="联系邮箱" prop="email">
     <span>{{tenant.email}}</span>
  </el-form-item>
  <el-form-item label="服务IP" prop="ip">
    <span>{{tenant.ip}}</span>
  </el-form-item>
  <el-form-item label="备注" prop="remark">
    <span>{{tenant.remark}}</span>
  </el-form-item>  
   <el-form-item label="状态" prop="remark">
    <span><el-tag :type="tenant.status | cssFilter" > {{tenant.status | statusFilter}}</el-tag></span>
  </el-form-item> 
  
   <el-form-item label="创建时间" >
   <span>{{tenant.createdAt | formatDate}}</span>
  </el-form-item>
  <el-form-item label="更新时间" >
     <span>{{tenant.updatedAt | formatDate}}</span>
  </el-form-item>
  
</el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="白名单服务" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="黑名单服务" name="third">角色管理</el-tab-pane> -->
    <el-tab-pane label="数据统计" name="cdrStat">
        <tenant-stat ref="stat-node"></tenant-stat>
    </el-tab-pane>
  </el-tabs>


</template>

<script>
import { getById } from '@/api/tenant'
import tenantStat from './stat'

import moment from 'moment'

  export default {
    props:["id"], 
    components: {
        'tenant-stat': tenantStat
    },
    data() {
      return {
        tenant: {},
        ip: '',
        activeName: 'baseInfo'
      };
    },

    methods: {
     fetchData(){
         getById(this.id).then(response => {
             const { data }  = response;
             this.tenant = data;
             this.$refs["stat-node"].fetchData(data.ip);
         })
     },
     handleClick(tab, event){
         this.activeName = tab.name;
     }
   
    },
    filters: {
        formatDate(value) {
           return moment(value).format('YYYY-MM-DD HH:mm:ss')
        },
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
    }
    },
    created(){
        this.fetchData();
    }
  }
</script>
<style scoped>
    .el-tabs{
        padding: 0 15px;
    }
</style>