<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="right_part">
      <h2>里程超过200公里用车</h2>
      <vxe-grid v-bind="problemMile" />
      <h2>周末/节假日用车</h2>
      <vxe-grid v-bind="problemHoliday" />
    </div>
    <div class="left_part">
      <h2>离穗用车</h2>
      <vxe-grid v-bind="problemLeave" />
      <h2>连续加油</h2>
      <vxe-grid v-bind="problemFuel" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      problemMile: {
        border: true,
        resizable: true,
        height: 400,
        proxyConfig: {
          ajax: {
            // 接收 Proise
            query: () => {
              return new Promise(resolve => {
                const list = this.getDashboardData('problemMile')
                resolve(list)
              })
            }
          }
        },
        columns: [
          { type: 'seq', width: 40 },
          { field: 'order', title: '订单', showOverflow: true },
          { field: 'licence', title: '车牌号' },
          { field: 'start_time', title: '用车开始时间' },
          { field: 'end_time', title: '用车结束时间' },
          { field: 'driver', title: '驾驶员' },
          { field: 'reason', title: '用车事由' }
        ]
      },
      problemHoliday: {
        border: true,
        resizable: true,
        height: 400,
        proxyConfig: {
          ajax: {
            // 接收 Proise
            query: () => {
              return new Promise(resolve => {
                const list = this.getDashboardData('problemHoliday')
                resolve(list)
              })
            }
          }
        },
        columns: [
          { type: 'seq', width: 40 },
          { field: 'order', title: '订单', showOverflow: true },
          { field: 'licence', title: '车牌号' },
          { field: 'start_time', title: '用车开始时间' },
          { field: 'driver', title: '驾驶员' },
          { field: 'reason', title: '用车事由' }
        ]
      },
      problemLeave: {
        border: true,
        resizable: true,
        height: 400,
        proxyConfig: {
          ajax: {
            // 接收 Proise
            query: () => {
              return new Promise(resolve => {
                const list = this.getDashboardData('leaveGZ_data')
                resolve(list)
              })
            }
          }
        },
        columns: [
          { type: 'seq', width: 40 },
          { field: 'name', title: '车牌号', showOverflow: true },
          { field: 'entry', title: '收费站入口' },
          { field: 'exit', title: '收费站出口' },
          { field: 'entry_time', title: '离穗时间' }
        ]
      },
      problemFuel: {
        border: true,
        resizable: true,
        height: 400,
        proxyConfig: {
          ajax: {
            // 接收 Proise
            query: () => {
              return new Promise(resolve => {
                const list = this.getDashboardData('fuel_data')
                resolve(list)
              })
            }
          }
        },
        columns: [
          { type: 'seq', width: 40 },
          { field: 'name', title: '车牌号', showOverflow: true },
          { field: 'firstTime', title: '第一次加油' },
          { field: 'secondTime', title: '第二次加油' }
        ]
      }
    }
  },
  created() {
    // this.getDashboardData()
  },
  methods: {
    async getDashboardData(attr) {
      const result = await this.$store.dispatch('dashboard/getDashboard')
      const listData = await result[attr]
      console.log('res', listData)
      return listData
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.right_part {
  // background:blue;
  width:59%;
  margin-right:1%;
  float:left;
}
.left_part {
  // background: orange;
  margin-left:1%;
  width:39%;
  float:right;

}

.exportButton{
  display: inline-block;
}
</style>
