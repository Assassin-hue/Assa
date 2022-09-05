<template>
  <el-main>
    <!-- 搜索框 -->
    <el-form :inline="true" :model="search" class="demo-form-inline" size="mini" ref="search">
      <el-form-item class="demonstration" label="时间搜索:">
        <el-date-picker
          :editable="false"
          v-model="value1"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="demonstration" label="城市选择">
        <template slot-scope="scope">
          <el-cascader
            v-model="valueCity"
            :options="optionsCity"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </template>
      </el-form-item>
      <el-button type="primary" @click="searchLogDate" style="margin-left: 5px"
      size="mini"
        >查询</el-button
      >
      <el-button type="" @click="emptyDate" style="margin-left: 5px"
      size="mini"
        >清空</el-button
      >
    </el-form>
    <!-- 表格数据展示 -->
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      style="width: 100%; margin-top: 10px"
      size="mini"
      :data="tableData"
      :height="tableHeight"
      border
      v-loading="loading"
      element-loading-text="拼命加载中..." 
    >
      <el-table-column
        label="标题"
        align="center"
        ref="hideText"
        id="side-content"
        prop="originTitle"
        :show-overflow-tooltip="overflow"
        width="250"
      >
      </el-table-column>
      </el-table-column>
      <el-table-column prop="typeName" label="类别" align="center">
      </el-table-column>
      <el-table-column prop="cityName" label="城市" align="center">
      </el-table-column>
      <el-table-column prop="srcName" label="来源" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="入库时间" align="center">
      </el-table-column>
      <el-table-column prop="issueTime" label="发布时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="400px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="reptileOrigin(scope.row)"
            >查看原文</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="reptileEditDetail(scope.row)"
            >查看详情</el-button
          >
          <el-button type="primary" size="mini" @click="reptileEdit(scope.row)"
            >查看全部</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- JSON数据展示弹框 -->
    <el-dialog
      title="JSON数据"
      :visible.sync="dialogFormVisible"
      width="700px"
      :inline="true"
    >
      <JsonViewer :value="content" />
    </el-dialog>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="1"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-main>
</template>

<script>
import messageApi from "@/api/message.js";
import JsonViewer from "vue-json-viewer";
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableHeight: window.innerHeight, // 表格高度
      overflow:true,// 超出隐藏
      tableData: [], // 列表数据
      parentId: {
        parentId: null,
      },
      // 表格数据搜索添加
      search: {
        page: null,
        size: null,
        infoId: null,
        srcId: null, // 爬虫 id
        cityId: null, // 城市 id
        url: "",
        startTime: null,
        endTime: null,
      },
      total: null, // 表格分页
      value1: null,
      content: "", // json数据
      valueCity: null,
      optionsCity: [], // 城市数据
      loading: true,
    };
  },
  components: {
    JsonViewer,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 240; //后面的50：根据需求空出的高度，自行调整
    });
  },
  created() {
    this.fetchData();
    this.getCity();
  },
  methods: {
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      this.$nextTick(() => {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();
        }
      });
    },
    // 获取城市
    getCity() {
      messageApi.getMessageCity(this.parentId).then((response) => {
        console.log("城市数据",response);
        let data = response.data.data;
        for (let item of data) {
          this.$set(item, "label", item.name);
          this.$set(item, "value", item.id);
          for (let items of item.children) {
            this.$set(items, "label", items.name);
            this.$set(items, "value", items.id);
          }
        }
        this.optionsCity = data;
      });
    },
    // 初始化数据
    fetchData() {
      messageApi.getMessageList(this.search).then((response) => {
        console.log("初始化数据",response.data);
        if (response.data.code == 0) {
          let data = response.data.data.items;
          this.total = response.data.data.total;
          this.tableData = data;
          this.loading = false;
        }
      });
    },
    // 排序时触发

    //排序功能
    // sort_change(column) {
    //   // this.currpage = 1; // 排序后返回第一页
    //   console.log(column);
    //   if (column.prop === "createTime") {
    //     this.proptype = column.prop; // 将键名prop赋值给变量proptype
    //     if (column.order === "descending") {
    //       this.tableData.sort(this.my_desc_sort);
    //     } else if (column.order === "ascending") {
    //       this.tableData.sort(this.my_asc_sort);
    //     }
    //   } else if (column.prop === "id") {
    //     this.proptype = column.prop;
    //   }
    // },
    // //排序方法
    // my_desc_sort(a, b) {
    //   return b[this.proptype] - a[this.proptype]; // a["time"] 等价于 a.time
    // },
    // my_asc_sort(a, b) {
    //   return a[this.proptype] - b[this.proptype];
    // },
    // 查询事件
    searchLogDate() {
      if (this.value1 != null) {
        this.search.startTime = this.value1[0] / 1000;
        this.search.endTime = this.value1[1] / 1000;
      } else {
        this.search.startTime = null;
        this.search.endTime = null;
      }
      this.loading = true;
      this.fetchData();
    },
    // 多级选择
    handleChange() {
      this.search.cityId = this.valueCity[1];
    },
    // 清空搜索条件
    emptyDate() {
      this.search.cityId = null;
      this.search.startTime = null;
      this.search.endTime = null;
      this.valueCity = null;
      this.value1 = null;
    },
    // 查看原文
    reptileOrigin(row) {
      window.open(row.originUrl, "_blank");
    },
    // 查看详情
    reptileEditDetail(row) {
      window.open(row.detailUrl, "_blank");
    },
    // 查看全部JSON
    reptileEdit(row) {
      this.dialogFormVisible = true;
      this.content = row;
    },
    // 每页多少条
    handleSizeChange(val) {
      this.loading = true;
      this.search.size = val;
      this.fetchData();
    },
    // 当前多少页
    handleCurrentChange(val) {
      this.loading = true;
      this.search.page = val;
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 5px;
}

.demonstration {
  margin-right: 5px;
  font-size: 15px;
}
// .demo-form-inline {
//   // height: 40px !important;
// }
</style>