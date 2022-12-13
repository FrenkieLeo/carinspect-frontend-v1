<template>
  <div>
    <Table :vehicle-list="vehicleList" />
  </div>
</template>
<script>
import Table from '../../components/Vehicles_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      vehicleList: []
    }
  },
  mounted: function() {
    this.getVehiclesData()
  },
  methods: {
    getVehiclesData() {
      this.$store.dispatch('vehicles/getVehicles').then((res) => {
        console.log('res', res)
        this.vehicleList = res
      })
    }
  }
}
</script>
