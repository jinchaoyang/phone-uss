<template>
<el-form  status-icon  label-width="100px" class="drawer-form drawer-show" >
  <el-form-item label="姓名"> 
   <span>{{user.name}}</span>
  </el-form-item>
   <el-form-item label="用户名">
    <span>{{user.userName}}</span>
  </el-form-item>
 
  <el-form-item label="手机号" >
    <span>{{user.mobile}}</span>
  </el-form-item>
   <el-form-item label="创建时间" >
   <span>{{user.createdAt | formatDate}}</span>
  </el-form-item>
  <el-form-item label="更新时间" >
     <span>{{user.updatedAt | formatDate}}</span>
  </el-form-item>
  
</el-form>
</template>

<script>
import { getById } from '@/api/user'

import moment from 'moment'

  export default {
    props:["id"], 
    data() {
      return {
        user: {},
      };
    },
    methods: {
     fetchData(){
         getById(this.id).then(response => {
             const { data }  = response;
             this.user = data;
         })
     }
   
    },
    filters: {
        formatDate(value) {
           return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    created(){
        this.fetchData();
    }
  }
</script>