<template>
  <div>
    <div class="container">
      <draggable v-model="tabList" class="drag" @update="change">
        <div
          v-for="(item, index) in tabList"
          :key="item.name"
          class="content"
          :class="{ active: activeName === item.name }"
          @click="handleClick(item, index)"
          @contextmenu="contextmenu"
        >
          <div class="box">
            <div class="circle"></div>
            <div class="name">{{ item.name }}</div>
            <div
              class="close"
              :class="[item.name == flag ? 'back':'']"
              @click="close"
              @mouseenter="enter(item.name)"
              @mouseleave="leave(item.name)"
            >
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div
      class="menus"
      v-if="showMenu"
      v-clickoutside="handleClickOutside"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div @click="closeOther">关闭其他</div>
      <div @click="closeLeft">关闭左侧</div>
      <div @click="closeRight">关闭右侧</div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "",
  props: {},
  data() {
    return {
      flag: "",
      activeName: "",
      top: 0,
      left: 0,
      showMenu: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    enter(name) {
        this.flag = name
    },
    leave(name) {
      this.flag = ""
    },
    ...mapMutations(["setTabList"]),
    handleClick(tab, index) {
      let route = this.$store.state.tabList.find(
        (item) => item.name === tab.name
      );
      this.activeName = tab.name;
      if (this.$route.meta.title !== tab.name) this.$router.push(route.url);
    },
    change(e) {
      e.preventDefault();
    },
    contextmenu(e) {
      e.preventDefault();
      this.showMenu = true;
      this.left = e.pageX;
      this.top = e.pageY;
    },
    handleClickOutside() {
      this.showMenu = false;
    },
    close(e) {
      e.stopPropagation();
      localStorage.tabList = [];
      if (this.tabList.length === 1 && this.tabList[0].name !== "首页") {
        let arr = [
          {
            name: "首页",
            url: "/",
          },
        ];
        this.setTabList(arr);
        localStorage.setItem("tabList", JSON.stringify(arr));
        this.$router.push("/");
      }
      let arr = this.tabList.filter(
        (item) => item.name !== this.$route.meta.title
      );
      let index = this.tabList.findIndex(
        (item) => item.name == this.$route.meta.title
      );
      if (this.tabList.length > 1) {
        if (index === this.tabList.length - 1) {
          let url = this.tabList[index - 1].url;
          this.$router.push(url);
        } else {
          let url = this.tabList[index + 1].url;
          this.$router.push(url);
        }
        this.setTabList(arr);
        localStorage.setItem("tabList", JSON.stringify(arr));
      }
    },
    closeOther() {
      localStorage.tabList = [];
      let arr = this.tabList.filter(
        (item) => item.name === this.$route.meta.title
      );
      this.setTabList(arr);
      localStorage.setItem("tabList", JSON.stringify(arr));
      this.showMenu = false;
    },
    closeLeft() {
      localStorage.tabList = [];
      let index = this.tabList.findIndex(
        (item) => item.name == this.$route.meta.title
      );
      if (index === 0) {
        this.$message.error("已经是第一个啦");
        this.showMenu = false;
      } else {
        let arr = this.tabList.filter((item, idx) => idx >= index);
        this.setTabList(arr);
        this.showMenu = false;
        localStorage.setItem("tabList", JSON.stringify(arr));
      }
    },
    closeRight() {
      localStorage.tabList = [];
      let index = this.tabList.findIndex(
        (item) => item.name == this.$route.meta.title
      );
      if (index === this.tabList.length - 1) {
        this.$message.error("已经是最后一个啦");
        this.showMenu = false;
      } else {
        let arr = this.tabList.filter((item, idx) => idx <= index);
        this.setTabList(arr);
        this.showMenu = false;
        localStorage.setItem("tabList", JSON.stringify(arr));
      }
    },
  },
  directives: {
    Clickoutside,
  },
  mounted() {
    this.activeName = this.$route.meta.title;
  },
  computed: {
    tabList: {
      get() {
        return this.$store.state.tabList;
      },
      set(val) {
        localStorage.tabList = [];
        localStorage.setItem("tabList", JSON.stringify(val));
        this.setTabList(val);
      },
    },
  },
  watch: {
    $route(val) {
      this.activeName = val.meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #eee;
  border: 1px solid #ddd;
  .drag {
    display: flex;
  }
  .content {
    background: #fff;
    border-right: 1px solid gainsboro;
    font-size: 12px;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    .box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .circle {
        height: 8px;
        width: 8px;
        background: gray;
        border-radius: 50%;
        margin-right: 8px;
      }
      .close {
        padding: 3px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        margin-left: 8px;
      }
    }
  }
  .active {
    color: #409eff;
  }
  .pd {
    padding-right: 10px;
  }
}
.menus {
  position: absolute;
  background: #fff;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  color: #333;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px;
  div {
    padding: 7px 5px;
  }
}
.back {
  background: red;
  color: #fff;
}
</style>
