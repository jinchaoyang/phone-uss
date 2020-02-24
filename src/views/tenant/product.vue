<template>
<el-form ref="buyForm" :model="buyForm" status-icon  label-width="100px" class="drawer-form">
        <el-form-item label="是否开通" prop="status">
       <el-switch
           v-model="buyForm.status"
          >
         </el-switch>
       </el-form-item>
        <el-form-item label="计费方式" prop="feeType">
          <el-select v-model="buyForm.feeType" placeholder="请选择">
            <el-option label="包月" value="1"></el-option>
            <el-option label="按使用量" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价(元)" prop="price">
          <el-input v-model="buyForm.price" maxlength="12" autocomplete="off" />
        </el-form-item>
        <el-form-item label="购买时长" prop="duration">
          <el-select v-model="buyForm.duration" placeholder="请选择">
            <el-option v-for="item in durations" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="生效时间" prop="effectTime">
        <el-date-picker
              v-model="buyForm.effectTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择生效日期">
            </el-date-picker>
            </el-form-item>

        <!-- <el-form-item label="充值金额" prop="amount">
          <el-input v-model="chargeForm.amount" maxlength="12" autocomplete="off" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="chargeForm.remark" maxlength="64" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>


</template>

<script>

    import {save,update} from '@/api/tenant/product'
    

  export default{
      props:["code"],
    data(){
      return{
        buyForm:{
           feeType:'',
           duration:1,
           price:'',
           effectTime:'',
           status: true
        },
        durations:[
          {label:'1个月',value:1},
          {label:'2个月',value:2},
          {label:'3个月',value:3},
          {label:'4个月',value:4},
          {label:'5个月',value:5},
          {label:'6个月',value:6},
          {label:'7个月',value:7},
          {label:'8个月',value:8},
          {label:'9个月',value:9},
          {label:'10个月',value:10},
          {label:'11个月',value:11},
          {label:'12个月',value:12},

        ]
      }
    },
    methods:{
  
      submitForm(){

      }
    }
  }
  </script>

  <style scoped>
      .el-select,.el-date-editor{
        width:100%;
      }
  </style>