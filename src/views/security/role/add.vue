<template>
  <el-form ref="roleForm" :model="roleForm" status-icon :rules="rules" label-width="100px" class="drawer-form">
    <el-form-item label="名称" prop="name">
      <el-input v-model="roleForm.name" type="text" autocomplete="off" maxlength="16" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>

  </el-form>
</template>

<script>

import { save, update, getById, getList } from '@/api/security/resource'
export default {
  props: ['id', 'mode'],
  data() {
    return {
      roleForm:{
        name:''
      },
      rules: {
        name: [
          { required: true, message: '角色名不能为空' }
        ]
      },
      options:[]
    }
  },
  created() {
    this.getParents();
    if (this.mode == 'update') {
      this.getDetail()
    }
  },
  methods: {

    submitForm() {
      this.$refs['roleForm'].validate((valid) => {
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
      save(this.resForm).then(response => {
        this.$message.success('保存成功!')
        this.$emit('createSuccess')
      })
    },
    updateForm() {
      update(this.resForm).then(response => {
        this.$message.success('更新成功!')
        this.$emit('createSuccess')
      })
    },
    getDetail() {
      getById(this.id).then(response => {
        const { data } = response
        data.visible = data.visible+''
        this.resForm = data
      })
    },
    getParents(){
        getList({parentNode:1}).then(response => {
          const { data } = response
          this.options = data
        })
    }
  }
}
</script>
<style lang="scss">
  .full-select{
    width:100%;
  }
</style>
