<template>
  <div class="sa-admin">
    <!-- 模板框架 -->
    <div
      class="app"
      :class="[
        'theme-0',
        'theme-' + themeV,
        is_fold ? 'fold' : '',
        themeToggling ? 'themeToggling' : '',
        is_show_tabbar ? '' : 'hide-tabbar',
      ]"
    >
      <el-container>
        <el-aside width="200px">
          <div class="nav-left">
            <!-- 左上 -->
            <div class="nav-left-top" :title="title">
              <img
                :src="logo_url"
                class="admin-logo"
                v-if="logo_url != null && logo_url != ''"
              />
              <img src="../../assets/code.png" class="admin-logo" v-else />
              <!-- <span v-else style="margin-right: 25px;" title="无logo时的占位">&emsp;</span> -->
              <span class="nav-title" style="font-size: 1.05em">{{
                title
              }}</span>
            </div>
            <!-- 左下 -->
            <div class="nav-left-bottom">
              <div class="menu-box-1">
                <div class="menu-box-2">
                  <!-- 菜单 -->
                  <el-menu
                    :default-active="$route.meta.path"
                    router
                    unique-opened
                    class="el-menu-style-1"
                    @select="selectMenu"
                  >
                    <template v-for="item in menuList">
                      <el-submenu
                        :index="item.key"
                        :key="item.path"
                        v-if="item.children.length > 0"
                      >
                        <template slot="title">
                          <i :class="item.icon"></i>
                          <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item
                            :index="child.key"
                            v-for="child in item.children"
                            :key="child.path"
                          >
                            <i :class="child.icon"></i>
                            <span slot="title">{{ child.authName }}</span>
                          </el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>
                      <el-menu-item :index="item.key" :key="item.path" v-else>
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.authName }}</span>
                      </el-menu-item>
                    </template>
                  </el-menu>
                </div>
              </div>
            </div>
            <!-- tab左拖拽：关闭 -->
            <div
              class="shade-fox"
              v-if="is_drag"
              @dragover="$event.preventDefault()"
              @drop="
                rightTab = dragTab;
                right_close();
              "
            >
              <span style="font-size: 16px">关闭</span>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-header style="height:49px">
            <!-- 右边 -->
            <div
              class="nav-right"
              :class="is_fold_right ? 'is_fold_right' : ''"
            >
              <!-- 右边，第一行 -->
              <div class="nav-right-1">
                <div class="tools-left">
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
                    title="刷新"
                    class="tool-fox"
                    @click="
                      rightTab = nativeTab;
                      right_f5();
                    "
                  >
                    <i
                      class="el-icon-refresh-right"
                      style="font-weight: bold"
                    ></i>
                  </span>
                  <span title="当前时间" class="tool-fox">
                    <span style="font-size: 0.9em">{{ now_time }}</span>
                  </span>
                </div>
                <div class="tools-right">
                  <span
                    title="点击登录"
                    class="tool-fox"
                    @click="openLogin()"
                    v-if="user == null"
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
                    v-if="user != null"
                  >
                    <el-dropdown
                      @command="handleCommand"
                      trigger="click"
                      size="medium"
                    >
                      <span
                        class="el-dropdown-link user-name"
                        style="
                          height: 100%;
                          padding: 0 1em;
                          display: inline-block;
                        "
                      >
                        <img :src="user.avatar" class="user-avatar" />
                        {{ user.username }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="drop in dropList"
                          :command="drop.name"
                          :key="drop.name"
                          >{{ drop.name }}</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <span title="切换效果" class="tool-fox" style="padding: 0">
                    <el-dropdown
                      @command="toggleSwitch"
                      trigger="click"
                      size="medium"
                    >
                      <span
                        class="el-dropdown-link"
                        style="
                          height: 100%;
                          padding: 0 1em;
                          display: inline-block;
                        "
                      >
                        <i
                          class="el-icon-sort"
                          style="font-weight: bold; transform: rotate(90deg)"
                        ></i>
                        <span style="font-size: 0.9em">切换</span>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          :command="s.value"
                          v-for="s in switchList"
                          :key="s.name"
                        >
                          <span :style="switchV == s.value ? 'color: #44f' : ''"
                            >{{ s.name }}
                          </span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <span title="主题" class="tool-fox" style="padding: 0">
                    <el-dropdown
                      @command="toggleTheme"
                      trigger="click"
                      size="medium"
                    >
                      <span
                        class="el-dropdown-link"
                        style="
                          height: 100%;
                          padding: 0 1em;
                          display: inline-block;
                        "
                      >
                        <i
                          class="el-icon-price-tag"
                          style="font-weight: bold"
                        ></i>
                        <span style="font-size: 0.9em">主题</span>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          :command="t.value"
                          v-for="t in themeList"
                          :key="t.name"
                        >
                          <span :style="themeV == t.value ? 'color: #44f' : ''"
                            >{{ t.name }}
                          </span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <span title="便签" class="tool-fox" @click="openNote()">
                    <i
                      class="el-icon-edit"
                      style="font-weight: bold; font-size: 0.9em"
                    ></i>
                    <span style="font-size: 0.9em">便签</span>
                  </span>
                  <span
                    title="全屏"
                    class="tool-fox"
                    style="margin-right: 0px"
                    v-if="is_full_screen == false"
                    @click="is_full_screen = true"
                  >
                    <i
                      class="el-icon-rank"
                      style="
                        font-weight: bold;
                        position: relative;
                        top: 1px;
                        transform: rotate(45deg);
                      "
                    ></i>
                  </span>
                  <span
                    title="退出全屏"
                    class="tool-fox"
                    style="margin-right: 0px"
                    v-if="is_full_screen == true"
                    @click="is_full_screen = false"
                  >
                    <i
                      class="el-icon-bottom-left"
                      style="font-weight: bold; position: relative; top: 1px"
                    ></i>
                  </span>
                </div>
                <!--  tab上拖拽：全屏打开 -->
                <div
                  class="shade-fox"
                  v-if="is_drag && !dragTab.url"
                  @dragover="$event.preventDefault()"
                  @drop="
                    rightTab = dragTab;
                    right_full();
                  "
                >
                  <span style="font-size: 16px">全屏打开</span>
                </div>
                <div
                  class="shade-fox"
                  v-if="is_drag && dragTab.url"
                  @dragover="$event.preventDefault()"
                  @drop="
                    rightTab = dragTab;
                    right_window_open();
                  "
                >
                  <span style="font-size: 16px">新窗口打开</span>
                </div>
              </div>

              <!-- 右边，第二行 -->
              <!-- <div class="nav-right-2">
                <div class="towards-left" @click="scrollToLeft" title="向左滑">
                  <i class="el-icon-arrow-left"></i>
                </div>
                <div class="towards-middle" @dblclick="atOpen($event)">
                  <div
                    class="tab-title-box"
                    :style="{ left: scrollX + 'px' }"
                    @dblclick.stop=""
                  >
                    <div
                      v-for="tab in tabList"
                      :key="tab.id"
                      :id="'tab-' + tab.id"
                      class="tab-title"
                      :class="tab == nativeTab ? 'tab-native' : ''"
                      @click="showTab(tab)"
                      @contextmenu.prevent="right_showMenu(tab, $event)"
                      draggable="true"
                      @dragstart="
                        is_drag = true;
                        dragTab = tab;
                      "
                      @dragend="is_drag = false"
                    >
                      <div class="tab-title-2">
                        <span
                          :style="tab.is_have_en ? 'font-weight: 400;' : ''"
                          >{{ tab.authName }}</span
                        >
                        <i
                          class="el-icon-close"
                          v-if="!tab.hide_close"
                          @click.stop="closeTab(tab)"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="towards-right"
                  @click="scrollToRight"
                  title="向右滑"
                >
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div> -->
              <!-- 面包屑导航栏 -->
              <!-- <div
                class="nav-right-bre"
                @dblclick="atOpen($event)"
                @contextmenu.prevent="right_showMenu(nativeTab, $event)"
                draggable="true"
                @dragstart="
                  is_drag = true;
                  dragTab = nativeTab;
                "
                @dragend="is_drag = false"
              >
                <el-breadcrumb
                  separator-class="el-icon-arrow-right"
                  @dblclick.stop=""
                >
                  <el-breadcrumb-item>
                    <i class="el-icon-menu" @click="showHome()"></i>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item
                    v-for="menu in breMenuList"
                    :key="menu.id"
                    >{{ menu.name }}</el-breadcrumb-item
                  >
                </el-breadcrumb>
              </div> -->
            </div>
                 
          </el-header>
          <el-main style="padding:0;">
              <tabs></tabs>
            <!-- <router-view></router-view> -->
            <div class="nav-right-3">
              <swiper
                class="sa-swiper"
                :options="swiperOption"
                ref="mySwiper"
                style="background: red"
              >
                <swiper-slide class="swiper-no-swiping">
                  <div class="view-fox">
                    <router-view></router-view>
                  </div>
                </swiper-slide>
              </swiper>
              <div
                class="shade-fox"
                v-if="is_drag"
                @dragover="$event.preventDefault()"
                @drop="
                  rightTab = dragTab;
                  right_xf();
                "
              >
                <span style="font-size: 24px">拖拽至此：悬浮打开</span>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!-- 鼠标右键弹出的盒子 -->
    <!-- 【向下展开动画，坐标平移动画】二者只可得其一 -->
    <div
      class="right-box"
      :style="rightStyle"
      v-show="rightShow"
      tabindex="-1"
      @blur="right_closeMenu2()"
    >
      <div class="right-box-2">
        <div
          @click="
            right_closeMenu();
            right_f5();
          "
        >
          <i class="el-icon-caret-right"></i>刷新
        </div>
        <div
          @click="
            right_closeMenu();
            right_copy();
          "
        >
          <i class="el-icon-caret-right"></i>复制
        </div>
        <div
          @click="
            right_closeMenu();
            right_close();
          "
        >
          <i class="el-icon-caret-right"></i>关闭
        </div>
        <div
          @click="
            right_closeMenu();
            right_close_other();
          "
        >
          <i class="el-icon-caret-right"></i>关闭其它
        </div>
        <div
          @click="
            right_closeMenu();
            right_close_all();
          "
        >
          <i class="el-icon-caret-right"></i>关闭所有
        </div>
        <div
          @click="
            right_closeMenu();
            right_xf();
          "
        >
          <i class="el-icon-caret-right"></i>悬浮打开
        </div>
        <div
          @click="
            right_closeMenu();
            right_full();
          "
          v-if="rightTab && !rightTab.url"
        >
          <i class="el-icon-caret-right"></i>全屏打开
        </div>
        <div
          @click="
            right_closeMenu();
            right_window_open();
          "
          v-if="rightTab && rightTab.url"
        >
          <i class="el-icon-caret-right"></i>新窗口打开
        </div>
        <div @click="right_closeMenu2()">
          <i class="el-icon-caret-right"></i>取消
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog
      v-if="dialogTab"
      :title="dialogTab.title"
      :visible.sync="dialogTab.isShow"
      :width="dialogTab.way == 1 ? '100%' : '80%'"
      :before-close="dialogTab.beforeClose"
      :close-on-click-modal="false"
      :top="dialogTab.way == 1 ? '0px' : '10vh'"
      :fullscreen="dialogTab.way == 1"
      custom-class="full-dialog"
    >
      <div :style="dialogTab.way == 1 ? '' : 'height: 70vh'">
        <component
          v-bind:is="dialogTab.view"
          :params="dialogTab.params"
          v-if="dialogTab.isShow2"
        ></component>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 组件 swiper
import router from "../../router";
import Tabs from "../../components/tabs/Tabs";
import unionBy from "lodash/unionBy";
export default {
  name: "",
  components: {
    swiper,
    swiperSlide,
    Tabs,
  },
  props: {},
  data() {
    // 首页
    var homeTab = {
      authName: "首页",
      children: [],
      path: "home",
      key: "/home",
      icon: "el-icon-s-home",
    };
    return {
      title: "潘浩后台", //'SA-后台模板',				// 页面标题
      logo_url: "", // logo地址
      icon_url: "", // icon地址
      default_active: "0", // 默认的高亮菜单id
      default_openeds: [], // 默认的打开数组
      unique_opened: true, // 是否保持只打开一个
      menuList: [], // 菜单集合
      homeTab: homeTab, // 主页tab
      nativeTab: homeTab, // 当前正显示的Tab
      // tabList: [homeTab], // 页面集合
      atTitle: "", // 添加窗口时: 标题
      atUrl: "", // 添加窗口时: 地址
      scrollX: 0, // 滚动条位置
      // rightMaxHeight: 0,	// 右键菜单的最高高度 (控制是否展开)
      // rightZB: {x: 0, y: 0}	,// 右键菜单坐标
      rightTab: null, // 右键正在操作的tab
      rightShow: false, // 右键菜单是否正在显示
      rightStyle: {
        // 卡片标题右键菜单的样式
        left: "0px", // 坐标x
        top: "0px", // 坐标y
        maxHeight: "0px", // 右键菜单的最高高度 (控制是否展开)
      },
      is_drag: false, // 当前是否正在拖拽
      dragTab: null, // 当前正在拖拽的tab
      is_fold: false, // 菜单是否折叠
      is_fold_right: false, // 右边是否折叠（将右边盒子折叠与菜单折叠分开，这样可以减少动画的卡顿现象）
      is_full_screen: false, // 是否全屏
      user: {
        username: "小潘潘", // 昵称
        avatar: "../../assets/bj.png", // 头像地址
      }, // user信息
      now_time: "加载中...", // 当前时间
      switchV: localStorage.getItem("switchV") || "fade", // 切换效果
      switchList: [
        // 切换动画数组
        { name: "淡入", value: "fade" },
        { name: "滑动", value: "slide" },
        { name: "方块", value: "cube" },
        { name: "3D流", value: "coverflow" },
        { name: "3D翻转", value: "flip" },
      ],
      themeV: localStorage.getItem("themeV") || "1", // 当前主题值
      themeList: [
        // 主题数组
        { name: "蓝色", value: "1", show_all: false },
        { name: "绿色", value: "2", show_all: false },
        { name: "白色", value: "3", show_all: false },
        { name: "灰色", value: "4", show_all: false },
        { name: "灰色-展开", value: "5", show_all: true },
        { name: "pro钛合金", value: "6", show_all: false },
        { name: "沉淀式黑蓝", value: "7", show_all: false },
        { name: "简约式灰蓝", value: "8", show_all: false },
      ],
      themeToggling: false, // 主题是否正在切换
      dropList: [
        {
          name: "我的资料",
          click: function () {
            sa_admin.$message("点击了我的资料，你可以参照文档重写此函数");
          },
        },
        {
          name: "切换账号",
          click: function () {
            sa_admin.openLogin(); // 打开登陆视图
          },
        },
        {
          name: "退出登录",
          click: function () {
            // sa_admin.$message('点击了退出登录，你可以参照文档重写此函数');
            sa.confirm("退出登录？", function () {
              sa.ajax2(
                "/acc/exit",
                function () {
                  sa.alert("注销成功", function () {
                    sa_admin.openLogin();
                  });
                },
                { msg: "正在注销" }
              );
            });
          },
        },
      ], // 头像处下拉列表菜单
      mySwiper: null, // swiper相关
      is_show_tabbar: true, // 是否显示tab栏
      breMenuList: [homeTab], // 面包屑导航栏的tab数据
      is_reme_open: true, // 是否记住上一次最后打开的窗口
      // swiper配置
      swiperOption: {
        autoplay: false, // 自动切换
        effect: localStorage.getItem("switchV") || "fade", // 切换效果
      },
      dialogTab: null, // dialogTab信息
    };
  },
  methods: {
    // ------------------- 初始化相关 --------------------
    // 初始化模板, 此方法只可调用一次
    init: function (option) {
      // 初始化swiper对象
      this.initSwiper();
      // 开始一些初始化动作
      this.showTabByHash(); // 打开上次最后的一个窗口
      window.onresize(); // 手动触发一下窗口变动监听
    },
    // ------------------- 对外预留 end --------------------
    // 打开所有菜单的折叠
    show_all_menu: function () {
      var default_openeds = [];
      for (var i = 0; i < this.menuList.length; i++) {
        default_openeds.push(this.menuList[i].id);
        if (this.menuList[i].childList) {
          for (var j = 0; j < this.menuList[i].childList.length; j++) {
            default_openeds.push(this.menuList[i].childList[j].id);
          }
        }
      }
      this.default_openeds = default_openeds;
    },
    // 切换主题
    toggleTheme: function (command) {
      // 调整动画，避免卡顿
      this.themeToggling = true;
      setTimeout(
        function () {
          this.themeToggling = false;
        }.bind(this),
        1000
      );

      // 开始切换
      this.themeV = command + "";
      localStorage.setItem("themeV", command);
      for (var i = 0; i < this.themeList.length; i++) {
        if (this.themeList[i].value + "" == command + "") {
          if (this.themeList[i].show_all) {
            this.show_all_menu();
            this.unique_opened = false;
          } else {
            this.default_openeds = [];
            this.unique_opened = true;
          }
          // 给个提示
          if (window.dsadasdwdwawd) {
            this.$message("切换成功，" + this.themeList[i].name);
          }
          window.dsadasdwdwawd = true;
        }
      }
    },
    // 切换翻页方式
    toggleSwitch: function (command) {
      this.switchV = command + "";
      localStorage.setItem("switchV", command);

      this.$confirm("此动画效果将在您刷新页面之后生效，是否立即刷新？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          location.reload();
        })
        .catch(function () {});
    },
    // 处理userinfo的下拉点击
    handleCommand: function (command) {
      this.dropList.forEach(function (drop) {
        if (drop.name == command) {
          drop.click();
        }
      });
    },
    // 退出登录
    login_out: function () {
      console.log("退出登录");
    },
    // 折叠菜单
    fold_start: function () {
      this.is_fold_right = true;
      this.updateSlideSize(100); // swipre重新计算大小
      // 如果打开的 iframe 在五个以内  浏览器压力很小 就立刻展开菜单，
      // 如果打开 iframe 超过5个，浏览器就比较有压力， 此时会卡顿短暂时间，此时延时折叠菜单，让动画显得没那么卡
      // if (this.tabList.length <= 5) {
      //   this.is_fold = true;
      // } else {
      //   setTimeout(
      //     function () {
      //       this.is_fold = true;
      //     }.bind(this),
      //     100
      //   );
      // }
    },
    // 展开菜单
    fold_end: function () {
      this.is_fold = false;
      // 延时200ms执行，让它没那么卡
      setTimeout(
        function () {
          this.is_fold_right = false;
          this.updateSlideSize(); // swipre重新计算大小
        }.bind(this),
        200
      );
    },
    // 刷新一下面包屑导航栏
    f5_breMenuList: function () {
      // 如果非单窗口模式, 则不刷新了,  节省cpu
      if (this.is_show_tabbar) {
        return;
      }
      //
      var menu = this.getMenuById(this.menuList, this.nativeTab.id);
      if (menu == null) {
        // 自定义tab这里会取不到值, 就造个假tab就好了
        this.breMenuList = [{ name: this.nativeTab.name }];
      } else {
        var breMenuList = [menu];
        for (var i = 0; i < breMenuList.length; i += 0) {
          var parent_id = breMenuList[0].parent_id;
          if (parent_id == 0 || parent_id == undefined) {
            break;
          }
          let menu = this.getMenuById(this.menuList, parent_id);
          breMenuList.unshift(menu);
        }
        this.breMenuList = breMenuList;
      }
    },
    // ------------------- tab 右键菜单相关 --------------------
    // 显示右键菜单
    right_showMenu: function (tab, event) {
      this.rightTab = tab; // 绑定操作tab
      var e = event || window.event;
      this.rightStyle.left = e.clientX + 1 + "px"; // 设置给坐标x
      this.rightStyle.top = e.clientY + "px"; // 设置给坐标y
      this.rightShow = true; // 显示右键菜单
      this.$nextTick(function () {
        var foxHeight = document.querySelector(".right-box-2").offsetHeight; // 应该展开多高
        this.rightStyle.maxHeight = foxHeight + "px"; // 展开
        document.querySelector(".right-box").focus(); // 获得焦点,以被捕获失去焦点事件
      });
    },
    // 关闭右键菜单 - 立即关闭
    right_closeMenu: function () {
      this.rightStyle.maxHeight = "0px";
      this.rightShow = false;
    },
    // 关闭右键菜单 - 带动画折叠关闭 (失去焦点和点击取消时调用, 为什么不全部调用这个? 因为其它时候调用这个都太卡了)
    right_closeMenu2: function () {
      this.rightStyle.maxHeight = "0px";
      // this.rightShow = false;
    },
    // 右键 刷新
    right_f5: function () {
      this.showTab(this.rightTab); // 先转到
      this.rightTab.is_rend = false;
      location.reload(); // 必须强制更新一下
      this.$nextTick(function () {
        this.rightTab.is_rend = true;
      });
    },
    // 右键 复制
    right_copy: function () {
      var tab = {
        id: new Date().getTime(),
        name: this.rightTab.name,
        view: this.rightTab.view,
      };
      this.showTab(tab);
    },
    // 右键 悬浮
    right_xf: function () {
      if (this.rightTab.id == this.homeTab.id + "") {
        this.$message({
          message: "这个不能全屏哦，换个卡片试试吧",
          type: "warning",
        });
        return;
      }
      // 先关闭
      this.closeTab(
        this.rightTab,
        function () {
          this.f5_breMenuList();
        }.bind(this)
      );
      // 再打开
      this.dialogTabShow(
        this.rightTab.name,
        this.rightTab.view,
        this.rightTab.params,
        2
      );
    },
    // 右键 - 关闭
    right_close: function () {
      if (this.rightTab.id == this.homeTab.id + "") {
        this.$message({
          message: "这个不能关闭哦",
          type: "warning",
        });
        return; // 隐藏右菜单
      }
      this.closeTab(
        this.rightTab,
        function () {
          this.f5_breMenuList();
        }.bind(this)
      );
    },
    // 右键 - 关闭其它
    right_close_other: function () {
      // 先滑到最左边
      this.scrollX = 0;
      // 递归删除
      var i = 0;
      var deleteFn = function () {
        // 如果已经遍历全部
        // if (i >= this.tabList.length) {
        //   return;
        // }
        // 如果在白名单,i++继续遍历, 如果不是,递归删除
        // var tab = this.tabList[i];
        if (
          tab.key + "" == this.homeTab.key + "" ||
          tab.key + "" == this.rightTab.key
        ) {
          i++;
          deleteFn();
        } else {
          this.closeTab(tab, function () {
            deleteFn();
          });
        }
      }.bind(this);
      deleteFn();
    },
    // 右键 - 关闭所有
    right_close_all: function () {
      // 先滑到最左边
      this.scrollX = 0;
      // 递归删除
      var i = 0;
      var deleteFn = function () {
        // 如果已经遍历全部
        // if (i >= this.tabList.length) {
        //   this.f5_breMenuList();
        //   return;
        // }
        // 如果在白名单,i++继续遍历, 如果不是,递归删除
        // var tab = this.tabList[i];
        if (tab.key + "" == this.homeTab.key + "") {
          i++;
          deleteFn();
        } else {
          this.closeTab(tab, function () {
            deleteFn();
          });
        }
      }.bind(this);
      deleteFn();
    },
    // 右键 - 全屏打开
    right_full: function () {
      // 先关闭
      if (this.rightTab.id != this.homeTab.id + "") {
        // 主页就不关了
        this.closeTab(
          this.rightTab,
          function () {
            this.f5_breMenuList();
          }.bind(this)
        );
      }
      // 再打开
      this.dialogTabShow(
        this.rightTab.name,
        this.rightTab.view,
        this.rightTab.params,
        1
      );
    },
    // 右键 - 新窗口打开
    right_window_open: function () {
      // 先关闭
      if (this.rightTab.id != this.homeTab.id + "") {
        // 主页就不关了
        this.closeTab(
          this.rightTab,
          function () {
            this.f5_breMenuList();
          }.bind(this)
        );
      }
      open(this.rightTab.url);
    },
    // 获取指定tab所代表iframe的url地址 (同域下可获取最新地址, 跨域时只能获取初始化时的地址)
    getTabUrl: function (tab) {
      this.sss(tab);
      // var cs = '#iframe-' + tab.id;
      // var iframe = document.querySelector(cs);
      // try{
      // 	return iframe.contentWindow.location.href;
      // }catch(e){
      // 	return iframe.getAttribute('src');
      // }
    },

    // ------------------- menu 相关 --------------------
    // 点击子菜单时的回调,
    // 参数: 点击菜单index标识（不是下标）, 所有已经打开的菜单 index
    selectMenu(index, indexPath) {},

    // js显示某个菜单
    // showMenuById: function (id) {
    //   var menu = this.getMenuById(this.menuList, id);
    //   if (menu) {
    //     this.showTab(menu);
    //   }
    // },
    // 返回指定 index 的menu
    // getMenuById: function (menuList, id) {
    //   for (var i = 0; i < menuList.length; i++) {
    //     var menu = menuList[i];
    //     if (menu.key + "" == id + "") {
    //       return menu;
    //     }
    //     // 如果是二级或多级
    //     if (menu.children) {
    //       var menu2 = this.getMenuById(menu.children, id);
    //       if (menu2 != null) {
    //         return menu2;
    //       }
    //     }
    //   }
    //   return null;
    // },
    // 显示homeTab
    showHome: function () {
      this.showTab(this.homeTab);
    },

    // ------------------- tab title 相关 --------------------
    // 在一个tab上, 初始化 view
    initTabView: function (tab) {
      // console.log(tab)
      // // 如果已经初始化过了
      // if (tab.is_init_view) {
      //   return;
      // }
      // // 开始初始化
      // tab.params = tab.params || {}; // 给参数一个默认值
      // tab.is_rend = true; // 是否显示, 利用此来强制刷新子组件
      // 如果是一个.html页面
      // if (tab.url) {
      //   let template =
      //     '<div class="iframe-view-box"><iframe class="iframe-view" src="' +
      //     tab.url +
      //     '"></iframe></div>';
      //   tab.view = { template: template };
      //   return (tab.is_init_view = true);
      // }
      // 如果是
      // return (tab.is_init_view = true);
    },
    // 关闭tab - 无动画版本
    // closeTab_not_an: function (tab) {
    //   this.sss(tab);
    //   // 根据没有地方调用这个方法, 所以先不写了嘻嘻
    // },
    // 关闭页面
    // closeTab: function (tab, callFn) {
    //   // 执行关闭动画
    //   var div = document.querySelector("#tab-" + tab.id);
    //   div.style.width = div.offsetWidth + "px";
    //   setTimeout(function () {
    //     div.style.width = "0px";
    //   }, 0);

    //   // 等待动画结束
    //   setTimeout(
    //     function () {
    //       // 如果tab为当前正在显示的tab, 则先不让它显示
    //       if (tab == this.nativeTab) {
    //         var index = this.tabList.indexOf(tab);
    //         var preTab = this.tabList[index - 1];
    //         this.showTab(preTab);
    //       }
    //       // 开始从集合中移除
    //       sa_admin_code_util.arrayDelete(this.tabList, tab);
    //       // this.deleteSlide(tab.id);
    //       // 如果有回调
    //       if (callFn) {
    //         this.$nextTick(function () {
    //           callFn();
    //         });
    //       }
    //     }.bind(this),
    //     150
    //   );
    // },
    // // js关闭某个tab, 根据id
    // closeTabById: function (id, callFn) {
    //   var tab = this.getTabById(id);
    //   if (tab) {
    //     this.closeTab(tab, callFn);
    //   }
    // },
    // // 添加一个Tab  {id,name,url}
    // addTab: function (tab) {
    //   tab.is_have_en = this.is_have_en(tab.authName ); // 有英文字母的不能加字体加粗动画, 因为会影响tab选项卡的width尺寸, 造成动画混乱
    //   // tab.view = () => import('@/sa-view/HelloWorld.vue');
    //   this.initTabView(tab);
    //   this.tabList.push(tab);
    //   console.log(this.tabList)
    //   // this.addSlide(tab);
    // },
    // 显示某个页面  (如果不存在, 则先添加)
    showTab: function (tab) {
      //   console.log(tab)
      //   // 如果是当前正在显示的tab , 则直接 返回
      //   if (tab.key == this.tabList.key && tab.key != this.homeTab.key) {
      //     return;
      //   }
      //   // 如果没有先添加
      //   if (this.getTabById(tab.key) == null) {
      //     this.addTab(tab);
      //   }
      //   // 然后显示
      //   this.$nextTick(function () {
      //     this.gotoSlide(tab.key);
      //     // 如果是无tabbar模式
      //     if (!this.is_show_tabbar) {
      //       this.rightTab = tab;
      //       this.right_close_other();
      //       this.f5_breMenuList();
      //     }
      //     this.f5HashByNativeTab();
      //   });
      //   this.nativeTab = tab;
      //   this.default_active = tab.key + ""; // 左边自动关联, 如果左边没有，则无效果
      //   // 归位一下
      //   this.$nextTick(
      //     function () {
      //       this.scrollToAuto();
      //     }.bind(this)
      //   );
    },
    // 显示一个选项卡, 根据 id , 不存在则不显示
    // showTabById: function (id) {
    //   var tab = this.getTabById(id);
    //   if (tab) {
    //     this.showTab(tab);
    //   }
    // },
    // // 获取 Tab 根据 id
    getTabById: function (id) {
      //   for (var i = 0; i < this.tabList.length; i++) {
      //     if (this.tabList[i].key + "" == id + "") {
      //       return this.tabList[i];
      //     }
      //   }
      //   return null;
    },
    // 双击tab栏空白处, 打开弹窗添加窗口
    atOpen: function () {
      window.r_layer_12345 = this.layer.open({
        type: 1,
        shade: 0.5,
        title: "添加新窗口", //不显示标题
        content: $(".at-form-dom"), //捕获的元素
        cancel: function () {},
      });
    },
    // 根据表单添加新窗口
    atOk: function () {
      if (this.atTitle == "" || this.atUrl == "") {
        return;
      }
      // 创建tab
      var tab = {
        id: new Date().getTime(),
        name: this.atTitle,
        url: this.atUrl,
      };
      // 打开tab
      this.showTab(tab);
      // 关闭并清空
      this.layer.close(window.r_layer_12345);
      this.atTitle = "";
      this.atUrl = "";
    },
    // 返回一个字符串中是否有英文字母
    is_have_en: function (str) {
      var reg = /[a-z]/i;
      return reg.test(str); //true,说明有英文字母
    },
    // ------------------- tab左右滑动  --------------------
    // 视角向左滑动一段距离
    scrollToLeft: function () {
      var width = document.querySelector(".nav-right-2").clientWidth; // 视角宽度
      this.scrollX += width / 2; // 视角向左滑动一段距离
      // 越界检查
      setTimeout(
        function () {
          if (this.scrollX > 0) {
            this.scrollX = 0;
          }
        }.bind(this),
        200
      );
    },
    // 视角向右滑动一段距离
    scrollToRight: function () {
      var width = document.querySelector(".nav-right-2").clientWidth; // 视角宽度
      // var tabListWidth = document.querySelector(".tab-title-box").clientWidth; // title总盒子宽度
      // var rightLimit = 0 - tabListWidth + width / 2; // 右滑的极限
      this.scrollX -= width / 2; // 视角向右滑动一段距离
      // 越界检查
      setTimeout(
        function () {
          if (this.scrollX < rightLimit) {
            this.scrollX = rightLimit;
          }
          // 同时防止左边越界
          if (this.scrollX > 0) {
            this.scrollX = 0;
          }
        }.bind(this),
        200
      );
    },
    // 自动归位
    scrollToAuto: function () {
      // console.log('自动归位=========');
      try {
        // 最后一个不用归位了
        // if(this.nativeTab == this.tabList[this.tabList.length - 1]){
        // 	return;
        // }
        var width = document.querySelector(".nav-right-2").clientWidth; // 视角宽度
        var left = document.querySelector(".tab-native").lastChild.offsetLeft; // 当前native-tilte下一个距离左边的距离
        // console.log(width, left, this.scrollX);
        // 如果在视图右边越界
        if (left + this.scrollX > width - 100) {
          return this.scrollToRight();
        }
        // 如果在视图左边越界
        if (left + this.scrollX < 0) {
          return this.scrollToLeft();
        }
      } catch (e) {
        // throw e;
      }
    },
    // ------------------- tab拖拽相关 --------------------
    // 在 某个tab上被松开  -->  重新排序   ( 函数未完成 )
    tab_ondrop: function (tab) {
      this.sss(tab);
      /**
       * 写到一半发现,这看似简单的一个功能, 实则复杂无比
       * 首先tab卡交换顺序, 算法就已经比较复杂, 同时为了不显着生硬,还要加上:
       * tab被悬浮提示,
       * tab卡交换动画,
       * 避开在v-for下操作dom带来的一系列坑
       * 其次, 下面的iframe, 也要按照相应顺序进行交换,
       * 而swiper本身没有提供这样的api, 又要用js操作dom
       * 交换dom顺序, 同时又要保持iframe不被销毁(因为用户肯定不想看到交换一下tab 页面竟然初始化了)
       * 同时一些列操作后, 又要保证不和swiper本身产生冲突...
       * 脑供血不足了...... 让我缓缓...
       * 求前端大神提交pr, 跪谢!!!
       */

      // // 如果没有交换
      // if(tab == this.dragTab)  {
      // 	return;
      // }
      // // 删除这个
      // var dragIndex = this.tabList.indexOf(this.dragTab);
      // this.tabList.splice(dragIndex, 1);
      // // 重新添加到这个位置
      // this.$nextTick(function() {
      // 	var tabIndex = this.tabList.indexOf(tab);
      // 	this.tabList.splice(tabIndex + 1, 0, this.dragTab);
      // })
    },
    // ------------------- 锚链接路由相关 --------------------
    // 根据锚链接, 打开窗口
    showTabByHash: function () {
      // 如果非记住模式
      if (this.is_reme_open == false) {
        return;
      }
      // 获取锚链接中的id
      var hash = location.hash;
      var id = hash.replace("#", "");

      if (id == "") {
        this.showHome();
        return;
      }
      // 如果已经存在与tabbar中
      var tab = this.getTabById(id);
      if (tab != null) {
        return this.showTab(tab);
      }
      // 否则从菜单中打开
      if (id == this.homeTab.id) {
        this.showHome();
      } else {
        // this.showMenuById(id);
      }
      // 此时, 仍有一种tab打不开, 那就是自定义tab然后还已经关闭的,
      // 预设 解决方案: 在localStor里存储所有打开过的tab,
      // 以后如果有强需求这个功能时, 再实现
    },
    // 根据当前tab刷新一下锚链接
    f5HashByNativeTab: function () {
      // 如果非记住模式
      if (this.is_reme_open == false) {
        return;
      }
      location.hash = this.nativeTab.key;
    },
    // ------------------- swiper相关 --------------------
    // 初始化swiper
    initSwiper: function (switchV) {
      this.sss(switchV);
      this.mySwiper = this.$refs.mySwiper.swiper;
      // this.mySwiper = new Swiper('.swiper-container', {
      // 	autoplay: false,		// 可选选项，自动滑动
      // 	effect: switchV
      // })
    },
    // 获取指定slide的索引, 根据id
    // getSlideIndexById: function (id) {
    //   var tab = this.getTabById(id);
    //   return this.tabList.indexOf(tab);
    // },
    // 删除slide,  根据指定iframe的id
    deleteSlide: function (id) {
      this.sss(id);
      // var slideIndex = this.getSlideIndexById(id);
      // if(slideIndex != -1) {
      // 	this.mySwiper.removeSlide(slideIndex);
      // }
    },
    // 切换到指定的slide, 根据id
    gotoSlide: function (id) {
      var slideIndex = this.getSlideIndexById(id);
      if (slideIndex != -1) {
        this.mySwiper.slideTo(slideIndex, 300);
      }
    },
    // 更正slide大小 ms = 延时毫秒数
    updateSlideSize: function (ms) {
      ms = ms || 1;
      setTimeout(
        function () {
          this.mySwiper.update(); // swipre重新计算大小
        }.bind(this),
        ms
      );
    },
    // ------------------- 登录 与鉴权 --------------------
    // 打开登录页面
    openLogin: function () {
      this.$refs["sa-login"].isShow = true;
    },
    // 关闭login页面
    closeLogin: function () {
      this.$refs["sa-login"].isShow = false;
    },
    // 打开403页面
    open403: function () {
      this.$refs["sa403"].isShow = true;
    },
    // 打开404页面
    open404: function () {
      this.$refs["sa404"].isShow = true;
    },
    // 打开500页面
    open500: function () {
      this.$refs["sa500"].isShow = true;
    },

    // ------------------- 杂七杂八 --------------------
    // 什么也不做, 帮助一下不太规范的语法逃避检查
    sss: function () {},
    // 获取指定视图的对象，用来跨视图通信
    getView: function (id) {
      var com = this.$refs["view-" + id];
      if (com) {
        return com[0];
      }
    },
    // 悬浮或者, 全屏显示tab
    // title=标题,  view=要显示的组件, params=参数 ,way= 方式(1=全屏,2=悬浮打开)
    dialogTabShow: function (title, view, params, way) {
      this.dialogTab = {
        // dialog信息
        isShow: true, // 是否显示
        isShow2: true, // 是否显示视图(先关闭视图,在关闭dialog,解决dialog关闭时视图重复刷新的莫名bug)
        title: title || "信息", // 标题
        view: view || { template: "<div>加载中</div>" }, // 显示的组件
        params: params || {}, // 参数
        way: way || 1,
        beforeClose: function (done) {
          this.dialogTab.isShow2 = false;
          done();
        }.bind(this),
      };
    },
    closeDialog: function () {
      this.dialogTab.isShow = false;
    },
    // 打开便签
    openNote: function () {
      var w = document.body.clientWidth * 0.4 + "px";
      var h = document.body.clientHeight * 0.6 + "px";
      var default_content =
        "一个简单的小便签, 关闭浏览器后再次打开仍然可以加载到上一次的记录, 你可以用它来记录一些临时资料";
      var value = localStorage.getItem("sa_admin_note") || default_content;
      var index = this.layer.prompt(
        {
          title: "一个小便签",
          value: value,
          formType: 2,
          area: [w, h],
          btn: ["保存"],
          maxlength: 99999999,
        },
        function (pass, index) {
          this.layer.close(index);
        }.bind(this)
      );
      var se = "#layui-layer" + index + " .layui-layer-input";
      var d = document.querySelector(se);
      d.oninput = function () {
        localStorage.setItem("sa_admin_note", this.value);
      };
    },
    // 弹窗
    msg: function (msg) {
      this.layer.msg(msg);
    },
    // 初始化window相关配置
    initWindow: function () {
      // sa-admin对象
      var sa_admin = this;

      // 挂在到原型
      Vue.prototype.sa_admin = sa_admin;

      // 监听窗口大小变动
      window.onresize = function () {
        if (document.body.clientWidth < 800) {
          sa_admin.fold_start();
        } else {
          sa_admin.fold_end();
        }
      };

      // 监听锚链接变动
      window.onhashchange = function () {
        // console.log('锚链接变动了');
        this.showTabByHash();
      }.bind(this);

      // 一直更新时间
      if (window.abcdefghijklmn) {
        clearInterval(window.abcdefghijklmn);
      }
      window.abcdefghijklmn = setInterval(function () {
        var da = new Date();
        var Y = da.getFullYear(); //年
        var M = da.getMonth() + 1; //月
        var D = da.getDate(); //日
        var h = da.getHours(); //小时
        var sx = "凌晨";
        if (h >= 6) {
          sx = "上午";
        }
        if (h >= 12) {
          sx = "下午";
          if (h >= 18) {
            sx = "晚上";
          }
          h -= 12;
        }
        var m = da.getMinutes(); //分
        var s = da.getSeconds(); //秒
        var z = ["日", "一", "二", "三", "四", "五", "六"][da.getDay()]; //周几
        // z = z == 0 ? '日' : z;
        var zong = "";

        zong +=
          Y +
          "-" +
          M +
          "-" +
          D +
          " " +
          sx +
          " " +
          h +
          ":" +
          m +
          ":" +
          s +
          " 周" +
          z;
        sa_admin.now_time = zong;
      }, 1000);
    },
    getDate() {
      let arr = [
        {
          icon: "el-icon-eleme",
          authName: "订单管理",
          path: "orders",
          children: [
            {
              icon: "el-icon-eleme",
              authName: "订单列表",
              path: "petorders",
            },
            {
              icon: "el-icon-eleme",
              authName: "订单商城",
              path: "Ordershopp",
            },
          ],
        },
        {
          icon: "el-icon-eleme",
          authName: "用户管理",
          path: "user",
          children: [
            {
              icon: "el-icon-eleme",
              authName: "用户列表",
              path: "Userstration",
            },
          ],
        },
      ];
      arr.unshift({
        key: "home",
        authName: "首页",
        children: [],
        path: "home",
        icon: "el-icon-s-home",
      });
      arr.map((item) => {
        if (item.children.length === 0) {
          this.$set(item, "key", `/${item.path}`);
        } else {
          this.$set(item, "key", `/${item.path}`);
          item.children.map((child) => {
            this.$set(child, "key", `/${item.path}/${child.path}`);
          });
        }
      });
      this.menuList = arr;
    },
  },
  mounted() {
    this.getDate();
    this.initWindow();
    this.init();
  },
  created() {},
  filters: {},
  computed: {
    tabList() {
      return this.$store.state.tabList;
    },
  },
  watch: {
    //监听tab路由
    $route: {
      handler(val) {
        console.log(this.tabList);
        this.tabList.map((item) => {
          if (item.name !== val.meta.title) {
            this.$store.commit("pushTabList", {
              name: val.meta.title,
              url: val.path,
            });
          }
        });
        let arr = unionBy(this.tabList, "name");
        this.$store.commit("setTabList", arr);
        localStorage.setItem("tabList", JSON.stringify(arr));
      },
      immediate: true,
      deep: true,
    },
    // 监听全屏动作
    is_full_screen: function (newValue) {
      if (newValue) {
        sa_admin_code_util.fullScreen();
      } else {
        sa_admin_code_util.fullScreenNormal();
      }
    },
    // 监听title改变时, 页面title也跟着切换
    title: function (newValue) {
      document.querySelector("title").innerHTML = newValue;
    },
    // 监听 icon_url 网页图标
    icon_url: function (newValue) {
      var icon_url = newValue;
      var icon_target = document.querySelector(".admin-icon");
      if (icon_target) {
        icon_target.setAttribute("href", icon_url);
      }
    },
  },
  directives: {},
};
</script>
<style lang='scss'>
@import "../../layout";
.el-header{
  z-index: 999;
  background: red;
}
</style>