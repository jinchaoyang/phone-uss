<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="黑名单服务" name="black">
      <tenant-product :code="1001"> </tenant-product>

    </el-tab-pane>

    <el-tab-pane label="白名单服务" name="vip">
      <tenant-product :code="1002"> </tenant-product>
    </el-tab-pane>


  </el-tabs>
</template>
<script>

  import tenantProduct from './product'


  export default{
    components:{
      'tenant-product': tenantProduct
    },
    data(){
      return{
        activeName:'black',
      }
    },
    methods:{
      handleClick(tab, event) {
        this.activeName = tab.name
      },
     
    }
  }
  </script>

  <style scoped>
      .el-tabs{
          padding: 0 15px;
      }
    
  </style>
