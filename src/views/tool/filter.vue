<template>
     <div class="app-container">
           <el-row :gutter="20">
                    <el-col :span="12">
           <el-form ref="form" label-width="80px" >
                <el-form-item label="区域">
                    <el-cascader
                        v-model="region"
                        placeholder="试试搜索：北京"
                        clearable
                        @change="onChange"
                        :options="options"
                        filterable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="文件上传">
                    <el-upload
                        class="upload-demo"
                        drag
                        name="uploadFile"
                        :data="paramList"
                        accept=".xlsx"
                        :action="uploadUrl"
                        :on-success="onSuccess"
                        :on-progress="onProgress"
                       >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M
                        </div>
                    </el-upload>
                </el-form-item>
                
               
            </el-form>
                    </el-col>
                    <el-col :span="6">
                          <el-link icon="el-icon-download" type="danger" v-if="filePath" class="download-btn" :href="filePath">点击下载</el-link>
                    </el-col>
           </el-row>
     </div>

</template>

<script>

    import areas from '@/utils/areaCode'

    export default{
       data(){
           return {
               options: areas,
               region:[],
               fileList: [],
               filePath:'',
               paramList:{},
               uploadUrl:process.env.VUE_APP_BASE_API+'/phone/upload'
           }
       },
     
       methods: {
          onSuccess(resp){
            var _this = this;
            if(resp.rcode==0){
                _this.$message.success("名单过滤完成！");
                _this.filePath =process.env.VUE_APP_BASE_API+'/phone/download?file='+resp.data;

             
            }else{
                _this.$message.error(resp.message||"未知错误")
            }
          },
          onChange(data){
              this.paramList = {areaCode: data[1]};
          },
          onProgress(){
              this.filePath='';
          }

       
       },
       created(){
           
       }
       
    }
</script>

<style lang="scss">
.el-cascader {
    width:360px;
}
.download-btn{
    // margin-top:60px;
    display: block;
    padding: 10px 10px;
    border: 1px solid;
}
 
</style>