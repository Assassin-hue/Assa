<template>
  <el-main>
    <!-- 表格上面的功能展示 -->
    <el-button type="primary" @click="addReptile()" size="mini">新增</el-button>

    <!-- 添加爬虫弹框 -->
    <el-dialog
      title=" 新增爬虫"
      :visible.sync="dialogFormVisible"
      width="700px"
      :inline="true"
      :before-close="addReptileCancel"
    >
      <el-form
        :rules="addRules"
        ref="addForm"
        :model="addForm"
        label-width="200px"
        label-position="right"
        style="width: 600px"
        :inline="false"
      >
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="url">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="爬虫名称" prop="spider">
          <el-input v-model="addForm.spider"></el-input>
        </el-form-item>
        <el-form-item label="爬虫负责人" prop="owner">
          <el-input v-model="addForm.owner"></el-input>
        </el-form-item>
        <el-form-item label="是否发送成功通知">
          <div>
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="爬虫延时时间（秒）" prop="sleepPage">
          <el-input v-model.number="addForm.sleepPage"></el-input>
        </el-form-item>
        <el-form-item label="最小爬取间隔" prop="minSpiderSpan">
          <el-input v-model.number="addForm.minSpiderSpan"></el-input>
        </el-form-item>
        <el-form-item label="最大无数据时间（秒）" prop="maxNodataThreshold">
          <el-input v-model.number="addForm.maxNodataThreshold"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="addReptileCancel">取消</el-button>
          <el-button type="primary" @click="addReptileSave">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑爬虫"
      :visible.sync="dialogFormEdit"
      width="700px"
      :inline="true"
    >
      <el-form
        :rules="editRules"
        ref="editForm"
        :model="editForm"
        label-width="200px"
        label-position="right"
        style="width: 600px"
        :inline="false"
      >
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="url">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="爬虫名称" prop="spider">
          <el-input v-model="editForm.spider"></el-input>
        </el-form-item>
        <el-form-item label="爬虫负责人" prop="owner">
          <el-input v-model="editForm.owner"></el-input>
        </el-form-item>
        <el-form-item label="是否发送成功通知">
          <div>
            <el-radio v-model="radioEdit" label="1">是</el-radio>
            <el-radio v-model="radioEdit" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="爬虫延时时间" prop="sleepPage">
          <el-input v-model.number="editForm.sleepPage"></el-input>
        </el-form-item>
        <el-form-item label="最小爬取间隔（秒" prop="minSpiderSpan">
          <el-input v-model.number="editForm.minSpiderSpan"></el-input>
        </el-form-item>
        <el-form-item label="最大无数据时间（秒）" prop="maxNodataThreshold">
          <el-input v-model.number="editForm.maxNodataThreshold"></el-input>
        </el-form-item>
        <el-form-item label="配置" prop="config">
          <el-input v-model="editForm.config"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="editForm.comment"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="editReptileCancel">取消</el-button>
          <el-button type="primary" @click="editReptileSave">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 日志弹框 -->
    <el-dialog
      title="爬虫日志"
      :visible.sync="dialogFormJournal"
      :inline="true"
      :before-close="beforeCloseLog"
    >
      <div class="block" :inline="true" size="mini">
        <span class="demonstration">时间搜索:</span>
        <el-date-picker
          size="mini"
          :editable="false"
          v-model="value1"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          type="primary"
          @click="searchLogDate"
          style="margin-left: 5px"
          size="mini"
          >搜索</el-button
        >
      </div>
      <!-- 列表展示 -->
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        style="width: 100%; height: 100%"
        size="mini"
        :data="JournalForm"
        height="100px"
        class="el-tabel-body-wrapper height500"
        v-loading="loadingLog"
        element-loading-text="拼命加载中..."
      >
        <el-table-column prop="id" label="ID" align="center" width="50px" fixed>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="spiderCount" label="爬取数量" align="center">
        </el-table-column>
        <el-table-column align="center" prop="state" label="状态">
          <!-- prop="state,ReptileStateType" -->
          <template slot-scope="scope">
            <el-tag :type="scope.row.ReptileStateType">{{
              scope.row.state
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="reptileEditLog(scope.row)"
              data-clipboard-text=""
              >复制状态码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChangeLog"
        @current-change="handleCurrentChangeLog"
        :current-page.sync="JournalFormCondition.page"
        :page-size="JournalFormCondition.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalLog"
      >
      </el-pagination>
      <!-- </div> -->
    </el-dialog>

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
      <el-table-column prop="id" label="ID" align="center" width="50px">
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="spider" label="蜘蛛" align="center">
      </el-table-column>
      <el-table-column prop="owner" label="责任人" align="center">
      </el-table-column>
      <el-table-column
        prop="lastSpiderTime"
        label="最后爬取时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastSpiderNozeroTime"
        label="最后有结果时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lastSpiderNozeroCount"
        label="最后有结果数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="state,ReptileStateType"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.ReptileStateType">{{
            scope.row.state
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="reptileEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="reptileJournal(scope.row)"
            >日志</el-button
          >
          <el-button type="danger" size="mini" @click="reptileDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="search.page"
      :page-size="search.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-main>
</template>
<script>
import reptileApi from "@/api/reptile";
export default {
  data() {
    return {
      dialogFormVisible: false, // 添加数据框的开关
      dialogFormEdit: false, // 编辑数据框的条件
      dialogFormJournal: false, // 编辑日志弹框的开关
      //表格高度
      tableHeight: window.innerHeight,
      tableData: [],
      // 初始化页面条件
      search: {
        page: 1,
        size: 10,
        id: null,
        name: "",
        url: "",
        spider: "",
        owner: "",
      },
      dialogTitle: "",
      // 添加数据校验
      addRules: {
        name: [{ required: true, message: "请出入网站名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入网站地址", trigger: "blur" }],
        spider: [
          { required: true, message: "请输入爬虫名称", trigger: "blur" },
        ],
        owner: [
          { required: true, message: "请出入爬虫负责人", trigger: "blur" },
        ],
      },
      // 修改数据校验
      editRules: {
        name: [{ required: true, message: "请出入网站名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入网站地址", trigger: "blur" }],
        spider: [
          { required: true, message: "请输入爬虫名称", trigger: "blur" },
        ],
        owner: [
          { required: true, message: "请出入爬虫负责人", trigger: "blur" },
        ],
      },
      //  添加爬虫数据
      addForm: {
        name: "", // 名称
        url: "", // 网址
        spider: "", // 蜘蛛
        owner: "", // 责任人
        sendSuccInfo: null, // 是否发送成功通知
        sleepPage: 10, // 爬虫延时时间(秒)
        minSpiderSpan: 1800, // 最大无数据时间（秒） 最小爬取间隔
        maxNodataThreshold: 86400, // 最大无数据时间（秒）
      },
      // 编辑爬虫数据
      editForm: {
        id: 0,
        name: "",
        url: "",
        spider: "",
        owner: "",
        sendSuccInfo: null,
        sleepPage: 10,
        minSpiderSpan: 1800,
        maxNodataThreshold: 86400,
        config: "",
        comment: "",
      },
      // 查询日志的条件
      JournalFormCondition: {
        page: 1,
        size: 10,
        srcId: null,
        startTime: null,
        endTime: null,
      },
      srcId: {
        id: null,
      },
      // 日志的数据
      JournalForm: [],
      // 分页数据
      total: null,
      // 日志分页数据总数
      totalLog: null,
      // 添加数据选择框数据
      // 装时间选择后的结果 （日志的时间筛选条件）
      JournalFormTime: {
        startTime: null,
        endTime: null,
      },
      value1: null,
      radio: "1",
      radioEdit: "1",
      loading: true,
      loadingLog: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 240; //后面的50：根据需求空出的高度，自行调整
    });
  },
  created() {
    this.fetchData();
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
    // 初始化页面获取数据
    fetchData() {
      reptileApi.getReptileList(this.search).then((response) => {
        let data = response.data;
        if (data.code == 0) {
          let items = data.data.items;
          for (let item of items) {
            if (
              item.lastSpiderNozeroTime == item.lastSpiderTime &&
              item.lastSpiderNozeroTime != "" &&
              item.lastSpiderTime != ""
            ) {
              this.$set(item, "state", "正常");
              this.$set(item, "ReptileStateType", "success");
            } else if (
              item.lastSpiderNozeroTime != item.lastSpiderTime ||
              item.lastSpiderNozeroTime == "" ||
              item.lastSpiderTime == ""
            ) {
              this.$set(item, "state", "异常");
              this.$set(item, "ReptileStateType", "danger");
            }
          }
          this.tableData = items;
          this.total = data.data.total;
          this.loading = false;
        }
      });
    },
    // 新增表单打开
    addReptile() {
      this.resetForm("addForm"); // 重置表单
      this.dialogTitle = "新增爬虫数据"; // 更改表单的名称
      this.dialogFormVisible = true;
    },
    // 新增爬虫确定按钮
    addReptileSave() {
      if (this.radio == "1") {
        this.addForm.sendSuccInfo = true;
      } else {
        this.addForm.sendSuccInfo = false;
      }
      let _this = this;
      _this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          reptileApi.addReptile(_this.addForm).then((response) => {
            if (response.data.code == 0) {
              let message = response.data.message.substring(0, 4);
              _this.$message({
                message: message,
                type: "success",
              });
            }
          });
        }
      });
      _this.dialogFormVisible = false;
      this.loading = true;
      this.fetchData();
    },
    // 取消添加
    addReptileCancel() {
      this.dialogFormVisible = false;
      this.resetForm("addForm");
      this.radio = "1";
    },
    // 编辑
    reptileEdit(row) {
      let _this = this;
      _this.dialogFormEdit = true;
      _this.resetForm("editForm");
      let id = {
        id: row.id,
      };
      reptileApi.getReptileListId(id).then((response) => {
        let data = response.data.data.items[0];
        if (response.data.code == 0) {
          _this.editForm = data;
          if (data.sendSuccInfo == true) {
            this.radioEdit = "1";
          } else if (data.sendSuccInfo == false) {
            this.radioEdit = "2";
          }
        }
      });
    },
    // 编辑取消按钮
    editReptileCancel() {
      this.dialogFormEdit = false;
      this.resetForm("editForm");
      this.radio = "1";
    },
    // 编辑确认按钮
    editReptileSave() {
      if (this.radioEdit == "1") {
        this.editForm.sendSuccInfo = true;
      } else if (this.radioEdit == "2") {
        this.editForm.sendSuccInfo = false;
      }
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          reptileApi.updateReptile(this.editForm).then((response) => {
            if (response.data.code == 0) {
              let message = response.data.message.substring(0, 4);
              this.$message({
                message: message,
                type: "success",
              });
            }
          });
          this.loading = true;
          this.fetchData();
          this.dialogFormEdit = false;
        }
      });
    },
    // 查看日志
    reptileJournal(row) {
      this.JournalFormCondition.srcId = row.id;
      this.srcId.id = row.id;
      // let _this = this;
      this.dialogFormJournal = true;
      reptileApi.journalReptile(this.JournalFormCondition).then((response) => {
        let data = response.data.data;
        this.totalLog = data.total;
        if (response.data.code == 0) {
          for (let item of data.items) {
            if (item.errorLog == "") {
              this.$set(item, "state", "正常");
              this.$set(item, "ReptileStateType", "success");
            } else if (item.errorLog != "") {
              this.$set(item, "state", "异常");
              this.$set(item, "ReptileStateType", "danger");
            }
          }
          this.JournalForm = data.items;
          this.loadingLog = false;
        }
      });
    },
    // 日志弹框分页
    handleSizeChangeLog(val) {
      console.log(val);
      this.JournalFormCondition.size = val;
      this.loadingLog = true;
      this.reptileJournal(this.srcId);
    },

    // 日志弹框展示多少页
    handleCurrentChangeLog(val) {
      console.log(val);
      this.JournalFormCondition.page = val;
      this.loadingLog = true;
      this.reptileJournal(this.srcId);
    },
    // 日志刷新
    searchLogDate() {
      if (this.value1 != null) {
        this.JournalFormCondition.startTime = this.value1[0] / 1000;
        this.JournalFormCondition.endTime = this.value1[1] / 1000;
      } else {
        this.JournalFormCondition.startTime = null;
        this.JournalFormCondition.endTime = null;
      }
      this.loadingLog = true;
      this.reptileJournal(this.srcId);
    },
    // 日志弹框关闭,关闭之后清空对话框的数据，防止重写点击的时候看到关闭前的相关数据
    beforeCloseLog() {
      this.dialogFormJournal = false;
      this.value1 = "";
      this.JournalForm = []; // 清空日志数据
      this.JournalFormCondition.startTime = null; // 清空搜索条件的开始时间，防止重写打开日志时发送过去的是上次搜索的时间
      this.JournalFormCondition.endTime = null; // 清空结束时间
      this.totalLog = null; // 清空总条数
      this.loadingLog = true;
    },
    // 日志复制状态码
    reptileEditLog(row) {
      if (row.errorLog != "") {
        var input = document.createElement("input"); // 创建input对象
        input.value = row.errorLog; // 设置复制内容
        document.body.appendChild(input); // 添加临时实例
        input.select(); // 选择实例内容
        document.execCommand("Copy"); // 执行复制
        document.body.removeChild(input); // 删除临时实例
        this.$message({
          message: "复制成功",
          type: "success",
        });
      } else if (row.errorLog == "") {
        this.$message({
          message: "没有错误日志",
          type: "warning",
        });
      }
    },
    // 删除
    reptileDelete(row) {
      let _this = this;
      _this
        .$confirm("确认删除吗？", " 系统提示", {
          confirmButtonText: "确认",
          caneButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          let id = {
            id: row.id,
          };
          reptileApi.deleteReptile(id).then((response) => {
            if (response.data.code == 0) {
              let message = response.data.message.substring(0, 4);
              _this.$message({
                message: message,
                type: "success",
              });
            }
          });
          this.loading = true;
          this.fetchData();
        });
    },
    // 添加数据中的选择框
    sendSuccInfomodeId(val) {
      this.addForm.sendSuccInfo = val;
    },
    // 更新数据的选择框
    sendSuccInfomodeIdEdit(val) {
      this.editForm.sendSuccInfo = val;
    },
    // 每页多少条
    handleSizeChange(val) {
      this.search.size = val;
      this.fetchData();
    },
    // 当前多少页
    handleCurrentChange(val) {
      this.search.page = val;
      this.fetchData();
    },
  },
};
</script>

<style scoped>
.el-tabel-body-wrapper {
  height: 390px !important;
  /*给到固定的高度(内容高度要超过此高度)*/
  overflow-y: scroll;
  /*y轴溢出显示滚动条*/
}
.block {
  margin-bottom: 5px;
}
.demonstration {
  margin-right: 5px;
  font-size: 15px;
}
.height500 {
  height: 500px !important;
  overflow: hidden;
}
</style>