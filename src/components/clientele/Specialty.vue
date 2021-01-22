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
            >新增专业列表</el-button
          >
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="specialty"
        style="width: 100%"
        border
        show-overflow-tooltip
      >
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="synopsis" label="描述" align="center">
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
          :total="total"
        ></el-pagination>
      </div>
      <!-- 专业新增 -->
      <el-dialog
        title="添加专业"
        :visible.sync="dialogForm"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="rulegoto.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="synopsis"
          >
            <el-input
              v-model="rulegoto.synopsis"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 专业编辑 -->
      <el-dialog
        title="编辑专业"
        :visible.sync="dialogFormVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
           <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="synopsis"
          >
            <el-input
              v-model="ruleForm.synopsis"
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
      dialogForm: false, 
      dialogFormVisible: false,
      query: "", //搜索框
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      rulegoto: {
        name: "",
        synopsis: "",
      },
      ruleForm: {
         name: "",
        synopsis: "",
      },
      multipleSelection: [],
      list: [],
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        synopsis: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "80px",
      id: "", //编辑id
    };
  },
  methods: {
    ...userActions(["getspecialty","addspecialty","updatespecialty","detelespecialty"]),
    //编辑专业
    handleEdit(index, row) {
      this.id = row.id;
      this.ruleForm.name = row.name;
      this.ruleForm.synopsis = row.synopsis;
      this.dialogFormVisible = true;
    },
    //删除专业
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.detelespecialty({
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getspecialty({
        pageNo: this.pagenum,
        pageSize: val,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getspecialty({
        pageNo: val,
        pageSize: this.pagesize,
      });
    },
    // 专业新增
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.addspecialty({
            name:this.rulegoto.name,
            synopsis:this.rulegoto.synopsis,
              pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          (this.rulegoto.name = ""),
            (this.rulegoto.synopsis = "")
        } else {
          return false;
        }
      });
    },
    //确认编辑专业
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.updatespecialty({
              id:this.id,
            name:this.ruleForm.name,
            synopsis:this.ruleForm.synopsis,
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
    this.getspecialty({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["specialty", "total"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>