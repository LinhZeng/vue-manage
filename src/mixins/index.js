export default {
  data() {
    return {
      totalData: {
        tableData: [], // 表格数据
        params: { // 分页数据
          offset: 1,
          count: 10
        },
        total: 0
      },
      other: {
        colName: 'createTime',
        desc: true
      },
      // 当前行
      selectdRow: {},
      // 当前修改id
      writedId: 0,
      // 是否自动执行render
      isRender: true,
    };
  },
  created() {
    if(this.isRender) {
      this.init()
    }
  },
  methods: {
    // 查找表格数据
    async init(params) {
      try {
        // 在created钩子函数进行的DOM操作一定要放在nextTick的回调函数中。created钩子函数执行的时候DOM并未进行任何渲染
        await this.$nextTick();
        this.$refs.table.showLoading();
      } catch(e) {

      }
    }
  }
}