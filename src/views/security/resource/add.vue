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
      <el-input v-model="resForm.code" type="text" autocomplete="off" maxlength="32" />
    </el-form-item>
    <el-form-item label="URL" prop="url">
      <el-input v-model="resForm.url" type="text" autocomplete="off" maxlength="64" />
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model.number="resForm.icon" maxlength="16" />
    </el-form-item>
      <el-form-item label="是否显示" prop="visible">
        <el-radio-group v-model="resForm.visible" fill="#67C23A">
            <el-radio-button  label="1">显示</el-radio-button>
            <el-radio-button  label="0">不显示</el-radio-button>
        </el-radio-group>
     </el-form-item>
     <el-form-item label="排序" prop="seq">
       <el-input v-model.number="resForm.seq" maxlength="4" />
     </el-form-item>
      <el-form-item label="父节点" prop="parentName">
        <el-select v-model="resForm.parentId" class="full-select" filterable clearable placeholder="请选择父节点">
            <el-option
              v-for="item in options"
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

import { save, update, getById, getList } from '@/api/security/resource'
export default {
  props: ['id', 'mode'],
  data() {
    return {
      resForm:{
          type:'MENU',
          visible: '1',
          name:'',
          seq:1
      },
      rules: {
        name: [
          { required: true, message: '资源名不能为空' }
        ],
        code: [
          { required: true, message: '资源编码不能为空' },
        ]
      },
      parentName:'',
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
      this.$refs['resForm'].validate((valid) => {
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
