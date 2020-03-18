<template>
  <div class="app-container">

    <el-row :gutter="20">
        <el-col :span="10">
            <div class="resource-list">
                <el-tree :data="nodes" default-expand-all  :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </el-col>
        <el-col :span="12"><div class="resource-detail">

         <div class="btns-list">
             <el-row>
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="warning" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </el-row>
         </div>

            <el-form status-icon label-width="100px" class="drawer-form drawer-show">
    <el-form-item label="名称">
      <span>{{ node.name }}</span>
    </el-form-item>
    <el-form-item label="编码">
      <span>{{ node.code }}</span>
    </el-form-item>
    <el-form-item label="类型">
      <span>{{ node.type | resourceTypeFilter }}</span>
    </el-form-item>
      <el-form-item label="URL">
      <span>{{ node.url }}</span>
    </el-form-item>
     <el-form-item label="是否显示">
      <span>{{ node.visibleDesc }}</span>
    </el-form-item>
      <el-form-item label="图标">
      <span>{{ node.icon }}</span>
    </el-form-item>
         <el-form-item label="排序">
      <span>{{ node.seq }}</span>
    </el-form-item>


  </el-form>

            </div></el-col>
    </el-row>

    <el-drawer
      :title="drawer.title"
      :visible.sync="drawer.show"
      destroy-on-close
      direction="rtl"
      size="50%"
      ref="drawerBox"
    >
      <resource-add @createSuccess="onSuccess" :id="resourceId" />
    </el-drawer>

  </div>
</template>

<script>
import addView from './add'
import { getTree,getById } from '@/api/security/resource'


export default{
    components:{
        'resource-add': addView
    },
    data(){
       return{
           user:{},
           resourceId:'',
           drawer:{
               title:'',
               show: false,
               mode: ''
           },
           nodes:[],
           defaultProps: {
             children: 'children',
             label: 'name'
           },
           node:{}
       }
    },
    created(){
      this.getResourceTree()
    },
    filters:{
       resourceTypeFilter(rtype){
         const map={"MENU":"菜单","BUTTON":"按钮"}
         return map[rtype];
       }
    },
    methods: {
        add(){
            let drawer = {
                title: '新增资源',
                show: true,
                mode: 'add'
            }
            this.drawer = drawer
        },
        onSuccess(){
          this.$refs["drawerBox"].closeDrawer();
        },
        getResourceTree(){
          getTree().then(response => {
            const { data } = response
            this.nodes = data
            if(data.length>0){
              let node = data[0]
               node.visibleDesc = node.visible==1?'显示':'不显示'
              this.node = node
            }

          })
        },
        handleNodeClick(data){
          data.visibleDesc = data.visible==1?'显示':'不显示'
          this.node = data
        }
    },


}

</script>

<style scoped>
   .btns-list .el-row{
       text-align: right;
   }
</style>
