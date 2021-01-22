<template>
  <div>
    <div class="nav-left">
      <div class="nav-left-top" :title="title" @click="gohome">
        <img
          src="../../assets/bj.png"
          class="admin-logo"
          v-if="logo_url != null && logo_url != ''"
        />
        <span v-else style="margin-right: 25px" title="无logo时的占位"
          >&emsp;</span
        >
        <span class="nav-title" style="font-size: 1.05em">{{ title }}</span>
      </div>
      <div class="nav-left-bottom">
        <div class="menu-box-1">
          <div class="menu-box-2">
            <el-menu
              :default-active="$route.path"
              router
              unique-opened
              active-text-color="#15AAFB"
              :collapse="is_fold"
              class="el-menu-style-1"
              background-color="#304156"
              text-color="#fff"
              @select="selectMenu"
            >
              <template v-for="item in menu">
                <el-submenu
                  :index="item.id.toString()"
                  :key="item.actionKey"
                  v-if="item.children && item.children.length > 0"
                >
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.pname }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      :index="child.actionKey"
                      v-for="child in item.children"
                      :key="child.actionKey"
                    >
                      <i :class="child.icon"></i>
                      <span slot="title">{{ child.pname }}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item
                  :index="item.actionKey"
                  :key="item.actionKey"
                  v-else
                >
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.pname }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import unionBy from "lodash/unionBy";
export default {
  name: "NavLeft",
  components: {},
  props: {
    is_fold: {
      type: Boolean,
    },
  },
  data() {
    return {
      menu: [],
      logo_url: "../../assets/bj.png",
      title: "SA-慧冠后台",
    };
  },
  methods: {
    getdata() {
      this.$api
        .routing()
        .then((res) => {
          if (res.code === 200) {
            res.data.map((item) => {
              if (item.children && item.children.length > 0) {
                this.$set(item, "key", `${item.actionKey}`);
                item.children.map((child) => {
                  child.actionKey = `${item.actionKey}${child.actionKey}`;
                });
              }
              if (!item.children) {
                this.$set(item, "key", `${item.actionKey}`);
              }
            });
            this.menu = res.data;
          }else if(res.code === 403){
             this.$message.error(
         res.msg
        );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectMenu(index, indexPath) {},
    gohome(){
      // if(!window.location.href){
        this.$router.push('/')
      // }
    }
  },

  mounted() {
    this.getdata();
    console.log()
  },
  watch: {
    $route: {
      handler(val) {
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
  },
  computed: {
    tabList() {
      return this.$store.state.tabList;
    },
  },
};
</script>

<style scoped lang="scss">
.el-menu {
  height: calc(100vh) !important;
  left: 0px;
  z-index: 110;
  overflow: hidden;
}
// left头部
.nav-left-top {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 100;
  color: #fff;
  background-color: rgb(48, 65, 86);
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 10px;
}
/deep/.el-submenu__title {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
}
/deep/.el-submenu .el-menu-item {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}
</style>
