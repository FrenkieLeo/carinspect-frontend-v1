<template>
  <div>
    <el-alert :closable="false" title="etc" />
    <Table />
  </div>
</template>
<script>
import Table from '../../../components/Table/index'
export default {
  name: 'Etc',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  }
}
</script>
