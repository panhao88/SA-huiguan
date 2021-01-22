<template>
  <div>
    <el-card>
      <div>
        <el-button size="mini" type="primary" @click="dialogFormVisible = true"
          >添加到访信息</el-button
        >
      </div>
    </el-card>
    <el-card>
      <el-table :data="arrivelist" style="width: 100%" border align="center">
        <el-table-column
          label="ID"
          width="60"
          prop="id"
          align="center"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="cid"
          label="客户ID"
          align="center"
          width="70"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="createAc"
          label="邀约师"
          width="100"
          align="center"
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="predictAt"
          label="预计到访时间"
           width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="practicalAt"
          label="实际到访时间 "
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="campus"
          label="到访校区"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="reception"
          label="校区接待人"
          width="160"
          align="center"
        ></el-table-column>
        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          fixed="right"
          width="160"
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
      <!-- 新增到访 -->
      <el-dialog
        top="5vh"
        title="新增到访信息"
        :visible.sync="dialogFormVisible"
        width="30%"
        :append-to-body="true"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item
            label="预计到访时间"
            :label-width="formLabelWidth"
            prop="predictAt"
          >
            <el-date-picker
              v-model="rulegoto.predictAt"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="到访校区"
            :label-width="formLabelWidth"
            prop="campus"
          >
            <el-select v-model="rulegoto.campus" placeholder="请选择">
              <el-option
                v-for="item in campuslistL"
                :key="item.id"
                :label="item.shortName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="校区接待人"
            :label-width="formLabelWidth"
            prop="reception"
          >
            <el-select v-model="rulegoto.reception" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
      <!-- 编辑到访 -->
      <el-dialog
        title="编辑到访"
        :visible.sync="dialogForm"
        width="30%"
        :append-to-body="true"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item
            label="实际到访时间"
            :label-width="formLabelWidth"
            prop="practicalAt"
          >
            <el-date-picker
              v-model="ruleForm.practicalAt"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="到访校区"
            :label-width="formLabelWidth"
            prop="campus"
          >
             <el-select v-model="ruleForm.campus" placeholder="请选择">
              <el-option
                v-for="item in campuslistL"
                :key="item.id"
                :label="item.shortName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="校区接待人"
            :label-width="formLabelWidth"
            prop="reception"
          >
            <el-select v-model="ruleForm.reception" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
const userModule = createNamespacedHelpers("arrive");
const { mapState: userState, mapActions: userActions } = userModule;
const campus = createNamespacedHelpers("customer");
const { mapState: usercampus, mapActions: useActions } = campus;
export default {
  name: "",
  props: {
    ids: {
      type: Number,
    },
  },
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
      options: [
        {
          id: 0,
          name: "否",
        },
        {
          id: 1,
          name: "是",
        },
      ],
      //新增
      rulegoto: {
        predictAt: "",
        campus: "",
        reception: "",
      },
      //   编辑
      ruleForm: {
        practicalAt: "",
        campus: "",
        reception: "",
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
        //     content: [
        //       {
        //         required: true,
        //         message: "跟单内容不能为空",
        //         trigger: "blur",
        //       },
        //     ],
        //     termination: [
        //       {
        //         required: true,
        //         message: "跟单内容不能为空",
        //         trigger: "blur",
        //       },
        //     ],
        //     lastAt: [
        //       {
        //         required: true,
        //         message: "跟单内容不能为空",
        //         trigger: "blur",
        //       },
        //     ],
      },
      formLabelWidth: "110px",
    };
  },
  methods: {
    ...userActions(["getarrive", "addarrive", "detelearrive", "updatearrive"]),
    ...useActions(["getcampus"]),
    //编辑
    handleEdit(index, row) {
      this.dialogForm = true;
      this.id = row.id;
      this.ruleForm.practicalAt = row.practicalAt;
      this.ruleForm.campus = row.campus;
      this.ruleForm.reception = row.reception;
    },
    //确认编辑
    affirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.updatearrive({
            id: this.id,
            cid: this.ids,
            practicalAt:this.ruleForm.practicalAt,
            campus:this.ruleForm.campus,
            reception:this.ruleForm.reception,
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
          this.detelearrive({
            id: row.id,
            cid:this.ids,
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
          this.addarrive({
            cid: this.ids,
            predictAt: this.rulegoto.predictAt,
            campus: this.rulegoto.campus,
            reception: this.rulegoto.reception,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          this.rulegoto = {}
        } else {
          return false;
        }
      });
    },
    //分页每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.getarrive({
        cid: this.ids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getarrive({
        cid: this.ids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
  },
  mounted() {
    this.getarrive({
      cid: this.ids,
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //校区
    this.getcampus({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["arrivelist", "totalRow"]),
    ...usercampus(["campuslistL"]),
  },
};
</script>

<style scoped lang='scss'>
</style>