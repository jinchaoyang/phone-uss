<template>
  <el-form ref="accountForm" :model="accountForm" status-icon :rules="rules" label-width="100px" class="drawer-form">

    <el-form-item label="管理账号" prop="usernmae">
      <el-input v-model="accountForm.username" maxlength="12" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="accountForm.password" maxlength="64" />
    </el-form-item>

      <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import { updateSetting,getSetting } from '@/api/tenant/setting'
export default {
  props: ['id'],
  data() {
    return {
      accountForm: {
        id:'',
        username:'admin',
        password:'',
      },
      rules: {
        username: [
          { required: true, message: '登录名不能为空' }
        ],
        password: [
          { required: true, message: '登录密码不能为空' }
        ]
      }
    }
  },
  created(){
     this.accountForm.id = this.id;
     this.getSettingInfo()
  },
  methods: {
    submitForm() {
      this.$refs['accountForm'].validate((valid) => {
        if (valid) {
           this.saveForm();
        } else {
          return false;
        }
      })
    },
    getSettingInfo(){
      getSetting(this.id).then(response => {
         const { data } = response
         this.accountForm = data
      })
    },
    saveForm() {
      updateSetting(this.accountForm).then(response => {
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
