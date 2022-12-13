<template>
  <div>
    <Table :etc-list="etcList" />
  </div>
</template>
<script>
import Table from '../../../components/ETC_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      etcList: []
    }
  },
  mounted: function() {
    this.getEtcData()
  },
  methods: {
    getEtcData() {
      console.log(1)
      this.$store.dispatch('etc/getEtc').then((res) => {
        console.log('res', res)
        this.etcList = res
      })
    }
  }
}
</script>
