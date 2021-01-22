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
            >添加来源</el-button
          >
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table :data="souecelist" style="width: 100%" border align="center">
        <el-table-column
          label="ID"
          width="60"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="账户代码"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fullName"
          label="账户名称"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shortName"
          label="名称简写"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          align="center"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="beginAt"
          label="推广开始时间"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="endAt"
          label="推广结束时间"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="owner"
          label="推广人"
          align="center"
          width="100"
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
          :total="totalRow"
        ></el-pagination>
      </div>
      <!-- 添加来源 -->
      <el-dialog
        title="添加来源信息"
        :visible.sync="dialogFormVisible"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item
            label="账户代码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input v-model="rulegoto.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="推广账户全称"
            :label-width="formLabelWidth"
            prop="fullName"
          >
            <el-input
              v-model="rulegoto.fullName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="简称"
            :label-width="formLabelWidth"
            prop="shortName"
          >
            <el-input
              v-model="rulegoto.shortName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="describe"
          >
            <el-input
              type="textarea"
              v-model="rulegoto.describe"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="推广开始时间"
            :label-width="formLabelWidth"
            prop="beginAt"
          >
            <el-date-picker
              size="mini"
              v-model="rulegoto.beginAt"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="推广结束时间"
            :label-width="formLabelWidth"
            prop="endAt"
          >
            <el-date-picker
              size="mini"
              v-model="rulegoto.endAt"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="推广人"
            :label-width="formLabelWidth"
            prop="owner"
          >
            <el-input v-model="rulegoto.owner" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑来源 -->
      <el-dialog
        title="编辑来源信息"
        :visible.sync="dialogForm"
        width="30%"
        :modal-append-to-body="false"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item
            label="账户代码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input v-model="ruleForm.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="推广账户全称"
            :label-width="formLabelWidth"
            prop="fullName"
          >
            <el-input
              v-model="ruleForm.fullName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="简称"
            :label-width="formLabelWidth"
            prop="shortName"
          >
            <el-input
              v-model="ruleForm.shortName"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="describe"
          >
            <el-input
              type="textarea"
              v-model="ruleForm.describe"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="推广开始时间"
            :label-width="formLabelWidth"
            prop="beginAt"
          >
            <el-date-picker
              size="mini"
              v-model="ruleForm.beginAt"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="推广结束时间"
            :label-width="formLabelWidth"
            prop="endAt"
          >
            <el-date-picker
              size="mini"
              v-model="ruleForm.endAt"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="推广人"
            :label-width="formLabelWidth"
            prop="owner"
          >
            <el-input v-model="ruleForm.owner" auto-complete="off"></el-input>
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
        code: "",
        fullName: "",
        shortName: "",
        describe: "",
        beginAt: "",
        endAt: "",
        owner: "",
      },
      ruleForm: {
        code: "",
        fullName: "",
        shortName: "",
        describe: "",
        beginAt: "",
        endAt: "",
        owner: "",
      },
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
        code: [
          {
            required: true,
            message: "账户代码不能为空",
            trigger: "blur",
          },
        ],
        fullName: [
          {
            required: true,
            message: "推广账户全称不能为空",
            trigger: "blur",
          },
        ],
        shortName: [
          {
            required: true,
            message: "简称不能为空",
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
        beginAt: [
          {
            required: true,
            message: "推广开始时间不能为空",
            trigger: "blur",
          },
        ],
        endAt: [
          {
            required: true,
            message: "推广结束时间不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...userActions(["getsource", "addsource", "updatesource", "deletesource"]),
    //编辑
    handleEdit(index, row) {
      this.id = row.id;
      this.ruleForm.code = row.code;
      this.ruleForm.fullName = row.fullName;
      this.ruleForm.shortName = row.shortName;
      this.ruleForm.describe = row.describe;
      this.ruleForm.beginAt = row.beginAt;
      this.ruleForm.endAt = row.endAt;
      this.ruleForm.owner = row.owner;
      this.dialogForm = true;
    },
    //确认编辑
    affirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.updatesource({
            id: this.id,
            code: this.ruleForm.code,
            fullName: this.ruleForm.fullName,
            shortName: this.ruleForm.shortName,
            describe: this.ruleForm.describe,
            beginAt: this.ruleForm.beginAt,
            endAt: this.ruleForm.endAt,
            owner: this.ruleForm.owner,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          this.ruleForm = {};
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
          this.deletesource({
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
          this.addsource({
            code: this.rulegoto.code,
            fullName: this.rulegoto.fullName,
            shortName: this.rulegoto.shortName,
            describe: this.rulegoto.describe,
            beginAt: this.rulegoto.beginAt,
            endAt: this.rulegoto.endAt,
            owner: this.rulegoto.owner,
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
      this.getsource({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getsource({
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
    this.getsource({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["souecelist", "totalRow"]),
  },
};
</script>

<style scoped lang='scss'>
</style>