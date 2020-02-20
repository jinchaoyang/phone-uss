<template>
  <div class="pagination">
    <el-pagination
      background
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

</template>
<script>
export default {
  props: ['pageNo', 'pageSize', 'total'],
  methods: {
    handleSizeChange(val) {
      this.$emit('pageChange', { pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pageChange', { pageNo: val })
    }
  }
}
</script>
