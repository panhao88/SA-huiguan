<template>
    <el-container :class="is_fold ? 'fold' : ''">
      <el-aside>
        <nav-left :is_fold="is_fold" class="aside"></nav-left>
      </el-aside>
      <el-container class="nav-right">
        <el-header>
          <nav-header :is_fold="is_fold"> </nav-header>
        </el-header>
        <el-main>
          <tabs style="background: #fff"></tabs>
          <router-view style="background: #fff"></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import NavHeader from "../../components/navHeader/NavHeader";
import NavLeft from "../../components/navLeft/NavLeft";
import NavView from "./Nav";
import Tabs from "../../components/tabs/Tabs";
export default {
  name: "Content",
  components: {
    NavHeader,
    NavLeft,
    NavView,
    Tabs,
  },
  props: {},
  data() {
    return {
      is_fold: false,
      screenWidth: "",
      screenHeight: "",
    };
  },
  methods: {},
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        if (this.screenWidth < 800) {
          this.is_fold = true;
        }else if(this.screenWidth > 800){
          this.is_fold = false
        }
      })();
    };
  },
  filters: {},
  computed: {},
  watch: {},
};
</script>

<style scoped lang="scss">
.el-main {
  height: 100vh;
  padding: 10px;
}
.el-aside {
  height: 100vh;
  width: 0px !important;
}
.icon {
  font-size: 24px;
  color: #fff;
}
.el-header {
  border-bottom: #b3c0d1 !important;
  color: #fff;
  text-align: center;
  height: 40px !important;
  padding: 0px;
}

.headerNav[data-v-4a9fdd5e] {
  width: 100%;
  height: 40px;
  background: #c0c0c0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #2e5e85;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  white-space: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
</style>