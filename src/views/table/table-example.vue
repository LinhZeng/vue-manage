<template>
  <el-row>
    <el-col class="common_header_block">
      <el-breadcrumb separator="/" class="breadcrumb_class">
        <el-breadcrumb-item>投放管理-产品包管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-form :inline="true" class="search_form">
        <el-form-item label="包ID:">
          <el-input placeholder="输入包ID" v-model="form.cpId" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="包名:">
          <el-input placeholder="输入包名" v-model="form.name" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="包链接:">
          <el-input placeholder="输入包链接" v-model="form.url" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作系统:">
          <el-select  placeholder="选择操作系统" v-model="form.sys" style="width: 200px" clearable filterable>
            <el-option v-for="(item,index) in systemList" :key="index" :label="item.systemName" :value="item.systemId" />
          </el-select>
        </el-form-item>
        <el-form-item label="媒体:">
          <el-select  placeholder="选择媒体" v-model="form.channelId" style="width: 200px" clearable filterable>
            <el-option v-for="(item,index) in mediaList" :key="index" :label="item.mediaName" :value="item.mediaId" />
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="init({isSearch:true})">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col class="common_table_header">
      <div class="table_header_block">
        <el-button type="primary" @click="addProductPack()">+新建产品包</el-button>
      </div>  
    </el-col>

    <el-col class="components_block">
      <div class="common_table_class">
        <better-table :columns="columns" ref="table" :total-data="totalData">
          <span slot-scope="{row}" slot="date">{{row.createTime | dateformat}}</span>
          <span slot-scope="{row}" slot="date">{{row.modifyTime | dateformat}}</span>
          <template slot-scope="scope" slot="button">
            <el-button type="text" @click="getDetail(scope.row.id)">修改</el-button>
            <el-button type="text" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </better-table>

        <better-dialog :visible.sync="dialogVisible" titie="dialog" width="800px" 
          @confirmClick="dialogVisible=false" :loading="loading" cancel-text=''>
          <el-form class="new_common_form" label-width='120px'>
            <el-form-item label="产品：" :required="true">
              <el-select placeholder="输入关键词，模糊搜索" filterable v-model="productInfo.appId" clearable style="width:250px">
                <el-option v-for="(item,index) in appList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="媒体：" :required="true">
              <el-select placeholder="输入关键词，模糊搜索" filterable v-model="productInfo.channelId" clearable style="width:250px">
                <el-option v-for="(item,index) in channelList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="绑包内容：" :required="true">
              <el-select placeholder="输入关键词，模糊搜索" filterable v-model="productInfo.packageTypeId" clearable style="width:250px">
                <el-option v-for="(item,index) in tiePackList" :key="index" :label="item.packageName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作系统：" :required="true">
              <el-select placeholder="选择操作系统" filterable v-model="productInfo.sys" clearable style="width:250px">
                <el-option v-for="(item,index) in systemList" :key="index" :label="item.systemName" :value="item.systemId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="包名：" :required="true">
              <el-input placeholder="输入包名" v-model="productInfo.name" clearable style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="包ID：" :required="true">
              <el-input placeholder="输入包ID" v-model="productInfo.cpId" clearable style="width:250px"
                @change="changeId(productInfo.cpId)"></el-input>
            </el-form-item>
            <el-form-item label="包链接：" :required="true">
              <el-input placeholder="输入包链接" v-model="productInfo.url" clearable style="width:250px"
                @change="changeUrl(productInfo.url)"></el-input>
            </el-form-item>
            <el-form-item class="common_form_btn" style="display: block;margin-left:250px">
              <el-button type="primary" @click="addComfirm()" :loading="loadBol">{{loadBol==false?'确认编辑':'数据请求中'}}</el-button>
            </el-form-item>
          </el-form>
        </better-dialog>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import main from '../../mixins';
import request from '@/utils/request';
export default {
  name: 'TableExample',
  mixins: [main],
  data() {
    return {
      loading: false,
      dialogVisible:false,
      columns: [
        { label: '包ID', prop: 'cpId', align: 'center' },
        { label: '媒体', prop: 'channel.name', align: 'center' },
        { label: '产品', prop: 'app.name', align: 'center' },
        { label: '包名', prop: 'name', align: 'center' },
        { label: '绑包内容', prop: 'packageName', align: 'center' },
        { label: '包链接', prop: 'url', align: 'center' },
        { label: '操作系统', prop: 'sysName', align: 'center' },
        { label: '上传时间', prop: 'createTime', slots:'date', align: 'center' },
        { label: '修改时间', prop: 'modifyTime', slots:'date', align: 'center' },
        { label: '操作管理', slots:'button', align: 'center' },
      ],
      listLoading: false,
      form: {
        cpId: undefined, //包ID
        name: undefined, //包名
        url: undefined, //地址
        sys: undefined, //操作系统
        channelId: undefined, //媒体
        offset: 0, //起始索引值
        count: 10, //每页多少条
      },
      order: {
        colName: 'create_time',
        desc:true
      },
      systemList: [{
        systemId: 1,
        systemName: "IOS",
      }, {
        systemId: 2,
        systemName: "安卓",
      }],
      mediaList: [{
        mediaId: 1,
        mediaName: "头条",
      }, {
        mediaId: 2,
        mediaName: "快手",
      }, {
        mediaId: 3,
        mediaName: "广点通",
      }],
      tiePackList:[],
      request: {
        post: this.$apis.tableExample.getList,
      },
      productInfo: {
        appId: '',
        channelId: '',
        packageTypeId: '',
        sys:'',
        name: '',
        cpId: '',
        url: ''
      }
    }
  },
  methods: {
    searchBtn(){

    },
    addProductPack() {
      this.dialogVisible = true;
      console.log(this.dialogVisible)
    },
    addTransform() {

    },
    updataProductPack() {

    },
    onCopy() {
      
    },
    getList() { // 切换页码的函数
      console.log('pagination')
    }
  }
}
</script>

<style>

</style>