<template>
  <div class="app-container">

    <div class="box">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <label>校验号码</label>

            <el-input
              v-model="phone"
              type="textarea"
              :rows="20"
              placeholder="请输入号码,每行一个。每次最多验证1个号码"
            />

            <el-button type="primary" class="check-btn" @click="verify">号码校验</el-button>

          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <label>校验结果</label>
            <el-table
              border
              stripe
              :data="datas"
              style="width: 100%"
            >
              <el-table-column
                prop="phone"
                label="号码"
                align="center"
              />
              <el-table-column
                prop="code"
                label="白名单"
                align="center"
              >
                <template slot-scope="scope">
                  <span :class="scope.row.class"> {{ scope.row.code | statusDesc }} </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>

</template>

<script>

import { check, stat } from '@/api/tool'

export default {
  filters: {
    statusDesc(val) {
      return val == 0 ? '否' : '是'
    }
  },
  data() {
    return {
      phone: '',
      total: 0,
      datas: [],
      fileList: [],
      paramList: { type: 1 },
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/v1.0/black/upload'
    }
  },

  created() {
    this.stat()
  },
  methods: {
    verify() {
      let phones = this.phone.trim()
      if (!phones) {
        this.$message.error('请输入要验证的号码')
        return
      }
      phones = phones.replace(/\n/g, ',')
      let arr = phones.split(',')
      arr = arr.slice(0, 1)
      const phones_str = arr.join(',')
      const params = { phones: phones_str, type: 0 }
      check(params).then(response => {
        const { data } = response
        const result = []
        for (var p in data) {
          const class_name = data[p] == 1 ? 'tag-cdr' : ''
          result.push({ phone: p, code: data[p], class: class_name })
        }
        this.datas = result
      })
    },
    onSuccess(resp) {
      var _this = this
      if (resp.rcode == 0) {
        _this.$message.success('白名单导入成功！')
        _this.stat()
      } else {
        _this.$message.error(resp.message || '未知错误')
      }
    },
    stat() {
      stat({ type: '1' }).then(response => {
        const { data } = response
        this.total = data.vip
      })
    }
  }
}
</script>

<style lang="scss">
    .box{
        margin-top: 10px;
        .grid-content {
            label{
                display: block;
                margin:10px 0px;
                color:#808080;
            }
            .check-btn{
                margin: 8px 0 ;
                width:-webkit-fill-available;
            }

             & .el-upload-dragger{
                width:320px;
            }
            .tag-cdr{
                color:red;
            }
        }

    }
</style>
