<template>
  <el-form ref="resForm" :model="resForm" status-icon :rules="rules" label-width="100px" class="drawer-form">
    <el-form-item label="名称" prop="name">
      <el-input v-model="resForm.name" type="text" autocomplete="off" maxlength="16" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
         <el-radio-group v-model="resForm.type" fill="#67C23A">
            <el-radio-button label="MENU">菜单</el-radio-button>
            <el-radio-button label="BUTTON">按钮</el-radio-button>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="编码" prop="code">
      <el-input v-model="resForm.code" type="text" autocomplete="off" maxlength="16" />
    </el-form-item>
    <el-form-item label="URL" prop="url">
      <el-input v-model="resForm.url" type="text" autocomplete="off" maxlength="64" />
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model.number="resForm.icon" maxlength="16" />
    </el-form-item>
      <el-form-item label="是否显示" prop="display">
        <el-radio-group v-model="resForm.display" fill="#67C23A">
            <el-radio-button  label="1">显示</el-radio-button>
            <el-radio-button  label="0">不显示</el-radio-button>
        </el-radio-group>
     </el-form-item>
      <el-form-item label="父节点" prop="parentName">
      <el-input v-model="parentName" maxlength="16" />
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
      resForm:{
          type:'MENU',
          display: '1',
          name:'1234'
      },
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
