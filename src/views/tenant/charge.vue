<template>
  <el-form ref="chargeForm" :model="chargeForm" status-icon :rules="rules" label-width="100px" class="drawer-form">
    <el-form-item label="充值方式" prop="payType">
      <el-select v-model="chargeForm.payType" placeholder="请选择">
        <el-option label="支付宝" value="alipay"></el-option>
        <el-option label="微信" value="wx"></el-option>
        <el-option label="银行卡转账" value="bankCard"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="充值金额" prop="amount">
      <el-input v-model="chargeForm.amount" maxlength="12" autocomplete="off" />
    </el-form-item>

    <el-form-item label="备注" prop="note">
      <el-input v-model="chargeForm.note" maxlength="64" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import { save } from '@/api/tenant/trade'
export default {
  props: ['id'],
  data() {
    var validateAmount = (rule, value, callback) => {
      if (value && !isNaN(value)){
        if(parseFloat(value)<10){
           callback(new Error("最少充值10元"))
        }else{
           callback();
        }
      } else {
        callback()
      }
    }


    return {
      chargeForm: {
        tenantId:'',
        tradeType:'1',
        payType:'',
        amount: '',
        note: ''
      },
      rules: {
        payType: [
          { required: true, message: '充值方式不能为空' }
        ],
        amount: [
          { required: true, message: '充值金额不能为空' },
          { validator: validateAmount,trigger:'blur'}
        ]
      }
    }
  },
  created(){
     this.chargeForm.tenantId = this.id;
  },
  methods: {

    submitForm() {
      this.$refs['chargeForm'].validate((valid) => {
        if (valid) {
           let amount = this.chargeForm.amount;
           this.saveForm();
        } else {
          return false;
        }
      })
    },
    saveForm() {
      save(this.chargeForm).then(response => {
        this.$message.success('保存成功!')
        this.$emit('onSuccess')
      })
    }
  }
}
</script>
<style scoped>
  .drawer-form .el-select{
    width: 100%;
  }
</style>
