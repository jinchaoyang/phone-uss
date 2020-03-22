<template>
  <el-form ref="roleForm" :model="roleForm" status-icon :rules="rules" label-width="100px" class="drawer-form">
    <el-form-item label="名称" prop="name">
      <el-input v-model="roleForm.name" type="text" autocomplete="off" maxlength="16" />
    </el-form-item>

    <el-form-item>
      <el-tree
        :data="nodes"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>

  </el-form>
</template>

<script>

import { getTree } from '@/api/security/resource'
import { save ,getById, update } from '@/api/security/role'

export default {
  props: ['id', 'mode'],
  data() {
    return {
      roleForm:{
        name:'',
        resourceIds:null
      },
      rules: {
        name: [
          { required: true, message: '角色名不能为空' }
        ],
        resourceIds: [
          {required: true, message: '资源不能为空'}
        ]
      },
      nodes:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedIds:[]
    }
  },
  watch:{
    checkedIds(val,oldVal){
      this.$refs.tree.setCheckedKeys(val)
    }
  },
  created() {
   this.getResourceTree();
    if (this.mode == 'update') {
      this.getDetail()
    }
  },
  methods: {
    getResourceTree(){
      getTree().then(response => {
        const { data } = response
        this.nodes = data
      })
    },
    submitForm() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          var arr = this.$refs.tree.getCheckedKeys();
          if(arr.length==0){
            this.$message.error("请选择资源信息");
            return;
          }else{
            this.roleForm.resourceIds = arr
          }

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
      save(this.roleForm).then(response => {
        this.$message.success('保存成功!')
        this.$emit('createSuccess')
      })
    },
    updateForm() {
      update(this.roleForm).then(response => {
        this.$message.success('更新成功!')
        this.$emit('createSuccess')
      })
    },
    getDetail() {
      getById(this.id).then(response => {
        const { data } = response
        this.checkedIds = data.resourceIds||[]
        this.roleForm.resourceIds = data.resourceIds||[]
        this.roleForm = data
      })
    },
    getResourceTree(){
      getTree().then(response => {
        const { data } = response
        this.nodes = data
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
