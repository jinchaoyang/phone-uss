<template>
<el-form :model="tenantForm" status-icon :rules="rules" ref="tenantForm" label-width="100px" class="drawer-form" >
  <el-form-item label="企业名称" prop="name"> 
    <el-input type="text" v-model="tenantForm.name" autocomplete="off" maxlength="32"></el-input>
  </el-form-item>
   <el-form-item label="企业编号" prop="tenantCode">
    <el-input type="text" v-model="tenantForm.tenantCode" autocomplete="off" maxlength="36"></el-input>
  </el-form-item>
  <el-form-item label="联系人" prop="contactName">
    <el-input  v-model="tenantForm.contactName" autocomplete="off" maxlength="36"></el-input>
  </el-form-item>
  <el-form-item label="联系方式" prop="contactPhone">
    <el-input  v-model.number="tenantForm.contactPhone" maxlength="12" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="联系地址" prop="address">
    <el-input v-model="tenantForm.address" maxlength="64"></el-input>
  </el-form-item>
   <el-form-item label="联系邮箱" prop="email">
    <el-input v-model="tenantForm.email" maxlength="36"></el-input>
  </el-form-item>
  <el-form-item label="服务IP" prop="ip">
    <el-input v-model="tenantForm.ip" maxlength="16"></el-input>
  </el-form-item>
  <el-form-item label="备注" prop="remark">
    <el-input v-model="tenantForm.remark" maxlength="64"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">保存</el-button>
  </el-form-item>
</el-form>
</template>

<script>

    import { save, update ,getById, tenantCodeCheck } from '@/api/tenant'
  export default {
    props:["id","mode"],  
    data() {
        /**
         * 校验用户名是否已经存在
         */
        var validateTenantCode = (rule,value,callback) => {
            if(value){
                var params ={tenantCode: value,id: this.tenantForm.id}
                tenantCodeCheck(params).then(response => {
                    const { data } = response;
                   if(!data){
                        callback(new Error("企业编号已存在"));
                    }else{
                        callback();
                    }
                }) 
               
                
            }else{
                callback();
            }
        }
      return {
        tenantForm: {
            id: '',
          name: '',
          tenantCode: '',
          contactName: '',
          contactPhone: '',
          email:'',
          address: '',
          remark: '',
          status: '',
          ip:''
        },
        rules: {
            name:[
                {required: true, message: '企业名称不能为空'}
            ],
            tenantCode: [
                {required: true, message: '企业编码不能为空'},
                {validator: validateTenantCode, trigger:'blur'}
            ],
            contactName: [
                {required: true, message: '联系人不能为空'}
            ],
            contactPhone: [
                {required: true, message: '联系方式不能为空'}
            ],
            address: [
                {required: true, message: '联系地址不能为空'},
            ],
            email: [
                {required: true, message: '联系邮箱不能为空'}
            ],
            ip: [
                {required: true, message: '服务IP不能为空'}
            ]


            
        }
      };
    },
    methods: {
  
      submitForm() {
        this.$refs["tenantForm"].validate((valid) => {
          if (valid) {
              if(this.mode=='update' && this.id){
                  this.updateForm();
              }else{
                  this.saveForm();
              }
          
          } else {
            return false;
          }
        });
      },
      saveForm(){
            save(this.tenantForm).then(response => {
                this.$message.success("保存成功!");
                this.$emit('createSuccess');
                
            })
      },
      updateForm(){
          update(this.tenantForm).then(response => {
                this.$message.success("更新成功!");
                this.$emit('createSuccess');
                
            })
      },
      getDetail(){
          getById(this.id).then(response => {
              const { data } = response;
              this.tenantForm = data;
          })
      }
    },
    created(){
        if(this.mode=='update'){
            this.getDetail();
        }
    }
  }
</script>