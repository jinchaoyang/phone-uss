<template>
  <el-form status-icon label-width="100px" class="drawer-form drawer-show">
    <el-form-item label="呼叫时间">
      <span>{{ cdr.callAt }}</span>
    </el-form-item>
    <el-form-item label="呼叫号码">
      <span>{{ cdr.callee}}</span>
    </el-form-item>

    <el-form-item label="主叫网关IP">
      <span>{{ cdr.callerIp }}</span>
    </el-form-item>
      <el-form-item label="被叫网关IP">
      <span>{{ cdr.calleeIp }}</span>
    </el-form-item>

    <el-form-item label="状态">
      <span>{{ cdr.status }}</span>
    </el-form-item>
    <el-form-item label="转换内容">
      <span>{{ cdr.result }}</span>
    </el-form-item>
    <el-form-item label="敏感词">
      <span>{{ cdr.tag }}</span>
    </el-form-item>

        <el-form-item label="备注">
      <span>{{ cdr.err }}</span>
    </el-form-item>

    <el-form-item label="质检提交时间">
      <span>{{ cdr.createTime }}</span>
    </el-form-item>
       <el-form-item label="质检结果时间">
      <span>{{ cdr.resultTime }}</span>
    </el-form-item>
  </el-form>
</template>

<script>

import moment from 'moment'

export default {
  filters: {
    formatDate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: ['cdr'],
  data() {
    return {
      
    }
  }


}
</script>
