<template>
  <el-row>
    <el-col class="common_header_block">
      <el-breadcrumb separator="/" class="breadcrumb_class">
        <el-breadcrumb-item>投放管理-产品包管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-form :inline="true" class="search_form">
        <el-form-item label="包ID:">
          <el-input placeholder="输入包ID" v-model="filters.cpId" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="包名:">
          <el-input placeholder="输入包名" v-model="filters.name" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="包链接:">
          <el-input placeholder="输入包链接" v-model="filters.url" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作系统:">
          <el-select  placeholder="选择操作系统" v-model="filters.sys" style="width: 200px" clearable filterable>
            <el-option v-for="(item,index) in systemList" :key="index" :label="item.systemName" :value="item.systemId" />
          </el-select>
        </el-form-item>
        <el-form-item label="媒体:">
          <el-select  placeholder="选择媒体" v-model="filters.md" style="width: 200px" clearable filterable>
            <el-option v-for="(item,index) in mediaList" :key="index" :label="item.mediaName" :value="item.mediaId" />
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="searchBtn()">查询</el-button>
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
        <el-table ref="singleTable" v-loading="listLoading" 
              :data="productPackList" 
              header-row-class-name="tableHander"
              border style="width: 100%;"max-height="800">
          <el-table-column property="cpId" label="包ID" align="center"></el-table-column>
          <el-table-column property="channel.name" label="媒体" align="center"></el-table-column>
          <el-table-column property="app.name" label="产品" align="center"></el-table-column>
          <el-table-column property="name" label="包名" align="center"></el-table-column>
          <el-table-column property="packageName" label="绑包内容" align="center"></el-table-column>
          <el-table-column property="url" label="包链接" width="300" align="center"></el-table-column>
          <el-table-column property="sysName" label="操作系统" align="center"></el-table-column>
          <el-table-column label="上传时间" align="center" width="160">
            <template slot-scope="scope"> 
              <span>{{scope.row.createTime|dateformat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="修改时间" width="160" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.modifyTime|dateformat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作管理" width="200" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="small" v-if="scope.row.channel.id == 1" type="text"
                @click="addTransform(scope.row.id, scope.row.channel.id, scope.$index)"> 
                新增转化跟踪
              </el-button>
              <el-button size="small" v-if="scope.row.channel.id == 2 || scope.row.channel.id == 3" type="text"
                @click="addTransform(scope.row.id, scope.row.channel.id, scope.$index)"> 
                新增应用管理
              </el-button>
              <el-button size="small" type="text" @click="updataProductPack(scope.row.id)">修改</el-button>
              <el-button size="small" type="text" @click="onCopy(scope.row.url)">复制地址</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="size"  @pagination="getList"></pagination>

        <better-dialog :visible.sync="dialogVisible" titie="dialog" width="800px" 
          @confirmClick="dialogVisible=false" :loading="loading" cancel-text=''>
          <div>内容</div>
        </better-dialog>
        
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'TableExample',
  components: { Pagination },
  data() {
    return {
      loading: false,
      dialogVisible:false,
      total: 20,
      page: 1,
      size: 10,
      productPackList: [
        {
          app: {id: 1, name: "TT语音", sys: 2, createTime: 1574070879000, modifyTime: 1586403613000},
          appId: 1,
          channel: {id: 1, name: "头条", createTime: 1574154900000, modifyTime: 1586398052000, channelName: "toutiao"},
          channelId: 1,
          cpId: "1114",
          createTime: 1595835554000,
          editorId: 21,
          id: 221,
          modifyTime: 1595901965000,
          name: "1212118",
          packageName: "TT语音(非纯净版)",
          packageTypeId: 1,
          sys: 2,
          sysName: "安卓",
          tapName: "",
          url: "https://d.52tt.com/tt/B59865284.wzry/tt.apk",
        },
        {
          app: {id: 1, name: "TT语音", sys: 2, createTime: 1574070879000, modifyTime: 1586403613000},
          appId: 1,
          channel: {id: 1, name: "头条", createTime: 1574154900000, modifyTime: 1586398052000, channelName: "toutiao"},
          channelId: 1,
          cpId: "1114",
          createTime: 1595835554000,
          editorId: 21,
          id: 221,
          modifyTime: 1595901965000,
          name: "1212118",
          packageName: "TT语音(非纯净版)",
          packageTypeId: 1,
          sys: 2,
          sysName: "安卓",
          tapName: "",
          url: "https://d.52tt.com/tt/B59865284.wzry/tt.apk",
        },
        {
          app: {id: 1, name: "TT语音", sys: 2, createTime: 1574070879000, modifyTime: 1586403613000},
          appId: 1,
          channel: {id: 1, name: "头条", createTime: 1574154900000, modifyTime: 1586398052000, channelName: "toutiao"},
          channelId: 1,
          cpId: "1114",
          createTime: 1595835554000,
          editorId: 21,
          id: 221,
          modifyTime: 1595901965000,
          name: "1212118",
          packageName: "TT语音(非纯净版)",
          packageTypeId: 1,
          sys: 2,
          sysName: "安卓",
          tapName: "",
          url: "https://d.52tt.com/tt/B59865284.wzry/tt.apk",
        },
        {
          app: {id: 1, name: "TT语音", sys: 2, createTime: 1574070879000, modifyTime: 1586403613000},
          appId: 1,
          channel: {id: 1, name: "头条", createTime: 1574154900000, modifyTime: 1586398052000, channelName: "toutiao"},
          channelId: 1,
          cpId: "1114",
          createTime: 1595835554000,
          editorId: 21,
          id: 221,
          modifyTime: 1595901965000,
          name: "1212118",
          packageName: "TT语音(非纯净版)",
          packageTypeId: 1,
          sys: 2,
          sysName: "安卓",
          tapName: "",
          url: "https://d.52tt.com/tt/B59865284.wzry/tt.apk",
        },
      ],
      listLoading: false,
      filters: {
        cpId: undefined, //包ID
        name: undefined, //包名
        url: undefined, //地址
        sys: undefined, //操作系统
        md: undefined, //媒体
        offset: 0, //起始索引值
        count: 10, //每页多少条
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
      }]
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