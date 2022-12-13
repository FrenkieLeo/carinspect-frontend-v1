<template>
  <div>
    <Table :order-list="orderList" />
  </div>
</template>
<script>
import Table from '../../../components/Order_Table/index'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Table
  },
  data() {
    return {
      orderList: []
    }
  },
  mounted: function() {
    this.getOrderData()
  },
  methods: {
    getOrderData() {
      this.$store.dispatch('order/getOrder').then((res) => {
        this.orderList = res
      })
    }
  }
}
</script>
