<template>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业信息" name="baseInfo">
      <div class="drawer-box">
      <div class="drawer-left">
      <el-form status-icon label-width="100px" class="drawer-form drawer-show">
        <el-form-item label="企业名称">
          <span>{{ tenant.name }}</span>
        </el-form-item>
        <el-form-item label="企业编号">
          <span>{{ tenant.tenantCode }}</span>
        </el-form-item>
         <el-form-item label="服务IP" prop="ip">
          <span>{{ tenant.ip }}</span>
        </el-form-item>
        <el-form-item label="服务类型" prop="ip">
          <span>{{ tenant.tenantType | tenantTypeFilter }}</span>
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <span>{{ tenant.contactName }}</span>
        </el-form-item>
        <el-form-item label="联系方式" prop="contactPhone">
          <span>{{ tenant.contactPhone }}</span>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <span>{{ tenant.address }}</span>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <span>{{ tenant.email }}</span>
        </el-form-item>
       
        <el-form-item label="备注" prop="remark">
          <span>{{ tenant.remark }}</span>
        </el-form-item>
        <el-form-item label="状态" prop="remark">
          <span><el-tag :type="tenant.status | cssFilter"> {{ tenant.status | statusFilter }}</el-tag></span>
        </el-form-item>

        <el-form-item label="创建时间">
          <span>{{ tenant.createdAt | formatDate }}</span>
        </el-form-item>
        <el-form-item label="更新时间">
          <span>{{ tenant.updatedAt | formatDate }}</span>
        </el-form-item>

      </el-form>
      </div>
      <div class="drawer-center">
          <div class="account-item">
            <label>账户余额：</label> <span>{{tenant.balance | numberFormat}}</span>
          </div>
           <div class="account-item">
            <label>透支额度：</label> <span>{{tenant.overdraft | numberFormat}}</span>
          </div>

      </div>
      <div class="drawer-right">
          <el-button type="warning" size="small" @click="toSetting">服务订购</el-button>
          <el-button type="info" size="small">禁用账号</el-button>
          <el-button type="success" size="small" @click="toCharge" :id="id">账户充值</el-button>
          <el-button type="primary" size="small" @click="toReserve" :id="id">账户冲账</el-button>
      </div>
      </div>
    </el-tab-pane>
    <!-- <el-tab-pane label="白名单服务" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="黑名单服务" name="third">角色管理</el-tab-pane> -->

     <el-tab-pane label="交易记录" name="tradeLog">
      <trade-log :id="id"></trade-log>
    </el-tab-pane>
    <el-tab-pane label="订购记录" name="buyLog">
      <purchase-log :id="id"></purchase-log>
    </el-tab-pane>

    <el-tab-pane label="数据统计" name="cdrStat">
      <tenant-stat ref="stat-node" />
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import { getById } from '@/api/tenant'
import tenantStat from './stat'
import tradeLog from './tradeLog'
import purchaseLog from './purchaseLog'

import moment from 'moment'

export default {
  components: {
    'tenant-stat': tenantStat,
    'trade-log': tradeLog,
    'purchase-log': purchaseLog
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
    },
      tenantTypeFilter(tenantType){
      const statusMap = {
        1: '外网',
        2: '内网'
      }
      return statusMap[tenantType]
    },
    numberFormat(val) {
      val = val + ''
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return val.replace(pattern, ',')
    }  
  },
  props: ['id'],
  data() {
    return {
      tenant: {},
      ip: '',
      activeName: 'baseInfo'
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getById(this.id).then(response => {
        const { data } = response
        data.balance = data.balance / 100;
        data.overdraft = data.overdraft /100;
        this.tenant = data
        this.$refs['stat-node'].fetchData(data.ip)
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    /**
     * 购买服务
     */
    toSetting(){
      this.$emit('onLoad',{type:'setting'})
    },
    /**
     * 充值
     */
    toCharge(){
     this.$emit('onLoad',{type:'charge'});
    },
    toReserve(){
      this.$emit('onLoad',{type:'reserve'});
    }

  }
}
</script>
<style scoped>
    .el-tabs{
        padding: 0 15px;
    }
    .drawer-box{
      display: flex;
      align-items: flex-start;
    }
    .drawer-left{
      width:55%;
    }
    .drawer-center{
      padding: 15px 20px;
      border: 1px dashed #ddd;
      font-size: 14px;
      font-weight: 400;
      background-color: #f5f5f5;
      width:20%;
    }
    .drawer-center .account-item{
      margin: 15px 0;
    }

    .drawer-center label, .drawer-center span{
      font-size: 14px;
      font-weight: 400;
    }

   .drawer-center span{
       color: red;
       font-weight: bold;
    }
    .drawer-right{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width:20%;
    }
    .drawer-right .el-button{
      margin-bottom:15px;
    }
</style>
