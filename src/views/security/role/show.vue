<template>
  <el-form status-icon label-width="100px" class="drawer-form drawer-show">
    <el-form-item label="名称">
      <span>{{ role.name }}</span>
    </el-form-item>
    <el-form-item label="">
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



  </el-form>
</template>

<script>
import { getById } from '@/api/security/role.js'
import { getTree } from '@/api/security/resource'


export default {

  props: ['id'],
  data() {
    return {
      role: {},
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
    this.fetchData()
    this.getResourceTree()
  },
  methods: {
    fetchData() {
      getById(this.id).then(response => {
        const { data } = response
        this.checkedIds = data.resourceIds||[]
        this.role = data
      })
    },
    getResourceTree(){
      getTree().then(response => {
        const { data } = response
        data.forEach((n) => {
          n.disabled = true
          n.children.forEach(node => {
            node.disabled = true
            node.children.forEach(item=>{
              item.disabled = true
            })
          })
        })
        this.nodes = data
      })
    }

  }
}
</script>
