<template>
  <div>
    <Table :driver-list="driverList" />
  </div>
</template>
<script>
import Table from '../../components/Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      driverList: []
    }
  },
  mounted: function() {
    this.getDriversData()
  },
  methods: {
    getDriversData() {
      this.$store.dispatch('drivers/getDrivers').then((res) => {
        this.driverList = res
      })
    }
  }
}
</script>
