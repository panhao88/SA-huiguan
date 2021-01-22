<template>
  <div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="remove"
      class="lizi"
    >
    </vue-particles>
    <div class="login_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0"
        class="demo-ruleForm"
      >
        <h2 class="title">欢迎来到慧冠后台管理系统</h2>
        <el-form-item prop="username" style="position: relative">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
          <img src="../../assets/username.png" alt="" class="img_abs" />
        </el-form-item>
        <el-form-item prop="password" style="position: relative">
          <el-input
            v-model="ruleForm.password"
            placeholder="密码"
            show-password
          ></el-input>
          <img src="../../assets/password.png" alt="" class="img_abs" />
        </el-form-item>
        <el-form-item prop="password" style="position: relative">
          <div style="display: flex">
            <el-input
              placeholder="请输入验证码"
              style="width: 67%"
              v-model="ruleForm.verification"
            ></el-input>
            <img src="../../assets/code.png" alt="" class="img_abs" />
            <div style="padding-left: 10px">
              <img
                :src="this.imgg"
                alt=""
                @click="getto"
                style="width: 100%; border: 1px solid #dcdfe6; padding: 3px"
              />
            </div>
          </div>
          <div><el-checkbox v-model="checked">记住密码</el-checkbox></div>
        </el-form-item>
        <el-form-item class="denglu">
          <el-button
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click="gologin('ruleForm')"
            @keyup.enter.native="loginEnter('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
import axios from "axios";
export default {
  name: "",
  // 接收父组件传递过来的参数
  props: {},
  // 注册组件
  components: {},
  // 定义变量
  data() {
    return {
      checked: true,
      imgg: "",
      ruleForm: {
        username: "",
        password: "",
        verification: "",
      },
      user: {},
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能位空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "密码在错误",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // 事件方法执行
  methods: {
    ...userActions(["login"]),
    gologin(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.$store.dispatch("user/login",{
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              captcha: this.ruleForm.verification,
            });
            this.setCookie(this.ruleForm.username, this.ruleForm.password, 7);
          } else {
            this.$store.dispatch("user/login",{
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              captcha: this.ruleForm.verification,
            });
            //清空Cookie
            this.clearCookie();
          }
        } else {
          return false;
        }
      });
    },
    loginEnter(formName) {
      var _ishf = this;
      document.onkeydown = function (e) {
        if (window.event == undefined) {
          var key = e.keyCode;
        } else {
          var key = window.event.keyCode;
        }
        if (key === 13) {
              _ishf.$refs[formName].validate((valid) => {
                if (valid) {
                  if (_ishf.checked == true) {
                    //传入账号名，密码，和保存天数3个参数
                    _ishf.$store.dispatch("user/login",{
                      username: _ishf.ruleForm.username,
                      password: _ishf.ruleForm.password,
                      captcha: _ishf.ruleForm.verification,
                    });
                    _ishf.setCookie(
                      _ishf.ruleForm.username,
                      _ishf.ruleForm.password,
                      7
                    );
                    document.onkeydown = undefined;
                  } else {
                    _ishf.$store.dispatch("user/login",{
                      username: _ishf.ruleForm.username,
                      password: _ishf.ruleForm.password,
                      captcha: _ishf.ruleForm.verification,
                    });
                    document.onkeydown = undefined;
                    //清空Cookie
                    _ishf.clearCookie();
                  }
                } else {
                  return false;
                }
              });
        }
      };
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割

          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    // 获取验证码
    getto() {
      this.$api
        .getcaptcha()
        .then((res) => {
          this.imgg = res.image;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  // 页面初始化方法
  mounted() {
    this.loginEnter('ruleForm')
    this.getCookie();
    this.getto();
  },
  // 监听值变化
  watch: {},
  // 计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.demo-ruleForm {
  margin-top: -50px;
  background: white;
  opacity: 0.8;
  width: 25vw;
  padding: 30px 50px 50px 50px;
  border-radius: 7px;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #525151;
}

.img_abs {
  position: absolute;
  left: 6px;
  top: 13px;
}
::v-deep .el-input__inner {
  padding: 0 30px;
}
.lizi {
  background: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  width: 100vw;
  height: 100vh;
  // border: 1px solid red;
  position: relative;
}
.login_box {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
}

@media screen and (max-width: 450px) {
  // 表单
  .demo-ruleForm {
    margin-top: -50px;
    background: rgba($color: rgb(218, 214, 214), $alpha: 0.3);
    width: 55vw;
    padding: 30px 50px 50px 50px;
    border-radius: 7px;
  }
  // 粒子图
  .lizi {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    position: relative;
  }
}
</style>
