<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              drag
              name="uploadFile"
              :data="paramList"
              accept=".txt"
              :action="uploadUrl"
              :on-success="onSuccess"

            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传.txt文件，且不超过20M.每次同时仅能处理一个文件
              </div>
            </el-upload>
          </el-form-item>

        </el-form>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="percent" status="success"></el-progress>

      </el-col>
      <el-col :span="6">
        <el-link v-if="filePath" icon="el-icon-download" type="danger" class="download-btn" :href="filePath">点击下载</el-link>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import {filterProgress} from '@/api/tool'

export default {
  data() {
    return {
      fileList: [],
      filePath: '',
      paramList: {},
      taskId: null,
      interval:null,
      percent:0,
      uploadUrl: process.env.VUE_APP_OSS_API + '/api/v1.0/vip/filter'
    }
  },
  created() {

  },
  methods: {
    onSuccess(resp) {
      var _this = this

      if (resp.code == 0) {
        const {data} = resp
        _this.taskId = data.taskId
        _this.$message.success('名单导入完成！')
        _this.onProgress();
      } else {
        _this.$message.error(resp.message || '未知错误')
      }
    },
    onProgress(){
      var that = this
      that.interval = setInterval(()=>{
        that.getProgress()
      },1000)
    },
    getProgress(){
      var that = this
      filterProgress({taskId: that.taskId}).then(resp=>{
        const {data} = resp
        let total = data.total
        let complete = data.complete
        let percent = (complete*100/total).toFixed(0)
        this.percent = percent
        if(complete>=total-1){
          that.filePath = process.env.VUE_APP_OSS_API + '/api/v1.0/vip/download?taskId='+that.taskId
          clearInterval(that.interval);
        }
      })
    }


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
