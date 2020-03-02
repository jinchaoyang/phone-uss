<template>
<el-form ref="buyForm" :model="buyForm" status-icon  label-width="100px" class="drawer-form">
    <div v-if="newProduct">
        <el-form-item label="是否开通" prop="status">
       <el-switch
           v-model="buyForm.status"
           active-value="1"
           inactive-value="0"
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
          <el-input v-model="buyForm.feeDesc" maxlength="12" autocomplete="off" />
        </el-form-item>
        <el-form-item label="购买时长" prop="duration">
          <el-select v-model="buyForm.duration" placeholder="请选择">
            <el-option v-for="item in durations" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="生效时间" prop="effectTime">
        <el-date-picker
              v-model="buyForm.effectAt"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择生效日期">
            </el-date-picker>
            </el-form-item>

  
    </div>
     <div v-else>
       <el-form-item label="到期时间">
          <el-input v-model="buyForm.expireAt" autocomplete="off" disabled="" />
        </el-form-item>
        <el-form-item label="计费方式" prop="feeType">
          <el-select v-model="buyForm.feeType" placeholder="请选择" disabled="">
            <el-option label="包月" value="1"></el-option>
            <el-option label="按使用量" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价(元)" prop="price">
          <el-input v-model="buyForm.feeDesc" maxlength="12" autocomplete="off" />
        </el-form-item>
        <el-form-item label="续费时长" prop="duration">
          <el-select v-model="buyForm.duration" placeholder="请选择">
            <el-option v-for="item in durations" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
     </div>
        

        <el-form-item>
          <el-button type="primary" :disabled="buyForm.status==0" @click="submitForm">立即购买</el-button>
           <span  class="fee-info">
           <span class="total-fee-title">合计：</span><span class="total-fee">￥ {{totalFee | numberFormat}}</span>
           </span>
        </el-form-item>
      </el-form>


</template>

<script>

    import {save,findByCode,renew} from '@/api/tenant/product'
    

  export default{
    props:["code","id"],
    data(){
      return{
        newProduct: false,
        buyForm:{
           feeType:'',
           duration:1,
           feeDesc:'',
           effectAt:'',
           status: '0',
           fee: 0
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
    computed:{
      totalFee() {
        if(this.buyForm.feeType==2){
          return 0;
        }else{
          return this.buyForm.feeDesc * this.buyForm.duration || 0;
        }
  
      }
    },
    methods:{
  
      submitForm(){
        var that = this;
        if(that.newProduct){
          that.buyProduct();
        }else{
          this.renewProduct();
        }
      },
      buyProduct(){
        var that = this;
        let data = that.buyForm;
        data.tenantId = that.id;
        data.productType = that.code;
        save(data).then(response => {
          that.$message.success('服务购买成功');
          that.newProduct = false;
          that.$emit("onSuccess")
        })
      },
      renewProduct(){
        var that = this;
        let data = that.buyForm;
        data.tenantId = that.id;
        data.productType = that.code;
        renew(data).then(response => {
          that.$message.success('服务续费成功');
          that.$emit("onSuccess")
        })
      },
      getDetail(){
        let params = {tenantId: this.id,productCode: this.code};
        findByCode(params).then(response => {
          const { data } = response
          if(data){
            data.feeDesc = data.fee/1000;
            data.duration=1;
            this.buyForm = Object.assign(this.buyForm,data);
            this.newProduct = false;
            this.buyForm.status=1;
          }else{
            this.newProduct = true;
          
          }
          
        })
      }
    },
    filters: {
    numberFormat(val) {
      val = val + ''
      var pattern = /(?=((?!\b)\d{3})+$)/g
      return val.replace(pattern, ',')
    }
  },
    created(){
      this.getDetail();
    }
  }
  </script>

  <style scoped>
      .el-select,.el-date-editor{
        width:100%;
      }
      .total-fee-title , .total-fee{
        font-weight: bold;
        font-size: 16px;
      }
      .total-fee{
        color:red;
      }
      .fee-info{
        margin-left: 40px;
      }
  </style>