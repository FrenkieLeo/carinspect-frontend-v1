<template>
  <div>
    <Table :insurance-list="insuranceList" />
  </div>
</template>
<script>
import Table from '../../../components/Insurance_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      insuranceList: []
    }
  },
  mounted: function() {
    this.getInsuranceData()
  },
  methods: {
    getInsuranceData() {
      this.$store.dispatch('insurance/getInsurance').then((res) => {
        this.insuranceList = res
      })
    }
  }
}
</script>
