<template>
  <el-form ref="settingForm" :model="settingForm" status-icon  label-width="120px" class="drawer-form">
    <el-form-item label="落地网关IP" prop="sipIp">
      <el-input v-model="settingForm.sipIp" type="text" autocomplete="off" maxlength="128" />
    </el-form-item>
    <el-form-item label="落地端口" prop="sipPort">
      <el-input v-model="settingForm.sipPort" type="text" autocomplete="off" maxlength="36" />
    </el-form-item>
    <el-form-item label="对接网关IP" prop="toIp">
      <el-input v-model="settingForm.toIp" type="text" autocomplete="off" maxlength="128" />
    </el-form-item>
    <el-form-item label="对接端口" prop="toPort">
      <el-input v-model="settingForm.toPort" type="text" autocomplete="off" maxlength="36" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getSetting,updateSetting } from '@/api/tenant/setting'

export default {
  data() {
    return {
      settingForm: {
        sipIp: '',
        sipPort: '',
        toIp: '',
        toPort: ''
      }
    }
  },
  created() {
      this.getDetail()
  },
  methods: {
    submitForm() {
        this.updateForm();
    },
    updateForm() {
      updateSetting(this.settingForm).then(response => {
        this.$message.success('更新成功!')
        this.$emit('onSuccess')
      })
    },
    getDetail() {
      getSetting().then(response => {
        const { data } = response
        this.settingForm = data ||{}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-select .el-select{
    width:100%;
  }
</style>
