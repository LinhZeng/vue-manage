import Pagination from '@/components/Pagination';
<template>
  <div>
    <el-table v-bind="tableAttrs" 
          v-on="tableListeners"
          v-loading="tableLoading" 
          :data="totalData.data" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
      <template v-for="(column,index) in columns">
        <el-table-column v-bind="column || {}" :key="index" v-if="!column.slots"></el-table-column>
        <el-table-column v-bind="column || {}" :key="index" v-else>
          <template slot-scope="scope">
            <slot :name="column.slots" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <pagination v-show="totalData.total>0" :total="totalData.total" :page.sync="totalData.params.offset" :limit.sync="totalData.params.count"  @pagination="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'better-table',
  components: { Pagination },
  props: {
    totalData: {
      type: Object,
      default: () => {
        return {
          data: [],
          params: {
            offset:0,
            count: 10
          },
          total: 0
        }
      }
    },
    columns: Array,
    customInit: Function
  },
  data(){
    return {
      tableLoading: true,
      visible: false
    }
  },
  computed: {
    tableAttrs() {
      const {columns, ...tableAttrs} = this.$attrs;
      return {border: true, ...tableAttrs};
    },
    tableListeners() {
      return this.$listeners;
    }
  },
  methods: {
    pageInit() {
      let component = this.$parent;
      while(!component.init) {
        component = component.$parent;
      }
      return component.init();
    },
    getList(val){
      this.totalData.params.offset = val.page;
      this.totalData.params.count = val.limit;
      const init = this.customInit || this.pageInit;
      init && init();
    },
    showLoading() {
      this.tableLoading = true;
    },
    hideLoading() {
      this.tableLoading = false;
    }
  }
}
</script>

<style>

</style>