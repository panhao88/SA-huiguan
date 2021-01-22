<template>
  <div>
    <el-card>
      <div>
        <div class="c-item">
          <el-input
            size="mini"
            v-model.trim="query"
            placeholder="请输入角色名称"
            @keydown.enter.native="keydowm"
          ></el-input>
        </div>
        <div class="c-item" style="min-width: 0px">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="search_se"
            >查询</el-button
          >
          <el-button type="primary" @click="dialogForm = true" size="mini"
            ><i class="el-icon-plus"></i>添加角色</el-button
          >
        </div>
      </div>
      <div style="margin-top: 30px">
        <el-table :data="rolelist" style="width: 100%" border align="center">
          <el-table-column
            label="编号"
            width="60"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            width="400"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="info"
            label="责任描述"
            width="400"
            align="center"
          ></el-table-column>
          <!-- <el-table-column label="是否锁定" width="200" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.lock"
                @change="gotonge(scope.row)"
              ></el-switch>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="createAt"
            label="创建日期"
            align="center"
            width="300"
          ></el-table-column>
          <!-- 操纵 -->
          <el-table-column
            label="操作"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tooltip content="编辑角色" placement="top">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  type="primary"
                >
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除角色" placement="top">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="分配权限" placement="top">
                <el-button
                  size="mini"
                  type="warning"
                  @click="setting(scope.$index, scope.row)"
                >
                  <i class="el-icon-s-tools"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRow"
          ></el-pagination>
        </div>
      </div>
      <!-- 编辑角色列表 -->
      <el-dialog
        title="编辑角色列表"
        :visible.sync="dialogFormVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item
            label="角色名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="责任描述"
            :label-width="formLabelWidth"
            prop="info"
          >
            <el-input v-model="ruleForm.info" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="是否锁定"
            :label-width="formLabelWidth"
            prop="info"
          >
            <el-switch v-model="ruleForm.lock"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加角色 -->
      <el-dialog
        title="添加角色列表"
        :visible.sync="dialogForm"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item
            label="角色名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="rulegoto.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="责任描述"
            :label-width="formLabelWidth"
            prop="info"
          >
            <el-input v-model="rulegoto.info" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配权限 -->
      <el-dialog
        title="分配权限"
        :visible.sync="settingDialog"
        :show-close="false"
        width="50%"
        top="5vh"
        @close="closeSettingDialog"
        :modal-append-to-body="false"
      >
        <div class="el-dialog-div">
          <el-form>
            <div class="c-title">所有权限</div>
            <el-tree
              ref="tree"
              :data="dataList"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :default-checked-keys="selectList"
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :check-strictly="true"
              @node-click="node_click"
              @check="node_click"
            >
              <span class="custom-tree-node" slot-scope="s">
                <span
                  style="color: #2d8cf0"
                  v-if="s.data.is_show == undefined || s.data.is_show == true"
                  >{{ s.data.name }}</span
                >
                <span style="color: #999" v-if="s.data.is_show == false"
                  >{{ s.data.name }} (隐藏)</span
                >
                <span style="color: #999" v-if="s.data.info"
                  >&emsp;———— {{ s.data.info }}
                </span>
              </span>
            </el-tree>
          </el-form>
          <!-- ------- 底部按钮 ------- -->
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button size="mini" type="success" @click="checkedAll()"
                >全选</el-button
              >
              <el-button size="mini" type="primary" @click="ok()"
                >确定</el-button
              >
            </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      query: "", //搜索内容
      flag: "",
      dialogFormVisible: false, //编辑角色弹出框
      dialogForm: false, //添加弹出框
      settingDialog: false, //分配权限
      roleId: "",
      dataList: [], // 数据集合
      selectList: [], // 默认选中
      ywList: [], // 一维数组
      menuList: [],
      ruleForm: {
        name: "",
        info: "",
        lock: "",
      },
      rulegoto: {
        name: "",
        info: "",
      },
      id: "", //编辑角色id
      // 编辑验证
      rules: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur",
          },
        ],
        info: [
          {
            required: true,
            message: "角色描述不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    ...userActions(["role", "Modifythe", "delrole", "getadd", "getAssign"]),
    closeSettingDialog() {
      this.selectList = [];
    },
    // 分配权限
    setting(index, row) {
      this.roleId = row.id;
      this.$api
        .getMyPermission({ roleId: this.roleId })
        .then((res) => {
          if (res.state === "ok") {
            this.menuList = this.arrayToTree(res.data); // 一维转tree
            this.menuList = this.refMenuList(this.menuList); // 属性处理
            this.dataList = this.menuList; // 数据
            console.log(this.dataList, "dataList");
            this.ywList = this.treeToArray(this.dataList);
            this.selectList = res.auth_code; // 选中的列表
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.settingDialog = true;
    },
    // 确认分配
    setRoles() {
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      let rids = keys.join(",");
      let roleId = this.roleId;
      this.getAssign({
        roleId: roleId,
        peris: rids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
      this.settingDialog = false;
    },
    // // 保存
    ok() {
      let ids = "";
      this.$refs.tree.getCheckedKeys().forEach(function (ts) {
        if (ids != null && ids.length > 0) {
          ids += ",";
        }
        ids += ts;
      });
      this.getAssign({
        roleId: this.roleId,
        peris: ids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
      this.settingDialog = false;
    },
    // // 点击回调, 处理其子节点跟随父节点的选中
    node_click: function (node) {
      var is_select = this.$refs.tree.getCheckedKeys().indexOf(node.id) != -1; // 此节点现在是否被选中
      if (node.children) {
        node.children.forEach(
          function (item) {
            this.$refs.tree.setChecked(item.id, is_select);
            // 递归
            if (item.children) {
              this.node_click(item);
            }
          }.bind(this)
        );
      }
    },
    // 全选/ 取消全选
    checkedAll: function () {
      if (this.$refs.tree.getCheckedKeys().length != this.ywList.length) {
        this.$refs["tree"].setCheckedNodes(this.ywList);
      } else {
        this.$refs["tree"].setCheckedNodes([]);
      }
    },
    //编辑角色列表
    handleEdit(index, row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.info = row.info;
      this.ruleForm.lock = row.lock;
    },
    //编辑确认列表
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.lock === true) {
            this.flag = "0";
          } else if (this.ruleForm.lock === false) {
            this.flag = "1";
          }
          this.dialogFormVisible = false;
          this.Modifythe({
            name: this.ruleForm.name,
            info: this.ruleForm.info,
            id: this.id,
            lock: this.flag,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
        } else {
          return false;
        }
      });
    },
    // 添加角色
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.getadd({
            name: this.rulegoto.name,
            info: this.rulegoto.info,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          (this.rulegoto.name = ""), (this.rulegoto.info = "");
        } else {
          return false;
        }
      });
    },
    // 搜索角色
    search_se() {
      if (this.query === "") {
        this.$message.error("请输入查询内容");
      } else {
        this.role({
          name: this.query,
        });
      }
    },
    // 回车搜索
    keydowm() {
      this.role({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
        name: this.query,
      });
    },
    //删除角色列表
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delrole({
            id: row.id,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.role({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.role({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    // 将一维平面数组转换为 Tree 菜单 (根据其指定的parent_id添加到其父菜单的childList)
    arrayToTree: function (menu_list) {
      for (var i = 0; i < menu_list.length; i++) {
        var menu = menu_list[i];
        // 添加到其指定的父菜单的childList
        if (menu.parent_id) {
          var parent_menu = this.getMenuById(menu_list, menu.parent_id);
          if (parent_menu) {
            parent_menu.childList = parent_menu.childList || [];
            parent_menu.childList.push(menu);
            menu_list.splice(i, 1); // 从一维中删除
            i--;
          }
        }
      }
      return menu_list;
    },

    // 将 menu_list 处理一下
    refMenuList: function (menu_list) {
      for (var i = 0; i < menu_list.length; i++) {
        var menu = menu_list[i];
        // 有子项的递归处理
        if (menu.childList) {
          menu.children = menu.childList;
          this.refMenuList(menu.childList);
        }
      }
      return menu_list;
    },

    // 返回指定 index 的menu
    getMenuById: function (menuList, id) {
      for (var i = 0; i < menuList.length; i++) {
        var menu = menuList[i];
        if (menu.id + "" == id + "") {
          return menu;
        }
        // 如果是二级或多级
        if (menu.childList) {
          var menu2 = this.getMenuById(menu.childList, id);
          if (menu2 != null) {
            return menu2;
          }
        }
      }
      return null;
    },

    // 将 Tree 菜单 转换为 一维平面数组
    treeToArray: function (menu_list) {
      var arr = [];
      function fn(menu_list) {
        menu_list = menu_list || [];
        for (var i = 0; i < menu_list.length; i++) {
          var menu = menu_list[i];
          arr.push(menu);
          // 如果有子菜单
          if (menu.childList) {
            fn(menu.childList);
          }
        }
      }
      fn(menu_list);
      return arr;
    },
  },
  mounted() {
    this.role({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {
    query(val) {
      if (this.query === "") {
        this.role({
          pageNo: this.pagenum,
          pageSize: this.pagesize,
        });
      }
    },
  },
  computed: {
    ...userState(["rolelist", "totalRow", "allmenu"]),
  },
};
</script>

<style scoped lang='scss'>
.c-item {
  min-width: 270px;
  min-height: 32px;
  line-height: 32px;
  padding-right: 10px;
  display: inline-block;
  margin: 0.5em 0;
}
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
.el-dialog-div {
  height: 70vh;
  overflow: auto;
}
</style>