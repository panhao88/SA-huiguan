<template>
  <div>
    <el-card>
      <div>
        <div class="c-item">
          <el-input
            size="mini"
            v-model.trim="query"
            placeholder="请输入内容"
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
            >新增校区</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-search"
            @click="del"
            >删除</el-button
          >
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="campuslistL"
        style="width: 100%"
        border
        show-overflow-tooltip
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="60px" align="center" type="selection">
        </el-table-column>
        <el-table-column
          prop="code"
          label="校区编码"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="fullName" label="校区名称" align="center">
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="shortName" label="简称" align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="校区地址"
          width="200"
          align="center"
        >
        </el-table-column>
        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRowp"
        ></el-pagination>
      </div>
      <!-- 校区新增 -->
      <el-dialog
        title="添加角色列表"
        :visible.sync="dialogForm"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item
            label="校区编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input v-model="rulegoto.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="校区全称"
            :label-width="formLabelWidth"
            prop="fullName"
          >
            <el-input
              v-model="rulegoto.fullName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="校区简称"
            :label-width="formLabelWidth"
            prop="shortName"
          >
            <el-input
              v-model="rulegoto.shortName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 校区编辑 -->
      <el-dialog
        title="编辑校区"
        :visible.sync="dialogFormVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item
            label="校区编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input v-model="ruleForm.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="校区全称"
            :label-width="formLabelWidth"
            prop="fullName"
          >
            <el-input
              v-model="ruleForm.fullName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="校区简称"
            :label-width="formLabelWidth"
            prop="shortName"
          >
            <el-input
              v-model="ruleForm.shortName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("customer");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      dialogForm: false, //新增校区
      dialogFormVisible: false,
      query: "", //搜索框
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      rulegoto: {
        code: "",
        fullName: "",
        shortName: "",
      },
      ruleForm: {
        code: "",
        fullName: "",
        shortName: "",
      },
      multipleSelection: [],
      list: [],
      rules: {
        code: [
          {
            required: true,
            message: "校区编码不能为空",
            trigger: "blur",
          },
        ],
        fullName: [
          {
            required: true,
            message: "校区全称不能为空",
            trigger: "blur",
          },
        ],
        shortName: [
          {
            required: true,
            message: "校区简称不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "80px",
      id: "", //编辑id
    };
  },
  methods: {
    ...userActions(["getcampus", "updataupdate", "addcampus", "delcampus"]),
    //编辑校区
    handleEdit(index, row) {
      this.id = row.id;
      this.ruleForm.code = row.code;
      this.ruleForm.fullName = row.fullName;
      this.ruleForm.shortName = row.shortName;
      this.dialogFormVisible = true;
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelection.map((item) => {
        this.list.push(item.id);
      });
    },
    //删除校区
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delcampus({
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
    //删除多个
    del() {
      if (this.list.length > 0) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.delcampus({
              id: this.list.toString(),
              pageNo: this.pagenum,
              pageSize: this.pagesize,
            });
            this.list = [];
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message.error("你还没有选择要放入的内容");
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcampus({
        pageNo: this.pagenum,
        pageSize: val,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getcampus({
        pageNo: val,
        pageSize: this.pagesize,
      });
    },
    // 校区新增
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.addcampus({
            code: this.rulegoto.code,
            fullName: this.rulegoto.fullName,
            shortName: this.rulegoto.shortName,
          });
          (this.rulegoto.code = ""),
            (this.rulegoto.fullName = ""),
            (this.rulegoto.shortName = "");
        } else {
          return false;
        }
      });
    },
    //确认编辑校区
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.updataupdate({
            code: this.ruleForm.code,
            fullName: this.ruleForm.fullName,
            shortName: this.ruleForm.shortName,
            id: this.id,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
        } else {
          return false;
        }
      });
    },
    // 搜索
    search_se() {},
    //回车搜索
    keydowm() {},
  },
  mounted() {
    this.getcampus({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["campuslistL", "totalRowp"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table td, .el-table th {
    padding: 6px 0;
}
</style>