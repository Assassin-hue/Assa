<template>
  <el-container class="home">
    <!-- 头部-->
    <el-header
      style="background-color: #36b48e7c"
      class="ub main-justify cross-center"
    >
      <div class="header-left-text">招标信息管理系统</div>
      <div class="ub main-center cross-center">
        <img src="../assets/images/avatar.jpg" alt="" class="user-img" />
        <i>管理员</i>
        <div class="user-role">
          <el-button
            @click="modifyPasswd"
            style="
              color: #000;
              font-size: 16px;
              background-color: transparent;
              border: 0px;
            "
            size="small"
            icon="el-icon-key"
            >修改密码</el-button
          >
          <el-button
            style="
              margin-right: 20px;
              font-size: 16px;
              color: #000;
              background-color: transparent;
              border: 0px;
            "
            @click="logout"
            size="small"
            type="info"
            icon="el-icon-switch-button"
            >退出</el-button
          >
        </div>
      </div>
    </el-header>
    <!-- 导航菜单-->
    <el-container class="el-container-content">
      <el-aside width="auto" class="el-aside-two">
        <menu-bar> </menu-bar>
      </el-aside>
      <!-- 右边内容展示页面-->
      <!-- style="overflow:auto" -->
      <el-main class="padding10">
        <tabs-vue></tabs-vue>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from "../components/MenuBar.vue";
import tabsVue from "@/components/tabsOne.vue";
export default {
  components: {
    MenuBar,
    tabsVue,
  },
  methods: {
    async logout() {
      let _this = this;
      _this
        .$confirm("确定退出系统吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          sessionStorage.clear();
          window.location.href = "/login";
        });
    },
    modifyPasswd() {
      this.$message({
        message: "待开发",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}

.header-left-text {
  font-size: 20px;
}

.user-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.user-role {
  margin: 10px;
}

.menu-bar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}

.el-menu {
  border-right: none !important;
}

.el-aside {
  border-right: 1px solid #e6e6e6;
}

.el-main {
  padding: 5px !important;
  overflow: hidden;
}
.easide {
  border-right: 1px solid #36b48e7c;
}
</style>