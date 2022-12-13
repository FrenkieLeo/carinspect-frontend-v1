<template>
  <div>
    <Table :illegal-list="illegalList" />
  </div>
</template>
<script>
import Table from '../../../components/Illegal_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      illegalList: []
    }
  },
  mounted: function() {
    this.getIllegalData()
  },
  methods: {
    getIllegalData() {
      this.$store.dispatch('illegal/getIllegal').then((res) => {
        this.illegalList = res
      })
    }
  }
}
</script>
