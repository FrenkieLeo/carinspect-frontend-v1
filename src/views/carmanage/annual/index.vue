<template>
  <div>
    <Table :annual-list="annualList" />
  </div>
</template>
<script>
import Table from '../../../components/Annual_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      annualList: []
    }
  },
  mounted: function() {
    this.getAnnualList()
  },
  methods: {
    getAnnualList() {
      this.$store.dispatch('annual/getAnnual').then((res) => {
        this.annualList = res
      })
    }
  }
}
</script>
