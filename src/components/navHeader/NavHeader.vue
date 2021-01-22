<template>
  <div class="headerNav">
    <div class="t-left">
      <div>
        <span
          title="折叠菜单"
          class="tool-fox"
          v-if="is_fold == false"
          @click="fold_start()"
        >
          <i class="el-icon-s-fold"></i>
        </span>
        <span
          title="展开菜单"
          class="tool-fox"
          v-if="is_fold == true"
          @click="fold_end()"
        >
          <i class="el-icon-s-unfold"></i>
        </span>
        <span
          style="
            font-size: 0.8em;
            font-weight: bold;
            position: relative;
            top: -2px;
          "
        >
          <span>欢迎来到慧冠后台系统</span>
          <span class="tool-fox">{{ now }}</span>
        </span>
      </div>
    </div>
    <div class="t-right">
      <span
        title="点击登录"
        class="tool-fox"
        onclick="location.href='login.html'"
        v-if="username === null"
      >
        <span
          style="
            font-size: 0.8em;
            font-weight: bold;
            position: relative;
            top: -2px;
          "
          >未登录</span
        >
      </span>
      <span
        title="我的信息"
        class="tool-fox user-info"
        style="padding: 0"
        v-if="username !== null"
      >
        <el-dropdown @command="handleCommand" trigger="click" size="medium">
          <span
            class="el-dropdown-link user-name"
            style="height: 100%; padding: 0 1em; display: inline-block"
          >
            <img :src="username.avatar" class="user-avatar" />
            {{ username.nickName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="drop in dropList"
              :command="drop.id"
              :key="drop.name"
              >{{ drop.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span
        title="全屏"
        class="tool-fox"
        v-if="is_full_screen == false"
        @click="is_full_screen = true"
      >
        <i
          class="el-icon-rank"
          style="font-weight: bold; transform: rotate(45deg)"
        ></i>
      </span>
      <span
        title="退出全屏"
        class="tool-fox"
        v-if="is_full_screen == true"
        @click="is_full_screen = false"
      >
        <i class="el-icon-bottom-left" style="font-weight: bold"></i>
      </span>
    </div>
    <el-dialog
      title="登录过期，请重新登录"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gologin">去登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
import introJs from "intro.js";
import axios from "axios";
import { stringify } from "qs";
export default {
  name: "NavHeader",
  props: {
    is_fold: {
      type: Boolean,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      timer: null,
      now: new Date().toLocaleString(),
      username: {},
      dropList: [
        {
          id: 1,
          name: "退出登录",
        },
      ],
      is_full_screen: false, // 是否全屏
    };
  },
  methods: {
    ...userActions(["getexit"]),
    goexit() {
      this.$confirm("你确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getexit();
          localStorage.removeItem("adminUser");
          localStorage.removeItem("tabList");
          this.$store.commit("setTabList", [{ name: "首页", url: "/" }]);
          this.$router.push("/login");
          this.$message.success("欢迎下次光临");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 折叠菜单
    fold_start() {
      this.$parent.$parent.$parent.$parent.is_fold = true;
    },
    //展开菜单
    fold_end() {
      this.$parent.$parent.$parent.$parent.is_fold = false;
    },
    // 全屏
    fullScreen: function () {
      if (document.documentElement.RequestFullScreen) {
        document.documentElement.RequestFullScreen();
      }
      //兼容火狐
      if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
      if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      }
      //兼容IE,只能写msRequestFullscreen
      if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    },
    gologin() {
      this.$router.push("/login");
    },
    // 退出全屏
    fullScreenNormal: function () {
      if (document.exitFullScreen) {
        document.exitFullscreen();
      }
      //     		//兼容火狐
      //     		console.log(document.mozExitFullScreen)
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      //     		//兼容谷歌等
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      //     		//兼容IE
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    handleCommand(command) {
      this.$confirm("你确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getexit();
          localStorage.removeItem("adminUser");
          localStorage.removeItem("tabList");
          this.$store.commit("setTabList", [{ name: "首页", url: "/" }]);
          this.$router.push("/login");
          this.$message.success("欢迎下次光临");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.now = new Date().toLocaleString();
    }, 1000);
    this.username = JSON.parse(localStorage.getItem("adminUser"));
    this.dialogFormVisible = JSON.parse(localStorage.getItem("showbox"));
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    // 监听全屏动作
    is_full_screen: function (newValue, oldValue) {
      if (newValue) {
        this.fullScreen();
      } else {
        this.fullScreenNormal();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.headerNav {
  width: 100%;
  display: flex;
  align-items: center;
  color: #2e5e85;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  white-space: nowrap;
  .t-left {
    margin-left: 30px;
    display: flex;
  }
  .t-right {
    margin-right: 50px;
    display: flex;
    align-items: center;
    .out {
      cursor: pointer;
      color: #409eff;
      margin-left: 12px;
    }
  }
}
.tool-fox {
  padding: 0 1em;
  display: inline-block;
  cursor: pointer;
}
</style>
