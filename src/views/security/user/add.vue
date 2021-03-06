<template>
  <el-form ref="userForm" :model="userForm" status-icon :rules="rules" label-width="100px" class="drawer-form">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="userForm.name" type="text" autocomplete="off" maxlength="10" />
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="userForm.userName" type="text" autocomplete="off" maxlength="36" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" type="password" autocomplete="off" maxlength="36" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="userForm.confirmPassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model.number="userForm.mobile" maxlength="11" />
    </el-form-item>
    <el-form-item label="角色" prop="roleIds" class="full-select">
        <el-select v-model="userForm.roleIds" filterable multiple placeholder="请选择角色">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import { save, update, getById, userNameCheck } from '@/api/user'
export default {
  props: ['id', 'mode'],
  data() {
    /**
         * 校验密码和确认密码是否输入一致
         */
    var varlidatePass = (rule, value, callback) => {
      if (value && value != this.userForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    /**
         * 校验用户名是否已经存在
         */
    var validateUserName = (rule, value, callback) => {
      if (value) {
        var params = { userName: value, id: this.userForm.id }
        userNameCheck(params).then(response => {
          const { data } = response
          if (!data) {
            callback(new Error('用户名已存在'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
    return {
      userForm: {
        id: '',
        name: '',
        userName: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        roleIds:[]
      },
      roles:[
        {id:"ADMIN",name:"系统管理员"},
        {id:"EMPLOYEE",name:"普通用户"}
        ],
      rules: {
        name: [
          { required: true, message: '姓名不能为空' }
        ],
        userName: [
          { required: true, message: '用户名不能为空' },
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空' },
          { validator: varlidatePass, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空' }
        ],
        roleIds: [
          {required: true , message: '请为用户分配角色'}
        ]

      }
    }
  },
  created() {
    if (this.mode == 'update') {
      this.getDetail()
    }
  },
  methods: {


    submitForm() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.userForm.role = this.userForm.roleIds.join(",")
          if (this.mode == 'update' && this.id) {
            this.updateForm()
          } else {
            this.saveForm()
          }
        } else {
          return false
        }
      })
    },
    saveForm() {
      save(this.userForm).then(response => {
        this.$message.success('保存成功!')
        this.$emit('createSuccess')
      })
    },
    updateForm() {
      update(this.userForm).then(response => {
        this.$message.success('更新成功!')
        this.$emit('createSuccess')
      })
    },
    getDetail() {
      getById(this.id).then(response => {
        const { data } = response
        data.confirmPassword = data.password
        this.userForm = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-select .el-select{
    width:100%;
  }
</style>
