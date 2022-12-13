<template>
  <div>
    <Table :accidents-list="accidentsList" />
  </div>
</template>
<script>
import Table from '../../../components/Accidents_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      accidentsList: []
    }
  },
  mounted: function() {
    this.getAccidentsData()
  },
  methods: {
    getAccidentsData() {
      console.log('getAcc')
      this.$store.dispatch('accidents/getAccidents').then((res) => {
        this.accidentsList = res
      })
    }
  }
}
</script>
