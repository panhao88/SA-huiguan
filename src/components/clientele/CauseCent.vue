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
            >新增事业中心</el-button
          >
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table :data="causeCentrelist" style="width: 100%" border>
        <el-table-column label="ID" prop="id" align="center" width="200">
        </el-table-column>
        <el-table-column label="名称" prop="name" align="center">
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
          :total="totalRow"
        ></el-pagination>
      </div>
      <!-- 编辑 -->
      <el-dialog
        title="编辑事业中心"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
        width="30%"
      >
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="affirm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增 -->
      <el-dialog
        title="新增事业中心"
        :visible.sync="dialogForm"
        :modal-append-to-body="false"
        width="30%"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("causeCentre");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      query: "", //输入框
      dialogForm: false,
      dialogTableVisible: false,
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      id: "", //编辑id
      formLabelWidth: "80px",
      ruleForm: {
        name: "",
      },
      form: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...userActions([
      "getcauseCentre",
      "add",
      "delcauseCentre",
      "updatecauseCentre",
    ]),
    // 搜索
    search_se() {},
    //回车搜索
    keydowm() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcauseCentre({
        pageNo: this.pagenum,
        pageSize: val,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getcauseCentre({
        pageNo: val,
        pageSize: this.pagesize,
      });
    },
    //编辑
    handleEdit(index, row) {
      this.id = row.id;
      this.form.name = row.name;
      this.dialogTableVisible = true;
    },
    // 确认编辑
    affirm() {
      this.dialogTableVisible = false;
      this.updatecauseCentre({
        id: this.id,
        name: this.form.name,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delcauseCentre({
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
    //确认新增
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add({
            name: this.ruleForm.name,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          this.ruleForm.name = "";
          this.dialogForm = false;
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getcauseCentre({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["totalRow", "causeCentrelist"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table td, .el-table th {
    padding: 6px 0;
}
</style>