<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
/** 公共css */
* {
  margin: 0px;
  padding: 0px;
}
html {
  font-size: 10px;
  height: 100%;
}
body {
  font-size: 1.4rem;
  height: 100%;
  background-color: #eeeeee;
  color: #333;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, Arial,
    sans-serif;
}
a {
  text-decoration: none;
}
a:hover {
}
/* h1,h2,h3,h4,h5,h6{font-weight: 400;} */
hr {
  background-color: #ddd;
  height: 1px;
  border: none;
}
input,
select {
  outline: 0;
}

/* input type=number时不显示按钮 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

/* 居中形式的img */
.cover-img {
  object-fit: cover;
  object-position: 50% 30%;
}

/* ajax2加载时的转圈圈样式 */
.ajax-layer-load.layui-layer-dialog {
  min-width: 0px !important;
  background-color: rgba(0, 0, 0, 0.85);
}
.ajax-layer-load.layui-layer-dialog .layui-layer-content {
  padding: 10px 20px 10px 40px;
  color: #fff;
}
.ajax-layer-load.layui-layer-dialog .layui-layer-content .layui-layer-ico {
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  top: 12px;
}

/* layer图片预览时, 左右键永远显示 */
.layui-layer-imgbar,
.layui-layer-imguide {
  display: block !important;
}
.layui-layer-iconext.layui-layer-imgprev {
  position: fixed;
  left: 50;
}
.layui-layer-iconext.layui-layer-imgnext {
  position: fixed;
  right: 50;
}

/* ===================== 整体面板 ===================== */
/* vue盒子 */
.vue-box {
  /* padding-bottom: 20px; */
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #eee;
}

/* 内容-面板 */
.c-panel {
  margin: 1em 1em;
  padding: 1em 1.5em;
  background-color: #fff;
  color: #333; /* box-shadow: 0 0 5px #eee; */
}
.c-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 2em;
  margin-bottom: 3px;
}
.c-title span {
  font-weight: 400;
  font-size: 0.85em;
  padding-left: 1em;
  color: #888;
}

/* ===================== 表单相关 ===================== */
.c-panel .el-form {
  padding-top: 10px;
  padding-bottom: 5px;
}
.c-panel .el-form-item {
  min-width: 278px;
}
.c-panel .el-form-item__label,
.c-panel .c-label {
  width: 100px;
}
.c-panel .c-label {
  display: inline-block;
}
.c-panel .el-form .el-input {
  width: 178px;
}
.c-remark {
  color: #888;
  margin-left: 0.5em;
  font-size: 0.9em;
}

/* 标签 */
.c-panel .c-tag {
  padding: 0px 15px;
  height: 22px;
  line-height: 22px;
  border-radius: 0px;
  border: 0px;
}
/* 复选框 */
.c-panel .el-checkbox,
.c-panel .el-radio {
  margin-right: 20px;
}
/* 禁用input的样式 */
.c-panel .el-input.is-disabled .el-input__inner {
  color: #999;
}

/* 表格的表头颜色深一点 */
.c-panel .el-table__header tr th {
  background-color: #f5f5f5;
}

/* 调整圆角大小: 输入框、文本域、按钮、 */
.c-panel .el-input__inner,
.c-panel .el-textarea__inner,
.c-panel .el-button {
  border-radius: 2px !important;
}

/* 单选button,圆角限制2px */
.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 2px 0 0 2px !important;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 2px 2px 0 !important;
}

/* 单选按钮, 文字版 */
.s-radio-text {
}
.s-radio-text .el-radio__input {
  display: none;
}
.s-radio-text .el-radio__input.is-checked + .el-radio__label {
  font-weight: 700;
}
.s-radio-text .el-radio__label {
  padding-left: 0px;
}
.s-radio-text .el-radio__label:hover {
  text-decoration: underline;
}
.s-radio-text .hover-line:hover {
  text-decoration: underline;
  cursor: pointer;
}
.s-radio-text .el-form-item__content {
  position: relative;
  top: -2px;
}

/* 表格里操作按钮的样式调整 */
.c-btn {
  padding: 4px 6px;
  font-size: 12px !important;
  border-radius: 1px;
}
.c-btn.el-button--primary {
  background-color: #3296fa;
}
.c-btn.el-button--primary:hover {
  background-color: #067cf3;
  border-color: #067cf3;
}
.c-btn.el-button--danger {
  background-color: #ca4242;
}
.c-btn.el-button--danger:hover {
  background-color: #a00c0c;
  border-color: #a00c0c;
}
.c-btn.el-button--success:hover {
  background-color: #2b9939;
  border-color: #2b9939;
}

/* 分页盒子调整一下间距 */
.page-box {
  padding: 2em 0 1em 0;
}

/* ===================== 一些特殊元素 ===================== */

/* 流体表单 */
.cj-form.vue-box {
  padding-bottom: 0px;
  height: 100vh;
  background-color: #fff;
}
.cj-form .c-panel {
  box-shadow: 0 0 0;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 2.5em;
  padding-bottom: 0px;
}
.cj-form .c-panel .el-form .el-input {
  width: 100%;
}

/* 没有内边距的dialog */
.full-dialog .el-dialog__body {
  padding: 0px;
}
.full-h-dialog .el-dialog__header {
  padding: 0px;
}
/* .full-dialog .el-dialog__header{padding: 0px;} */

.iframe-view-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.iframe-view {
  width: 100%;
  height: 100%;
  border: 0px;
  background-color: #eee;
}

/* ===================== 表单相关 - 旧方案 ===================== */

/* 内容-item */
.c-item {
  min-width: 280px;
  min-height: 32px;
  line-height: 32px;
  padding-right: 20px;
  display: inline-block;
  margin: 0.5em 0;
}
.c-item.br {
  display: block;
}
/* label样式 */
.c-item .c-label {
  width: 5em;
  color: #333;
  display: inline-block;
  text-align: right;
}
/* input宽度等样式调整 */
.c-item .el-input {
  width: 200px;
}
/* 禁用input的样式 */
.c-item .el-input.is-disabled .el-input__inner {
  color: #999;
}
/* 链接 行高设置 */
.c-item .el-link {
  line-height: 1.6em;
}

/* ===================== 自定义一下滚动条 ===================== */
/*滚动条的宽度*/
.vue-box::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
.vue-box::-webkit-scrollbar-track {
  width: 6px;
  background-color: #f1f1f1;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条的设置*/
.vue-box::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/
/* .vue-box::-webkit-scrollbar-thumb:hover {background-color:#fff;} */
</style>
