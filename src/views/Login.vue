<template>
  <div class="login-container ub cross-center main-center">
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      label-width="80px"
      class="loginForm"
    >
      <h2 class="login-title ub main-center cross-center">管理系统</h2>
      <el-form-item label="" prop="user">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col>
            <el-button @click="submit()" style="width: 100%" type="primary"
              >登录</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginApi from "@/api/login.js";
export default {
  name: "ProjecttwoLogin",

  data() {
    return {
      loginForm: {
        loginType:"account",
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "change",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "change",
            message: "请输入密码",
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    async submit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          console.log(valid);
          let account = {
            loginType: this.loginForm.loginType,
            account: {
              username:this.loginForm.username,
              password:this.loginForm.password
            }
          };
          loginApi.getUser(account).then((response) => {
            // console.log(response.data.data.token);
            if (response.data.code == 0) {
            sessionStorage.setItem("token", response.data.data.token);
            //登录成功跳转到首页
            this.$router.push('/home');
            this.$message({
              showClose: true,
              type: "success",
              message: "登录成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "错误",
            });
            return;
          }
          });
          
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}

.login-title {
  font-size: 24px;
  font-weight: 600px;
}

.loginForm {
  height: 300px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 20px 30px;
}

::v-deep .el-form-item .el-form-item__content {
  margin-left: 0 !important;
}
</style>
