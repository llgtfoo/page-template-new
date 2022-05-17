/**
 * @name: table表格组件
 * @param {type}
 */
<script>
export default {
  name: 'STable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    }, //列表项
    list: {
      type: Array,
      default: () => [],
    }, //数据
    bordered: {
      type: Boolean,
      default: true,
    }, //边框
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30    ', '4    0', '    50', '60'],
    }, //每页条数选项
    pageSize: {
      type: [String, Number],
      default: 10,
    }, //每页条数
    currentPage: {
      type: [String, Number],
      default: 1,
    }, //当前页码
    total: {
      type: [String, Number],
      default: 0,
    }, //总条数
  },
  data() {
    return {
      scroll: {},
      selectedRowKeys: [],//多选
      currentPageSize: this.pageSize,
    }
  },
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.autoHeight()
      }
    },
  },
  mounted() {
    //监听窗口改变
    window.addEventListener('resize', () => {
      this.autoHeight()
    })
    this.autoHeight()

  },
  unmounted() {
    window.removeEventListener('resize', () => {
      this.autoHeight()
    })
  },
  methods: {
    //页面改变
    pageChange(page, pageSize) {
      this.$emit('on-page-change', page, pageSize)
    },
    //每页条数改变
    showSizeChange(current, size) {
      this.currentPageSize = size
      this.$emit('on-show-size-change', current, size)
    },
    //数据列表行属性
    customRow(record) {
      return {
        // style: {
        //   height: "50px",
        //   overflow: "hidden"
        // },
        // 事件
        onClick: (event) => {
          this.$emit('on-click', record)
        }, // 点击行
        // eslint-disable-next-line no-unused-vars
        onDblclick: (event) => {
          this.$emit('on-dblclick', record)
        },
      }
    },
    //多选
    onSelectChange(selectedRowKeys, selectedRows) {
      this.$emit('rowSelection', selectedRowKeys, selectedRows)
    },
    //表格计算自动高度
    autoHeight() {
      if (this.list.length === 0) {
        return
      }
      setTimeout(() => {
        const widthTotal = this.columns.reduce((prv, current) => {
          const news = current.show && current.width ? Number(current.width) : 180
          return prv + news
        }, 0)
        const x =
          widthTotal > this.$refs.STable.getBoundingClientRect().width ?
            widthTotal :
            this.$refs.STable.getBoundingClientRect().width
        this.scroll = {
          x: x - 12,
          y: this.$refs.STable.getBoundingClientRect().height - 65,
        }
      }, 0)
    },
  },
  render() {
    const props = {
      ...this.$attrs,
      ...this.$props,
      ...{
        bordered: this.bordered,
        dataSource: this.list,
        columns: this.columns,
        tableLayout: 'fixed',
        scroll: this.scroll,
        pagination: false,
        rowKey: (record) => record.key,
        // eslint-disable-next-line no-unused-vars
        customHeaderRow: (column) => {
          return {
            style: {
              height: '65px',
            },
          }
        },
        style: { width: `calc(100% - 0px)`, height: '100%' },
        rowSelection: {
          hideDefaultSelections: true,
          onChange: this.onSelectChange,
        },
        customRow: this.customRow,
      },
    }

    //表格元素
    const table = (
      <a-table {...props} v-slots={this.$slots}>
      </a-table>
    )
    //分页元素
    const pageProps = {
      ...this.$attrs,
      ...this.$props,
      ...{
        // current: 3,
        showSizeChanger: true,
        showQuickJumper: true,
        total: this.total,
        //defaultCurrent: this.currentPage,
        //defaultPageSize: this.pageSize,
        current: this.currentPage,
        pageSize: this.currentPageSize,
        pageSizeOptions: this.pageSizeOptions,
        showTotal: (total) => {
          return `共   ${total}    条`
        },
        onChange: this.pageChange,
        onShowSizeChange: this.showSizeChange,
      },
    }
    const page = <a-pagination {...pageProps}></a-pagination>
    const noData = <not-data></not-data> //没数据时

    const html = (
      <div class="s-table">
        <div class="s-table-content" ref="STable">
          {table}
        </div>
        <div class="page-info" ref="page">
          {page}
        </div>
      </div>
    )
    const noDataHtml = <div class="s-table">{noData}</div>
    return this.list.length !== 0 ? html : noDataHtml
  },
}
</script>
<style lang="scss">
.s-table {
  height: 100%;
  width: 100%;

  .s-table-content {
    height: calc(100% - 60px);
    width: 100%;
  }
  .page-info {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<style lang='scss'>
.s-table .ant-table-body {
  // overflow: auto !important;
  // overflow-x: scroll !important;
  height: 1000px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
}
.s-table .ant-table-body-inner {
  // overflow-y: auto !important;
}
.s-table .ant-table td,
.s-table .ant-table th {
  white-space: nowrap !important;
}
</style>
