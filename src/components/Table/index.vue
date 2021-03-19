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
      default: () => ['10', '20', '30', '40', '50', '60'],
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
      selectedRowKeys: [],
      currentPageSize: this.pageSize,
    }
  },
  mounted() {
    //监听窗口改变
    window.addEventListener('resize', () => {
      this.autoHeight()
    })
    this.autoHeight()
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
        on: {
          // 事件
          click: (event) => {
            console.log(event, 'event')
            this.$emit('on-click', record)
          }, // 点击行
          // eslint-disable-next-line no-unused-vars
          dblclick: (event) => {
            this.$emit('on-dblclick', record)
          },
        },
      }
    },
    //多选
    onSelectChange(selectedRowKeys, selectedRows) {
      this.$emit('rowSelection', selectedRowKeys, selectedRows)
    },
    //表格计算自动高度
    autoHeight() {
      setTimeout(() => {
        const widthTotal = this.columns.reduce((prv, current) => {
          const news = current.width && current.show ? current.width : 0
          return prv + news
        }, 0)
        const x =
          widthTotal > this.$refs.STable.getBoundingClientRect().width ?
            widthTotal :
            this.$refs.STable.getBoundingClientRect().width
        this.scroll = {
          x,
          y: this.$refs.STable.getBoundingClientRect().height - 65,
        }
      }, 0)
    },
  },
  render() {
    return '0'
  },
}
</script>
<style lang="scss" scoped>
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
/deep/.ant-table-body {
  overflow: auto !important;
  // overflow-y: auto !important;
}
/deep/.ant-table-body-inner {
  overflow: auto !important;
}
/deep/.ant-table td,
/deep/.ant-table th {
  white-space: nowrap !important;
}
// .ant-table-tbody > tr > td {
//   white-space: break-spaces;
// }
</style>
