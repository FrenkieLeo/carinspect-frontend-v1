<template>
  <div class="container">
    <vxe-toolbar>
      <template #buttons>
        <vxe-input
          v-model="filterName"
          type="search"
          placeholder="试试全表搜索"
        />
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="exportDataEvent">导出</vxe-button>
        <vxe-button @click="importDataEvent">导入</vxe-button>
        <vxe-button @click="saveData">保存数据</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="driverTable"
      border
      resizable
      :keep-source="true"
      :column-config="columnConfig"
      :row-config="{ isHover: true }"
      :scroll-y="{ enabled: false }"
      :data="driverData"
      :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        icon: '   ',
        showStatus: true,
      }"
    >
      <vxe-column type="seq" title="序号" width="60" />
      <vxe-column
        field="name"
        title="姓名"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.name" type="text" />
        </template>
      </vxe-column>
      <vxe-column field="department" title="部门" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.department"
            type="text"
            placeholder="所属部门"
          />
        </template>
      </vxe-column>
      <vxe-column field="phone" title="联系方式" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.phone" type="text" placeholder="联系方式" />
        </template>
      </vxe-column>
      <vxe-column field="title" title="职务" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.title" type="text" placeholder="职务" />
        </template>
      </vxe-column>
      <vxe-column field="license_number" title="驾照号" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.license_number"
            type="text"
            placeholder="驾照号"
          />
        </template>
      </vxe-column>
      <vxe-column field="license_type" title="驾照类型" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-select v-model="row.license_type" clearable transfer>
            <vxe-option
              v-for="item in license"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            />
          </vxe-select>
        </template>
      </vxe-column>
      <vxe-column field="license_expire" title="驾照有效期" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.license_expire"
            type="date"
            placeholder="请选择日期"
            transfer
          />
        </template>
      </vxe-column>
      <vxe-column field="test_situation" title="安全测试情况" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.test_situation"
            type="text"
            placeholder="安全测试情况"
            transfer
          />
        </template>
      </vxe-column>
      <vxe-column title='操作' width='140'>
        <template #default='{ row }' class='operation'>
          <vxe-button @click='editEvent(row)'>附件</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-modal
      v-model='showEdit'
      title='附件列表'
      width='1000'
      min-width='600'
      min-height='300'
      resize
      destroy-on-close
    >
      <vxe-toolbar>
        <template #buttons>
          <vxe-button status="primary" @click="insertEvent">选择文件</vxe-button>
          <vxe-button
            status="primary"
@click="insertEvent({ multiple: true })"
          >选择多个</vxe-button>
          <vxe-button
@click="$refs.fileTable.removeCheckboxRow()">删除选中</vxe-button>
          <vxe-button @click="getInsertEvent">保存</vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-table
        ref="fileTable"
        border
        show-overflow
        height="400"
        :data="fileData"
      >
        <vxe-column type="checkbox" width="60" />
        <vxe-column type="seq" width="60" />
        <vxe-column field="name" title="Name" />
        <vxe-column field="type" title="Type" />
        <vxe-column field="size" title="Size" />
        <vxe-column field="date" title="Date" />
      </vxe-table>
    </vxe-modal>
  </div>
</template>

<script>
import VXETable from 'vxe-table'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    driverList: Array
  },
  data() {
    return {
      filterName: '',
      columnConfig: {
        isHover: true,
        resizable: true
      },
      selectRow: null,
      showEdit: false,
      fileData: [],
      license: [
        { label: 'C1', value: 'C1', disabled: false },
        { label: 'C2', value: 'C2', disabled: false },
        { label: 'C3', value: 'C3', disabled: false },
        { label: 'B1', value: 'B1', disabled: false },
        { label: 'B2', value: 'B2', disabled: false },
        { label: 'A1', value: 'A1', disabled: false },
        { label: 'A2', value: 'A2', disabled: false },
        { label: 'A3', value: 'A3', disabled: false }
      ],
      updateData: {
        modifyData: [],
        insertData: [],
        deleteData: [],
        otherData: []
      }
    }
  },
  computed: {
    driverData() {
      return this.driverList
    }
  },
  methods: {
    exportDataEvent() {
      this.$refs.driverTable.exportData({ type: 'csv' })
    },
    importDataEvent() {
      this.$refs.driverTable.importData()
    },
    showDetailEvent(row) {
      console.log(row)
    },
    editEvent(row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        checkedList: row.checkedList,
        flag1: row.flag1,
        date3: row.date3,
        address: row.address
      }
      this.selectRow = row
      this.showEdit = true
    },
    insertEvent() {
      const $table = this.$refs.driverTable
      const newRow = {
        name: '新数据'
      }
      $table.insert(newRow).then(({ row }) => $table.setActiveRow(row))
    },
    getInsertEvent() {
      const $table = this.$refs.fileTable
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(insertRecords.length)
    },
    // 保存数据按钮
    saveData() {
      this.updateData.updateData = JSON.parse(
        JSON.stringify(this.$refs.driverTable.getUpdateRecords())
      )
      this.updateData.insertData = JSON.parse(
        JSON.stringify(this.$refs.driverTable.getInsertRecords())
      )
      console.log(JSON.parse(JSON.stringify(this.updateData)))
      this.$store
        .dispatch(
          'drivers/updateDrivers',
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
      const $table = this.$refs.driverTable
      const record = {
        name: '新数据'
      }
      const { row: newRow } = await $table.insertAt(record, currRow)
      await $table.setActiveRow(newRow)
    }
  }
}
</script>

<style>
.container {
  margin-left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>

