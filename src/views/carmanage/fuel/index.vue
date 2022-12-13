<template>
  <div>
    <Table :fuel-list="fuelList" />
  </div>
</template>
<script>
import Table from '../../../components/Fuel_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      fuelList: []
    }
  },
  mounted: function() {
    this.getFuelData()
  },
  methods: {
    getFuelData() {
      this.$store.dispatch('fuel/getFuel').then((res) => {
        this.fuelList = res
      })
    }
  }
}
</script>
