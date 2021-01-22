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
          <el-button
            size="mini"
            type="primary"
            @click="dialogFormVisible = true"
            >添加客户类型</el-button
          >
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="customerTyplist"
        style="width: 100%"
        border
        align="center"
      >
        <el-table-column
          label="ID"
          width="100"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="分类"
          align="center"
        ></el-table-column>
        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
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
          :current-page="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 添加客户类型 -->
      <el-dialog
        title="添加客户类型"
        :visible.sync="dialogFormVisible"
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
            prop="describe"
          >
            <el-input
              v-model="rulegoto.describe"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth" prop="state">
            <el-select v-model="rulegoto.state" placeholder="请选择">
              <el-option
                v-for="item in list"
                :key="item.id"
                :value="item.id"
                :label="item.state"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑客户类型 -->
      <el-dialog
        title="编辑客户类型"
        :visible.sync="dialogForm"
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
            prop="describe"
          >
            <el-input
              v-model="ruleForm.describe"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择" >
              <el-option
                v-for="item in list"
                :key="item.id"
                :value="item.id"
                :label="item.state"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="affirm('ruleForm')"
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
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      query: "",
      dialogFormVisible: false,
      dialogForm: false,
      id: "",
      rulegoto: {
        name: "",
        describe: "",
        state: "",
      },
      ruleForm: {
        name: "",
        describe: "",
        state: "",
      },
      list:[
        {
          state:"邀约",
          id:0
        },
        {
          state:"财务",
          id:1
        }
      ],
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        describe: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "分类不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "70px",
    };
  },
  methods: {
    ...userActions(["getcustomerType","addcustomerType","detelecustomerType","updatecustomerType"]),
    //编辑
    handleEdit(index, row) {
      this.dialogForm = true;
      this.id = row.id;
      this.ruleForm.name = row.name;
      this.ruleForm.describe = row.describe;
      this.ruleForm.state = row.state;
    },
    //确认编辑
    affirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.updatecustomerType({
            id: this.id,
            name: this.ruleForm.name,
            describe: this.ruleForm.describe,
            state: this.ruleForm.state,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
        } else {
          return false;
        }
      });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.detelecustomerType({
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
    // 添加
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.addcustomerType({
            name: this.rulegoto.name,
            describe: this.rulegoto.describe,
            state: this.rulegoto.state,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          this.rulegoto = {};
        } else {
          return false;
        }
      });
    },
    //分页每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.getcustomerType({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getcustomerType({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    // 搜索
    search_se() {},
    //回车搜索
    keydowm() {},
   
  },
  mounted() {
    this.getcustomerType({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["total", "customerTyplist"]),
  },
};
</script>

<style scoped lang='scss'>
</style>