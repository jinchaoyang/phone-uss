<template>
 <el-table
      v-loading="listLoading"
      :data="datas"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="日期" >
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
    
      <el-table-column label="黑名单总量" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>
       <el-table-column label="黑名单拦截" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.forbid }}</span>
        </template>
      </el-table-column>
        <el-table-column label="白名单总量" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.vipTotal }}</span>
        </template>
      </el-table-column>
       <el-table-column label="白名单拦截" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.vip }}</span>
        </template>
      </el-table-column>
      
    </el-table>


</template>

<script>
import { stat } from '@/api/tenant'

  export default {
    data() {
      return {
          datas:[],
          loaded: false,
          listLoading: true  
      };
    },

    methods: {
     fetchData(ip){
         this.listLoading = true;
         this.loaded = true;
         stat({ip: ip}).then(response => {
             const { data }  = response
             this.datas = data.slice(0,15)
             this.listLoading = false
         })
     },
    }
  }
</script>
