<template>
  <div class="container">
    <vxe-toolbar>
      <template #buttons>
        <vxe-input
          v-model="filterName1"
          type="search"
          placeholder="试试全表搜索"
          @keyup="searchEvent()"
        />
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="exportDataEvent">导出</vxe-button>
        <vxe-button @click="importDataEvent">导入</vxe-button>
        <vxe-button @click="$refs.fuelTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="saveData">保存数据</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="fuelTable"
      border
      resizable
      :keep-source="true"
      :column-config="columnConfig"
      :row-config="{ isHover: true }"
      :scroll-y="{ enabled: false }"
      :data="newList"
      :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        icon: '   ',
        showStatus: true,
      }"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column type="seq" title="序号" width="60" />
      <vxe-column
        field="name"
        title="车牌号"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.name" type="text" />
        </template>
      </vxe-column>
      <vxe-column field="fuel_card" title="油卡卡号" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.fuel_card"
            type="text"
            placeholder="ETC卡号"
          />
        </template>
      </vxe-column>
      <vxe-column field="gas_station" title="油站名称" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.gas_station" type="text" placeholder="油站名称" />
        </template>
      </vxe-column>
      <vxe-column field="fuel_type" title="油品类型" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-select v-model="row.fuel_type" clearable transfer>
            <vxe-option
              v-for="item in fuel_type"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            />
          </vxe-select>
        </template>
      </vxe-column>
      <vxe-column field="price" title="单价(元/L)" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.price" type="text" placeholder="单价(元/L)" />
        </template>
      </vxe-column>
      <vxe-column field="volume" title="加油量(L)" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.volume" type="text" placeholder="加油量(L)" />
        </template>
      </vxe-column>
      <vxe-column field="should_pay" title="加油金额(元)" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.should_pay" type="text" placeholder="加油金额(元)" />
        </template>
      </vxe-column>
      <vxe-column field="actual_pay" title="实付金额" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.actual_pay" type="text" placeholder="实付金额" />
        </template>
      </vxe-column>
      <vxe-column field="trade_time" title="交易时间" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.trade_time"
            type="date"
            placeholder="请选择日期"
            transfer
          />
        </template>
      </vxe-column>
      <!-- <vxe-column title="操作" width="140">
        <template #default="{ row }" class="operation">
          <el-button @click="editEvent(row)">附件</el-button>
        </template>
      </vxe-column> -->
    </vxe-table>
    <!-- <vxe-modal
      v-model="showEdit"
      title="附件列表"
      width="40vw"
      min-width="600"
      min-height="300"
      resize
      destroy-on-close
      transfer
    >
      <vxe-toolbar>
        <template #buttons>
          <vxe-button
            status="primary"
            @click="file_insertEvent({ multiple : true })"
          >选择文件</vxe-button>
          <vxe-button
            @click="handleClose"
          > 删除选中
          </vxe-button>
          <vxe-button
            status="warning"
            @click="download_file()"
          >下载选中文件</vxe-button></template>
      </vxe-toolbar>
      <vxe-table
        ref="fileTable"
        border
        :loading="loading"
        show-overflow
        height="400"
        :data="fileData"
      >
        <vxe-column type="checkbox" width="60" />
        <vxe-column type="seq" width="60" />
        <vxe-column field="name" title="Name" />
      </vxe-table>
    </vxe-modal> -->
  </div>
</template>

