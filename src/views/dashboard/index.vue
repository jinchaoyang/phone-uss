<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>账户信息</span>

          </div>
          <div class="text item">
            <span class="counter-title warning">账户余额</span>
            <span class="counter-text warning">{{ stat.black | numberFormat }}</span>

          </div>
          <div class="text item">
            <span class="counter-title success">实时余额</span>
            <span class="counter-text success">{{ stat.vip | numberFormat }}</span>
          </div>
          <div class="text item">
            <span class="counter-title warning">当日消费</span>
            <span class="counter-text warning">{{ incr.black | numberFormat }}</span>
          </div>
       
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" :span="10">
          <div slot="header" class="clearfix">
            <span>黒名单拦截</span>
          </div>
          <div class="text item">
            <span class="counter-title primary">请求总数</span>
            <span class="counter-text primary">{{ stat.black | numberFormat }}</span>
          </div>
          <div class="text item">
            <span class="counter-title success">拦截总数</span>
            <span class="counter-text success">{{ stat.black | numberFormat }}</span>
          </div>
          <el-progress type="circle" :percentage="67" />

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" :span="10">
          <div slot="header" class="clearfix">
            <span>白名单拦截</span>

          </div>
          <div class="text item">
            <span class="counter-title primary">请求总数</span>
            <span class="counter-text primary">{{ stat.black | numberFormat }}</span>
          </div>
          <div class="text item">
            <span class="counter-title success">拦截总数</span>
            <span class="counter-text success">{{ stat.black | numberFormat }}</span>
          </div>
          <div>
            <el-progress type="circle" :percentage="34" />
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stat } from '@/api/tool'

export default {
  name: 'Dashboard1',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  filters: {
    numberFormat(val) {
      val = val + ''
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return val.replace(pattern, ',')
    }
  },
  data() {
    return {
      stat: {
        vip: 0,
        black: 0
      },
      incr: {
        vip: 0,
        black: 0
      }
    }
  },
  created() {
    this.statCount()
  },
  methods: {
    statCount() {
      stat().then(response => {
        const { data } = response
        this.stat = data
      })
    }

  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

.primary{
  color:#409EFF;
}

 .danger{
   color:#F56C6C;
 }
  .warning{
    color:#E6A23C;
  }
  .success {
    color: #67C23A;
  }
  .el-progress--circle{
    width: 100%;
    text-align: -webkit-center;
  }

  .counter-text{
    font-weight: bold;
    font-size:16px;
    float: right;
  }
  .counter-title{
    font-weight: bold;

  }
  .box-card{
    height: 300px;
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
