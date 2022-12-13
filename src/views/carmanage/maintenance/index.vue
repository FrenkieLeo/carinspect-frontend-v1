<template>
  <div>
    <Table :maintenance-list="maintenanceList" />
  </div>
</template>
<script>
import Table from '../../../components/Maintenance_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      maintenanceList: []
    }
  },
  mounted: function() {
    this.getMaintenanceData()
  },
  methods: {
    getMaintenanceData() {
      console.log('getMain')
      this.$store.dispatch('maintenance/getMaintenance').then((res) => {
        this.maintenanceList = res
      })
    }
  }
}
</script>
