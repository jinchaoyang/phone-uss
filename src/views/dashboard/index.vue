<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>账户信息</span>

          </div>
          <div class="text item">
            <span class="counter-title primary">企业名称</span>
            <span class="counter-text primary">{{ tenant.name }}</span>

          </div>
          <div class="text item">
            <span class="counter-title warning">账户余额</span>
            <span class="counter-text warning">{{ tenant.balance | numberFormat }}</span>

          </div>
          <div class="text item">
            <span class="counter-title success">实时余额</span>
            <span class="counter-text success">{{ tenant.rtBalance | numberFormat }}</span>
          </div>
          <div class="text item">
            <span class="counter-title warning">当日消费</span>
            <span class="counter-text warning">{{ tenant.consume| numberFormat }}</span>
          </div>

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>对接信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="toSetting">编辑</el-button>

          </div>
          <div class="text item">
            <span class="counter-title success">落地网关IP</span>
            <span class="counter-text success">{{ setting.sipIp }}</span>

          </div>
          <div class="text item">
            <span class="counter-title warning">落地端口</span>
            <span class="counter-text warning">{{ setting.sipPort}}</span>

          </div>
          <div class="text item">
            <span class="counter-title success">对接网关IP</span>
            <span class="counter-text success">{{ setting.toIp }}</span>
          </div>
          <div class="text item">
            <span class="counter-title warning">对接端口</span>
            <span class="counter-text warning">{{ setting.toPort }}</span>
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
            <span class="counter-text primary">{{ stat.total  }}</span>
          </div>
          <div class="text item">
            <span class="counter-title success">拦截总数</span>
            <span class="counter-text success">{{ stat.forbid }}</span>
          </div>
          <el-progress type="circle" :percentage="stat.forbidPercent" />

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" :span="10">
          <div slot="header" class="clearfix">
            <span>白名单拦截</span>

          </div>
          <div class="text item">
            <span class="counter-title primary">请求总数</span>
            <span class="counter-text primary">{{ stat.vipTotal }}</span>
          </div>
          <div class="text item">
            <span class="counter-title success">拦截总数</span>
            <span class="counter-text success">{{ stat.vip }}</span>
          </div>
          <div>
            <el-progress type="circle" :percentage="stat.vipPercent" />
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-drawer
      title="对接配置"
      :visible.sync="showView"
      direction="rtl"
      size="50%"
      ref="drawerBox"
    >
      <pb-setting @onSuccess="onSuccess" />
    </el-drawer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getById,stat } from '@/api/tenant'
import { getTenantType } from '@/utils/auth'
import { getSetting } from '@/api/tenant/setting'
import moment from 'moment'

import SettingView from './setting'

export default {
  name: 'Dashboard1',
  components:{
    'pb-setting': SettingView
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    tenantType(){
      return getTenantType()
    }
  },
  filters: {
    numberFormat(val) {
      val = ((val||0) /10000)+''
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return val.replace(pattern, ',')
    }
  },
  data() {
    return {
      tenant:{},
      stat: {
        total: 0,
        forbid: 0,
        vipTotal: 0,
        vip: 0,
        vipPercent: 0,
        forbidPercent: 0
      },

      showView:false,
      setting:{}
    }
  },
  created() {
    this.statCount()
    this.getBalance()
    this.getSettingInfo()
  },
  methods: {
    statCount() {
      stat().then(response => {
        const { data } = response
        if(data.length>0){
          let info  = data.reverse().slice(0, 1)[0];
          let today = moment().format('YYYY-MM-DD');
          if(info.date==today){
            if(info.vipTotal==0){
              info.vipPercent = 0;
            }else{
              info.vipPercent = parseFloat((info.vip*100 /info.vipTotal).toFixed(2))
            }
            if(info.total==0){
              info.forbidPercent = 0;
            }else{
              info.forbidPercent = parseFloat((info.forbid*100 /info.total).toFixed(2))
            }
            this.stat = info
          }

          console.log(this.stat);


        }

      })
    },
    getBalance(){
      getById().then(response => {
        const { data } = response
        this.tenant = data
      })
    },
    toSetting(){
      this.showView = true
    },
    getSettingInfo(){
      getSetting().then(response => {
        const { data } = response
        this.setting = data ||{}
      })
    },
    onSuccess(){
      this.showView = false
      this.$refs["drawerBox"].closeDrawer();
      this.getSettingInfo()
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
