<template>
  <div class="infomation">
    <s-table
      ref="Stable"
      :columns="columns"
      :list="data"
      :pageSizeOptions="['10', '20', '30', '40']"
      :pageSize="10"
      :currentPage="1"
      :total="50"
      @rowSelection="rowSelection"
      @on-click="clickRow"
      @on-dblclick="dblclickRow"
      @on-page-change="pageChange"
      @on-show-size-change="showSizeChange"
    >
      <template #action="text">
        <a-button
          type="primary"
          danger
          value="small"
          @click.stop="action(text)"
        >
          删除
        </a-button>
        <a-button type="primary" value="small" @click.stop="action(text)">
          新增
        </a-button>
      </template>
    </s-table>
    <list-custom
      v-if="data.length !== 0"
      :columns="initColumns"
      @changeColumns="getColumns"
    ></list-custom>
  </div>
</template>

<script>
const initColumns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    show: true,
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    ellipsis: true,
    align: 'center',
    show: true,
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: 'age1',
    //width: 150,
    ellipsis: 'true',
    align: 'center',
    show: true,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    ellipsis: true,
    key: 'age2',
    //width: 150,
    align: 'center',
    show: true,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: 'age3',
    ellipsis: true,
    // width: 150,
    align: 'center',
    show: true,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    ellipsis: true,
    key: 'age8',
    // width: 150,
    align: 'center',
    show: true,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 200,
    show: true,
    align: 'center',
    slots: { customRender: 'action' },
  }
]

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: `llgtfoo${i}`,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
export default {
  data() {
    return {
      data,
      initColumns,
      columns: [],
    }
  },
  mounted() {
    this.columns = this.initColumns.filter((e) => e.show)
  },
  methods: {
    getColumns(columns) {
      this.columns = columns.filter((e) => e.show)
    },
    action(data) {
      console.log(data, 'action')
    },
    clickRow(data) {
      console.log(data, 'clickRow')
    },
    dblclickRow(data) {
      console.log(data, 'dblclickRow')
    },
    rowSelection(indexs, rows) {
      console.log(indexs, rows, "rowSelection")
    },
    pageChange(page, pageSize) {
      console.log(page, pageSize, 'pageChange')
    },
    showSizeChange(current, size) {
      console.log(current, size, 'showSizeChange')
    },
  },
}
</script>

<style lang="scss" scoped>
.infomation {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>