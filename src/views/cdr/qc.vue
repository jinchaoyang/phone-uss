<template>
  <div class="app-container">

    <div class="query-form-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="号码">
          <el-input v-model="query.callee" placeholder="号码" />
        </el-form-item>
        <el-form-item label="质检状态">
          <el-select v-model="query.status" placeholder="全部" clearable="">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

   

         <el-form-item label="开始时间">
           <el-date-picker
            v-model="query.beginAt"
            type="datetime"
            clearable
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
           <el-date-picker
            v-model="query.endAt"
            type="datetime"
            clearable
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="开始时间">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="是否命中">
          <el-select v-model="query.isHit" placeholder="全部" clearable="">
            <el-option value=1 label="命中"></el-option>
            <el-option value=0 label="未命中"></el-option>
          </el-select>   
        </el-form-item>

         <el-form-item label="敏感词">
          <el-input v-model="query.word" placeholder="敏感词" />  
        </el-form-item>

         <el-form-item label="主叫IP">
          <el-input v-model="query.callerIp" placeholder="主叫IP" />
        </el-form-item>

        <el-form-item label="被叫IP">
          <el-input v-model="query.calleeIp" placeholder="被叫IP" />
        </el-form-item>


        <el-form-item class="form-btns">
          <el-button type="primary" size="small" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="呼叫时间" >
        <template slot-scope="scope">
          {{ scope.row.callAt | dateFormat}}
        </template>
      </el-table-column>

      <el-table-column label="被叫号码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.callee }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="VOSIP"  align="center">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column> -->
      <el-table-column label="质检状态"  align="center">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="敏感词"  align="center">
        <template slot-scope="scope">
          {{ scope.row.tag }}
        </template>
      </el-table-column>
       <el-table-column label="主叫网关"  align="center">
        <template slot-scope="scope">
          {{ scope.row.callerIp }}
        </template>
      </el-table-column>
         <el-table-column label="被叫网关"  align="center">
        <template slot-scope="scope">
          {{ scope.row.calleeIp }}
        </template>
      </el-table-column>

      <el-table-column label="录音时长(秒)"  align="center">
        <template slot-scope="scope">
          {{ scope.row.length }}
        </template>
      </el-table-column>

         <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
            <el-link type="primary" @click="show(scope.row)">查看</el-link> 

            <el-link type="primary" @click="playMp3(scope.row)">听录音</el-link>
        </template>
      </el-table-column>

    </el-table>
    <pb-pagination :page-no="query.pageNo" :page-size="query.pageSize" :total="total" @pageChange="pageChange" />
    <div>
      <audio :src="cdr.url" controls autoplay  id="player"></audio>
    </div>

    <el-drawer
      title="话单详情"
      with-header
      :visible.sync="drawer.show"
      direction="rtl"
      destroy-on-close
      size="60%"
      ref="drawerBox"
    >
      <cdr-show :cdr="cdr"></cdr-show>


    </el-drawer>



  </div>
</template>

<script>

import moment from 'moment'

import Pagination from '@/components/Pagination'

import ShowView from './show'

import { getQcCdrs } from '@/api/qc/cdr'

export default {
  components: {
    'pb-pagination': Pagination,
    'cdr-show': ShowView
  },

  data() {
    return {
      list: [],
      total: 0,
      cdr: {},
      query: {
        callee:null ,
        pageNo: 1,
        pageSize: 10,
        host:null,
        status: null,
        beginAt: null,
        endAt: null
      },
      options:[
        {id:2,name:"已质检"},
        {id:1,name:"待质检"},
        {id:0,name:"待转换"},
        {id:-1,name:"质检失败"},
      ],
      drawer:{
        show: false
      }
    }

  },
  filters:{
    dateFormat(time){
      return moment(time,"YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")
    },
    statusFilter(status){
      const map = {
        "-1" : "质检失败",
        "0": "待转换",
        "1": "待质检",
        "2" : "已质检"
      }
      return map[status];

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var that = this
      getQcCdrs(that.query).then(resp => {
        const { data } = resp
        that.list = data.content ||[]
        that.total = data.totalElements || 0
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
    playMp3(data){
       this.cdr = data || {}
       var player = document.getElementById("player")
       if(!player.paused){
         player.pause()
       }

       player.play()

    },
    search(){
      var that = this
      that.query.pageNo = 1
      that.fetchData()
    },
    show(data){
      this.cdr = data
      this.drawer.show = true

    }



  }
}
</script>
<style lang="scss">
.query-form-box {
    .el-form-item{
        width:28%;
    }
    .el-form-item__label{
         width:80px;
    }
    .el-form--inline .el-form-item__content {
        width: calc(100% - 80px);
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    .el-select{
      width:100%;
    }
}


</style>
