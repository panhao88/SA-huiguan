<template>
  <div id="app">
    <!-- <transition 
    enter-active-class="animate__animated animate__bounceIn" 
    leave-active-class="animate__animated animate__backOutDown"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import "vue-transition.css";
export default {
  // data: {
  //   return: {
  //     list: [
  //       {
  //         actionKey: "/permissions",
  //         children: [
  //           {
  //             actionKey: "/api/permissions/getAllMenu",
  //             children: [
  //               {
  //                 actionKey: "/api/permissions/sync",
  //                 disabled: true,
  //                 icon: "el-icon-sort",
  //                 id: 5,
  //                 isCheck: 1,
  //                 pcode: "",
  //                 pid: 4,
  //                 pname: "权限同步",
  //                 ptype: "2",
  //                 remark: "将新增加的功能同步到数据库进行权限控制",
  //               },
  //               {
  //                 actionKey: "/api/permissions/add",
  //                 disabled: true,
  //                 id: 49,
  //                 isCheck: 1,
  //                 pcode: "",
  //                 pid: 4,
  //                 pname: "新增权限菜单",
  //                 ptype: "2",
  //               },
  //             ],
  //             icon: "el-icon-magic-stick",
  //             id: 4,
  //             isCheck: 1,
  //             pcode: "",
  //             pid: 3,
  //             pname: "权限菜单",
  //             ptype: "1",
  //             viewPath: "sa-html/role/menu-list.html",
  //           },
  //           {
  //             actionKey: "/api/account/getList",
  //             children: [],
  //             icon: "el-icon-news",
  //             id: 11,
  //             isCheck: 1,
  //             pcode: "",
  //             pid: 3,
  //             pname: "账户列表",
  //             ptype: "1",
  //             viewPath: "sa-html/account/account-list.html",
  //           },
  //           {
  //             actionKey: "/api/role/getList",
  //             children: [],
  //             icon: "el-icon-news",
  //             id: 62,
  //             isCheck: 1,
  //             pcode: "",
  //             pid: 3,
  //             pname: "角色列表",
  //             ptype: "1",
  //             viewPath: "sa-html/role/role-list.html",
  //           },
  //         ],
  //         icon: "el-icon-unlock",
  //         id: 3,
  //         isCheck: 1,
  //         pcode: "",
  //         pname: "权限控制",
  //         ptype: "1",
  //         remark: "对系统角色权限的分配等设计，敏感度较高，请谨慎授权",
  //       },
  //       {
  //         actionKey: "/log",
  //         children: [
  //           {
  //             actionKey: "/api/log/loginLogList",
  //             children: [
  //               {
  //                 actionKey: "/api/log/deleteLoginLog",
  //                 disabled: true,
  //                 id: 40,
  //                 isCheck: 1,
  //                 pcode: "",
  //                 pid: 42,
  //                 pname: "删除登录日志",
  //                 ptype: "2",
  //                 remark: "清空所有登录日志和选定日期之前的数据",
  //               },
  //             ],
  //             icon: "el-icon-tickets",
  //             id: 42,
  //             isCheck: 1,
  //             pcode: "1",
  //             pid: 72,
  //             pname: "登录日志",
  //             ptype: "1",
  //             remark: "记录所有人员的登录操作",
  //           },
  //         ],
  //         icon: "el-icon-tickets",
  //         id: 72,
  //         isCheck: 1,
  //         pcode: "",
  //         pname: "日志管理",
  //         ptype: "1",
  //         remark: "登录日志与操作日志",
  //       },
  //     ],
  //   },
  // },
};
</script>

<style lang="scss">
@import "./styles/common";
@import "./styles/base";
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
