<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="search" class="demo-form-inline"  size="mini"
      label-width="auto">
      <el-form-item label="用户ID:">
        <el-input v-model.number="search.id"></el-input>
      </el-form-item>
      <el-form-item label="账号:">
        <el-input v-model="search.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model.number="search.phone"></el-input>
      </el-form-item>
      <el-form-item label="微信ID:">
        <el-input v-model="search.wxOpenid"></el-input>
      </el-form-item>
      <el-button type="primary" @click="searchUserInfo" style="margin-left: 5px" size="mini"
        >查询</el-button
      >
      <el-button type="" @click="emptyUserInfo" style="margin-left: 5px" size="mini"
        >清空</el-button
      >
    </el-form>

    <!-- 表格 -->
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
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="username" label="账号" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="wxOpenid" label="微信ID" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
import userApi from "@/api/user";
export default {
  data() {
    return {
      tableHeight: window.innerHeight, // 表格高度
      // 搜索条件
      search: {
        page: 1,
        size: 10,
        id: null,
        status: null,
        username: "",
        phone: "",
        wxOpenid: "",
      },
      loading: true, // loading加载
      tableData: [], //表格数据
      total:null,
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 240; //后面的50：根据需求空出的高度，自行调整
    });
  },
  methods: {
    // 重置表单
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      this.$nextTick(() => {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();
        }
      });
    },
    // 初始化列表数据
    fetchData() {
      userApi.getUserList(this.search).then((response) => {
        console.log(response);
        let a = response.data.data;
        if(a.id || a.username || a.phone || a.wxOpenid) {
          let b = [];
          b.push(a);
          this.tableData = b;
          this.loading = true
        } else if(a[0]) {
          
        }
      });
    },
    // 查询按钮
    searchUserInfo() {
      this.loading = true;
      this.fetchData();
    },
    // 清空搜素
    emptyUserInfo() {
      this.search.id = null;
      this.search.username = "";
      this.search.phone = "";
      this.search.wxOpenid = "";
    },
    // 每页多少
    handleSizeChange(val) {
      this.search.size = val;
      this.loading = true;
      this.fetchData();
    },
    // 第几页
    handleCurrentChange(val) {
      this.search.page = val;
      this.loading = true;
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>