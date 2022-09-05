<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :inline="true"
      :model="search"
      ref="search"
      class="demo-form-inline"
      size="mini"
      label-width="auto"
    >
      <el-form-item label="订单ID:" prop="id">
        <el-input v-model.number="search.id"></el-input>
      </el-form-item>
      <el-form-item label="商品ID:" prop="goodsId">
        <el-input v-model="search.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="用户ID:" prop="userId">
        <el-input v-model.number="search.userId"></el-input>
      </el-form-item>
      <el-form-item label="设备ID:" prop="hashId">
        <el-input v-model="search.hashId"></el-input>
      </el-form-item>
      <!-- <el-form-item label="支付状态:" prop="payStatus">
        <el-input v-model="search.payStatus"></el-input>
      </el-form-item> -->
      <el-form-item label="支付状态" prop="payStatus">
        <el-select v-model="search.payStatus">
          <el-option label="全部" value=""></el-option>
          <el-option label="已支付" value="finished"></el-option>
          <el-option label="未支付" value="unfinished"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="payType">
        <el-select v-model="search.payType">
          <el-option label="全部" value=""></el-option>
          <el-option label="微信" value="weixin"></el-option>
          <el-option label="支付宝" value="alipay"></el-option>
          <el-option label="苹果" value="appleiap"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间搜索:">
        <el-date-picker
          :editable="false"
          v-model="searchTime"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        type="primary"
        @click="searchOder"
        style="margin-left: 5px"
        size="mini"
        >查询</el-button
      >
      <el-button
        type=""
        @click="emptyUserInfo"
        style="margin-left: 5px"
        size="mini"
        >清空</el-button
      >
    </el-form>
    <!-- 订单管理数据展示 -->
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
      <el-table-column prop="id" label="订单ID" align="center">
      </el-table-column>
      <el-table-column label="订单金额(元)" align="center">
        <template slot-scope="scope">
          {{ toDecimal2(scope.row.totalFee) + "￥" }}
        </template>
      </el-table-column>
      <el-table-column prop="payTime" label="支付时间" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" align="center">
      </el-table-column>
      <el-table-column prop="goodsId" label="商品ID" align="center">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="tradeNo" label="业务单号" align="center">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <div class="pagina"> -->
    <el-form
      :inline="true"
      class="demo-form-inline pagina"
      size="mini"
      label-width="auto"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="search.page"
        :page-size="search.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        size="mini"
      >
      </el-pagination>
      <el-form-item label="总金额（元）:" style="margin-top: 2px">
        {{ totalAmountNub }}
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
import oderApi from "@/api/oder.js";
export default {
  data() {
    return {
      tableData: [],
      //表格高度
      tableHeight: window.innerHeight,
      search: {
        id: null,
        goodsId: "",
        userId: null,
        hashId: null,
        payStatus: "",
        payType: "",
        startTime: null,
        endTime: null,
      },
      searchTime: null,
      loading: true,
      total: null,
      // 支付状态
      // paymentStatus: [
      //   {
      //     label: "已支付",
      //     value: "finished",
      //   },
      //   {
      //     label: "未支付",
      //     value: "unfinished",
      //   },
      // ],
      totalAmountNub: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 286; //后面的50：根据需求空出的高度，自行调整
    });
  },
  created() {
    // this.payDefault();
    this.fetchData();
  },
  methods: {
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    // 设置默认选项
    // payDefault() {
    //   this.search.payStatus = this.paymentStatus[0].value;
    // },
    // 初始化数据
    fetchData() {
      oderApi.getOderList(this.search).then((response) => {
        console.log(response);
        let data = null;
        if (response.data.code == 0) {
          if (response.data.data.id) {
            data = response.data.data;
            let a = [];
            a.push(data);
            this.tableData = a;
            this.total = a.length;
          } else {
            data = response.data.data.items;
            this.tableData = data;
            this.total = response.data.data.total;
          }
        }
        this.loading = false;
        this.totalAmount(data);
      });
    },
    totalAmount(data) {
      let a = 0;
      if (data.id) {
        a = a + parseInt(data.totalFee);
      } else {
        for (let item of data) {
          a = a + parseInt(item.totalFee);
        }
      }
      this.totalAmountNub = this.toDecimal2(a) + "￥";
    },
    // 金额格式化
    toDecimal2(amount) {
      //强制保留两位小数
      let f = parseFloat(amount);
      if (isNaN(f)) return false;
      f = Math.round(amount * 100) / 100;
      let s = f.toString();
      let rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length < rs + 1 + 2) {
        s += "0";
      }
      //每三位用一个逗号隔开
      let leftNum = s.split(".")[0];
      let rightNum = "." + s.split(".")[1];
      let result;
      //定义数组记录截取后的价格
      let resultArray = new Array();
      if (leftNum.length > 3) {
        let i = true;
        while (i) {
          resultArray.push(leftNum.slice(-3));
          leftNum = leftNum.slice(0, leftNum.length - 3);
          if (leftNum.length < 4) {
            i = false;
          }
        }
        //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
        let sortArray = new Array();
        for (let i = resultArray.length - 1; i >= 0; i--) {
          sortArray.push(resultArray[i]);
        }
        result = leftNum + "," + sortArray.join(",") + rightNum;
      } else {
        result = s;
      }
      return result;
    },
    // 支付状态选择
    paymentChange(val) {
      this.search.payStatus = val;
    },
    // 查询
    searchOder() {
      // 时间处理后给 search
      if (this.searchTime != null) {
        this.search.startTime = this.searchTime[0] / 1000;
        this.search.endTime = this.searchTime[1] / 1000;
      } else {
        this.search.startTime = null;
        this.search.endTime = null;
      }
      this.loading = true;
      this.fetchData();
    },
    // 每页多少条
    handleSizeChange(val) {
      console.log(val);
    },
    // 当前多少页
    handleCurrentChange(val) {
      console.log(val);
    },
    // 清空搜索条件
    emptyUserInfo() {
      this.search.startTime = null;
      this.search.endTime = null;
      this.searchTime = null;
      this.resetForm("search");
    },
    // 测试按钮
    click1(row) {
      console.log(row);
      console.log(this.toDecimal2(100));
    },
  },
};
</script>

<style lang="scss" scoped>
.pagina {
  display: flex;
  justify-content: space-between;
}
</style>