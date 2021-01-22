<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div style="white-space: nowrap">
            <el-button type="primary" @click="synchron" size="mini"
              ><i class="el-icon-more"></i> 权限同步</el-button
            >
            <el-button type="primary" @click="refresh" size="mini"
              ><i class="el-icon-refresh"></i> 刷新权限缓存</el-button
            >
            <el-button type="primary" size="mini" @click="dialog = true"
              ><i class="el-icon-plus"></i>新增权限菜单</el-button
            >
          </div>
        </el-card>
        <el-card>
          <!-- 权限同步，刷新权限缓存，新增权限菜单 -->
          <el-table
            :data="allmenu"
            style="width: 100%; margin-top: 20px"
            border
            align="center"
          >
            <el-table-column
              type="expand"
              label="#"
              prop="pname"
              width="40"
              align="center"
            >
              <template slot-scope="props">
                <div
                  style="border-top: 1px solid #f2f2f2"
                  v-if="props.row.children && props.row.children.length > 0"
                >
                  <div v-for="(item, index) in props.row.children" :key="index">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #f2f2f2;
                      "
                    >
                      <div style="padding: 5px">
                        <el-tag
                          style="width: 100%"
                          closable
                          @close="handleClose1(props.row, item)"
                          >{{ item.pname }}
                          <i
                            @click="handleEdit(index, item)"
                            class="iconfont icon-xiugai"
                            style="font-size: 12px; padding-left: 5px"
                          ></i
                        ></el-tag>
                      </div>
                      <div>
                        <div
                          v-for="(item1, index1) in item.children"
                          :key="index1"
                          style="display: flex; align-items: center"
                        >
                          <div style="padding: 5px">
                            <el-tag
                              style="width: 100%"
                              type="success"
                              closable
                              @close="handleClose2(props.row, item1)"
                              >{{ item1.pname }}
                              <i
                                class="iconfont icon-xiugai"
                                style="font-size: 12px; padding-right: 5px"
                              ></i
                            ></el-tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>暂无数据</div>
              </template>
            </el-table-column>
            <el-table-column
              label="编号"
              width="60"
              align="center"
              prop="id"
            ></el-table-column>
            <el-table-column
              label="菜单名称"
              width="160"
              align="center"
              prop="pname"
            ></el-table-column>
            <el-table-column
              label="请求地址"
              prop="actionKey"
              width="220"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="viewPath"
              label="页面路径"
              width="280"
              align="center"
            ></el-table-column>
            <el-table-column label="图标" align="center" width="80">
              <template slot-scope="gpropsp">
                <div>
                  <i :class="gpropsp.row.icon"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="描述"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <!-- 操纵 -->
            <el-table-column label="操作" align="center" width="280">
              <template slot-scope="scope">
                <el-tooltip content="编辑角色" placement="top">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    type="primary"
                  >
                    <span>修改</span>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="删除角色" placement="top">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <span>删除</span>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 编辑用户角色 -->
          <el-dialog
            title="修改权限菜单"
            :visible.sync="dialogFormVisible"
            width="40%"
            :modal-append-to-body="false"
          >
            <el-form :model="ruleForm" ref="ruleForm">
              <el-form-item
                label="权限名称"
                :label-width="formLabelWidth"
                prop="roleName"
              >
                <el-input v-model="ruleForm.permissions"></el-input>
              </el-form-item>
              <el-form-item label="请求地址" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="页面路径" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.Thepath"></el-input>
              </el-form-item>
              <el-form-item label="菜单图标" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.icon"></el-input>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in tolist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级菜单" :label-width="formLabelWidth">
                <el-cascader
                  style="width: 34%"
                  v-model="ruleForm.pid"
                  :options="allmenu"
                  :props="selectProps"
                  clearable
                  change-on-select
                  @change="augment"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="权限描述" :label-width="formLabelWidth">
                <textarea
                  class="comments"
                  v-model="ruleForm.vawenlue"
                  id="demo"
                >
                </textarea>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editor">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 新增权限菜单 -->
          <el-dialog
            title="新增权限菜单"
            :visible.sync="dialog"
            width="40%"
            :modal-append-to-body="false"
          >
            <el-form :model="validation" ref="validation" :rules="rules">
              <el-form-item
                label="权限名称"
                :label-width="formLabelWidth"
                prop="permissions"
              >
                <el-input v-model="validation.permissions"></el-input>
              </el-form-item>
              <el-form-item
                label="请求地址"
                :label-width="formLabelWidth"
                prop="address"
              >
                <el-input v-model="validation.address"></el-input>
              </el-form-item>
              <el-form-item
                label="页面路径"
                :label-width="formLabelWidth"
                prop="Thepath"
              >
                <el-input v-model="validation.Thepath"></el-input>
              </el-form-item>
              <el-form-item
                label="菜单图标"
                :label-width="formLabelWidth"
                prop="icon"
              >
                <el-input v-model="validation.icon"></el-input>
              </el-form-item>
              <el-form-item
                label="类型"
                :label-width="formLabelWidth"
                prop="type"
              >
                <el-select v-model="validation.type" placeholder="请选择">
                  <el-option
                    v-for="item in tolist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级菜单" :label-width="formLabelWidth">
                <!-- <el-input v-model="validation.pid"></el-input> -->
                <el-cascader
                  style="width: 34%"
                  v-model="validation.pid"
                  :options="allmenu"
                  :props="selectProps"
                  clearable
                  change-on-select
                  @change="augment"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="权限描述" :label-width="formLabelWidth">
                <textarea
                  class="comments"
                  v-model="validation.vawenlue"
                  id="demo"
                >
                </textarea>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog = false">取 消</el-button>
              <el-button type="primary" @click="confirm('validation')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
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
      dialogFormVisible: false, //编辑权限
      dialog: false, //新增权限菜单
      id: "", //编辑获取的id
      ruleForm: {
        permissions: "",
        address: "",
        Thepath: "",
        icon: "",
        type: "",
        pid: "",
        vawenlue: "",
      },
      selectProps: {
        value: "id",
        label: "pname",
        children: "children",
      },
      validation: {
        permissions: "",
        address: "",
        Thepath: "",
        icon: "",
        type: "",
        pid: "",
        vawenlue: "",
      },
      rules: {
        permissions: [
          {
            required: true,
            message: "权限名称不能为空",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "权限名称不能为空",
            trigger: "blur",
          },
        ],
      },
      tolist: [
        {
          id: 1,
          name: "菜单",
        },
        {
          id: 2,
          name: "按钮",
        },
      ],
      formLabelWidth: "80px",
      arr_list: [],
    };
  },
  methods: {
    ...userActions([
      "getAllMenu",
      "del",
      "getupdate",
      "synchronous",
      "Therefresh",
      "addpermissions",
    ]),
    // 删除权限菜单
    handleClose1(row, item) {
      let id = item.id;
      this.del({
        id: id,
      });
    },
    handleClose2(row, item1) {
      let id = item1.id;
      this.del({
        id: id,
      });
    },
    handleChange() {},
    //删除权限
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            id: id,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑权限
    handleEdit(index, row) {
      this.id = row.id;
      this.ruleForm.address = row.actionKey;
      this.ruleForm.permissions = row.pname;
      this.ruleForm.icon = row.icon;
      if (row.ptype === "1") {
        this.ruleForm.type = "菜单";
      } else if (row.ptype === "2") {
        this.ruleForm.type = "按钮";
      }
      this.ruleForm.vawenlue = row.remark;
      this.dialogFormVisible = true;
    },
    // 权限同步
    synchron() {
      this.synchronous();
    },
    //刷新权限同步
    refresh() {
      this.Therefresh();
    },
    //新增权限菜单
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog = false;
          let arr = this.arr_list.pop().toString();
          this.validation.pid = arr;
          console.log(this.validation.pid);
          this.addpermissions({
            pname: this.validation.permissions,
            actionKey: this.validation.address,
            viewPath: this.validation.Thepath,
            icon: this.validation.icon,
            ptype: this.validation.type,
            pid: this.validation.pid,
            remark: this.validation.vawenlue,
          });
          (this.validation.permissions = ""),
            (this.validation.address = ""),
            (this.validation.Thepath = ""),
            (this.validation.icon = ""),
            (this.validation.type = ""),
            (this.validation.pid = ""),
            (this.validation.vawenlue = "");
          this.arr_list = [];
        } else {
          return false;
        }
      });
    },
    augment(e) {
      this.arr_list = JSON.parse(JSON.stringify(e));
    },
    //确认编辑权限
    editor() {
      let tyoelist = "";
      if (this.ruleForm.type === "菜单") {
        tyoelist = "1";
      } else if (this.ruleForm.type === "按钮") {
        tyoelist = "2";
      }
      let arr = this.arr_list.pop().toString();
      this.ruleForm.pid = arr;
      this.getupdate({
        pname: this.ruleForm.permissions,
        actionKey: this.ruleForm.address,
        viewPath: this.ruleForm.Thepath,
        icon: this.ruleForm.icon,
        ptype: tyoelist,
        pid: this.ruleForm.pid,
        remark: this.ruleForm.vawenlue,
        id: this.id,
      });
      this.dialogFormVisible = false;
      this.arr_list = [];
    },
  },
  mounted() {
    this.getAllMenu();
  },
  watch: {},
  computed: {
    ...userState(["allmenu", "list"]),
  },
};
</script>

<style scoped lang='scss'>
.comments {
  width: 600px;
  height: 109px;
  border: 1px solid #dcdfe6;
  padding: 5px;
  color: #606266;
  font-size: inherit;
  outline: none;
}
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>