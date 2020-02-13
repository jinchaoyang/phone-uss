<template>
  <div class="app-container">
    <el-row :gutter="15">
    <el-col :span="8">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>名单统计</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card"  :span="10">
    <div slot="header" class="clearfix">
      <span>黒名单拦截</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card"  :span="10">
    <div slot="header" class="clearfix">
      <span>白名单拦截</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
  </el-col>
    <el-col :span="8">
      <el-card class="box-card"  :span="10">
    <div slot="header" class="clearfix">
      <span>企业统计</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
  </el-col>
  </el-row>
 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard1',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
 .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
 

  .box-card {
    width: 100%;
    margin-bottom:10px;
  }
</style>
