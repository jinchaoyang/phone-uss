<template>
  <div class="app-container">

    <el-row :gutter="20">
        <el-col :span="10">
            <div class="resource-list">
                <el-tree :data="nodes" :props="defaultProps" @node-click="handleNodeClick"></el-tree>    
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
      <span>{{ user.name }}</span>
    </el-form-item>
    <el-form-item label="编码">
      <span>{{ user.userName }}</span>
    </el-form-item>
    <el-form-item label="类型">
      <span>{{ user.mobile }}</span>
    </el-form-item>
      <el-form-item label="URL">
      <span>{{ user.mobile }}</span>
    </el-form-item>
     <el-form-item label="是否显示">
      <span>{{ user.mobile }}</span>
    </el-form-item>
      <el-form-item label="图标">
      <span>{{ user.mobile }}</span>
    </el-form-item>
         <el-form-item label="排序">
      <span>{{ user.mobile }}</span>
    </el-form-item>


  </el-form>

            </div></el-col>  
    </el-row>

    <el-drawer
      :title="drawer.title"
      :visible.sync="drawer.show"
      direction="rtl"
      size="50%"
    >
      <resource-add :id="resourceId" />
    </el-drawer>

  </div>
</template>

<script>
import addView from './add'
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
           nodes: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
              defaultProps: {
                children: 'children',
                label: 'label'
              }
       }
    },
    methods: {
        handleNodeClick(data){
            console.log(data);
        },
        add(){
            let drawer = {
                title: '新增资源',
                show: true,
                mode: 'add'
            }
            this.drawer = drawer
        }
    },
  

}

</script>

<style scoped>
   .btns-list .el-row{
       text-align: right;
   }
</style>