<script>
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import _ from 'lodash'
// import { remove } from 'js-cookie'
// import { COMPLETIONSTATEMENT_TYPES } from '@babel/types'
// import { resolve } from 'path'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    fuelList: Array || String
  },
  data() {
    return {
      filterName1: '',
      newList: '',
      columnConfig: {
        isHover: true,
        resizable: true
      },
      position: {
        top: '50vw',
        left: '50vh'
      },
      list: [],
      selectRow: null,
      showEdit: false,
      fileData: [],
      updateData: {
        modifyData: [],
        deleteData: [],
        insertData: [],
        otherData: []
      },
      fuel_type: [
        { label: '88', value: '88', disabled: false },
        { label: '92', value: '92', disabled: false },
        { label: '95', value: '95', disabled: false },
        { label: '98', value: '98', disabled: false },
        { label: '柴油', value: '柴油', disabled: false }
      ],
      clickData: {},
      loading: false
    }
  },
  computed: {
    driverData() {
      return this.fuelList
    }
  },
  created() {
    this.searchEvent()
  },
  methods: {
    Yoffset() {
      console.log('高度', window.pageYOffset)
      return window.pageYOffset
    },
    exportDataEvent() {
      this.$refs.fuelTable.exportData({ type: 'csv' })
    },
    importDataEvent() {
      alert('有待实现')
    },
    showDetailEvent(row) {
      console.log(row)
    },
    async editEvent(row) {
      this.clickData = {
        click_name: row.name,
        click_id: row.id,
        click_module: 'drivers'
      }
      console.log('高度', window.pageYOffset)
      this.selectRow = row
      this.showEdit = true
      const initFile = await new Promise((resolve, reject) => {
        this.$store.dispatch('files/getFileInfo', this.clickData).then(res => {
          resolve(res)
        })
      })
      const records = Array.from(initFile).map(file => {
        const info = {
          name: file.file_name,
          size: file.file_size,
          type: file.file_type,
          date: file.updateAt,
          download: file.download
        }

        return info
      })
      console.log('row', this.$refs.fileTable)
      this.$refs.fileTable.insert(records)
    },
    insertEvent() {
      const $table = this.$refs.fuelTable
      const newRow = {
        name: '新数据'
      }
      $table.insert(newRow).then(({ row }) => $table.setActiveRow(row))
    },
    // 主持附件上传
    async file_insertEvent(opts) {
      const $file_table = this.$refs.fileTable
      const files = await this.read_file($file_table, opts)
      this.loading = true
      const recordsPromise = Array.from(files).map(file => {
        const ns = file.name.split('.')
        const name = ns.slice(0, ns.length - 1).join('')
        const type = ns[ns.length - 1]
        const sendFile = { clickData: this.clickData, file: file }
        console.log('sendFile', sendFile)
        return this.file_upload(name, type, sendFile)
      })
      await Promise.allSettled(recordsPromise).then(res => {
        console.log('allSettled', res)
        const records = res.map(item => {
          const name = JSON.parse(item.value).name
          const download = JSON.parse(item.value).download
          return {
            name: name,
            download: download
          }
        })
        for (const i in res) {
          if (res[i].code === 40000) {
            this.loading = false
          }
        }
        this.loading = false
        $file_table.insert(records)
      })
    },
    read_file(table, opts) {
      return new Promise((resolve, reject) => {
        table.readFile(opts).then(param => {
          const { files } = param
          resolve(files)
        })
      })
    },
    file_upload(name, type, sendFile) {
      console.log('file_upload', sendFile)
      return new Promise((resovle, reject) => {
        this.$store.dispatch('files/upload', sendFile).then(res => {
          if (res === 'cannot upload') {
            resovle('failure')
          }
          resovle(JSON.stringify({
            name: name,
            type: type,
            date: XEUtils.toDateString(new Date()),
            download: res.download
          }))
        })
      })
    },
    download_file() {
      const $file_table = this.$refs.fileTable
      const selectRecords = $file_table.getCheckboxRecords()
      for (const i in selectRecords) {
        console.log('download', selectRecords[i].download)
        window.open(selectRecords[i].download)
      }
    },
    async handleClose() {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $table = this.$refs.fileTable
      const selectRecords = $table.getCheckboxRecords()
      const sendData = {
        click: this.clickData,
        selectRecords: selectRecords
      }
      if (type === 'confirm') {
        $table.remove(selectRecords)
        const handleDelete = await new Promise((resolve, reject) => {
          this.$store.dispatch('files/deleteFile', sendData).then(res => {
            resolve(res)
          })
        })
        console.log('you have delete files', handleDelete)
      }
    },
    // 保存数据按钮
    saveData() {
      this.updateData.updateData = JSON.parse(
        JSON.stringify(this.$refs.fuelTable.getUpdateRecords())
      )
      this.updateData.insertData = JSON.parse(
        JSON.stringify(this.$refs.fuelTable.getInsertRecords())
      )
      this.updateData.deleteData = JSON.parse(
        JSON.stringify(this.$refs.fuelTable.getRemoveRecords())
      )
      this.$store
        .dispatch(
          'fuel/updateFuel',
          JSON.parse(JSON.stringify(this.updateData))
        )
        .then((res) => {
          // eslint-disable-next-line eqeqeq
          if (confirm('是否保存') == true) {
            this.$router.go(0)
            return true
          } else {
            return false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async insertRow(currRow) {
      const $table = this.$refs.fuelTable
      const record = {
        name: '新数据'
      }
      const { row: newRow } = await $table.insertAt(record, currRow)
      await $table.setActiveRow(newRow)
    },
    searchEvent: _.debounce(function() {
      // const search = _.debounce(function() {
      //   console.log(this.filterName1)
      // }, 500)
      // return search()
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      if (filterName) {
        const searchProps = ['name', 'fuel_card', 'gas_station', 'fuel_type', 'price', 'volume', 'should_pay', 'actual_pay', 'trade_time']
        const rest = this.fuelList.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.newList = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key])
          })
          return item
        })
      } else {
        this.newList = this.fuelList
      }
      console.log(this.newList)
    }, 500)
  }
}
</script>

<style>
.container {
  margin-left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.keyword-lighten {
  color: #000;
  background-color: #FFFF00;
}
.appendix::before{
  content:'sdfsfsdfsdfsdfsdf';
  color:black;
}
</style>

