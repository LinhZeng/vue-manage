export default {
  data() {
    return {
      totalData: {
        data: [], // 表格数据
        params: { // 分页数据
          page: 1, // 当前页码
          limit: 10  // 一页的大小
        },
        total: 0
      },
      order: '',
      // 当前行
      selectdRow: {},
      // 当前修改id
      writedId: 0,
      // 是否自动执行render
      isRender: true,
    };
  },
  created() {
    // 能自动执行和有配置请求才自动调用
    if(this.isRender && this.request) {
      this.init();
    }
  },
  methods: {
    // 查找表格数据
    async init(params) {
      try {
        // 在created钩子函数进行的DOM操作一定要放在nextTick的回调函数中。created钩子函数执行的时候DOM并未进行任何渲染
        await this.$nextTick();
        this.$refs.table.showLoading();
        let form = (this.formAttr ? this.formAttr.model : this.form) || {};
        params = {...params, ...form};
        if(this.beforeInit) 
          params = this.beforeInit(params);
        if(params && params.isSearch) { // 首页查询
          delete params.isSearch;
          this.totalData.params.offset = 1; 
        }
        let limit = this.totalData.params.limit;
        let page = this.totalData.params.page;
        const { post } = this.request;
        let res = {}, requestParams = {};
        if(post) {
          requestParams = {
            ...params,
            page,
            limit
          };
          console.log(requestParams);
          if(this.order) {
            requestParams.order = this.order;
          }
          if(typeof post === 'object') {
            res = await post.method(requestParams);
            res = post.transform(res);
            console.log(res)
          } else {
            res = await post(requestParams);
          }
          this.$refs.table.hideLoading();
          if(res.result) {
            this.totalData.data = res.result.list || [];
            this.totalData.total = res.result.list.length;
            // this.totalData.total = Number(res.data.total);
          } else {
            this.totalData.data = [];
            this.totalData.total = 0;
          }
        } else {
          console.error("request对象没有传递post的方法, 或者重写init方法");
        }
      } finally {
        this.$refs.table.hideLoading();
      }
    }
  }
}