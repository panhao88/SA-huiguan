<template>
  <div>
    <el-card>
      <div>
        <el-button size="mini" type="primary" @click="dialogFormVisible = true"
          >添加跟单</el-button
        >
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="merchandislist"
        style="width: 100%"
        border
        align="center"
      >
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
          prop="createAt"
          label="跟单时间"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          width="400"
          label="跟单内容"
          align="center"
          prop="content"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="createAc"
          label="跟单人"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastAt"
          label="下次跟单时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="termination"
          label="终止跟单"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="terminationAt"
          label="终止时间"
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
          :total="totalRowg"
        ></el-pagination>
      </div>
      <!-- 新增跟单 -->
      <el-dialog
        top="5vh"
        title="新增跟单"
        :visible.sync="dialogFormVisible"
        width="30%"
        :append-to-body="true"
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item
            label="跟单终止"
            :label-width="formLabelWidth"
            prop="termination"
          >
            <el-switch v-model="rulegoto.termination"> </el-switch>
          </el-form-item>
          <el-form-item
            label="跟单内容"
            :label-width="formLabelWidth"
            prop="content"
          >
            <el-input type="textarea" v-model="rulegoto.content"></el-input>
          </el-form-item>
          <el-form-item
            label="下次跟单时间"
            :label-width="formLabelWidth"
            prop="lastAt"
           if v-if="rulegoto.termination === false"
          >
            <el-date-picker
           
              v-model="rulegoto.lastAt"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="rulegoto.termination === true"
            label="终止时间"
            :label-width="formLabelWidth"
            prop="terminationAt"
          >
            <el-date-picker
              v-model="rulegoto.terminationAt"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("documentary");
const { mapState: userState, mapActions: userActions } = userModule;
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
      value2: false,
      currentPage4: 1, //当前页数
      pagesize: 5, //一页多少条
      pagenum: 1, //当前页数
      query: "",
      dialogFormVisible: false,
      dialogForm: false,
      id: "",
      rulegoto: {
        content: "",
        termination: false,
        lastAt: "",
        terminationAt: "",
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
        content: [
          {
            required: true,
            message: "跟单内容不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "110px",
    };
  },
  methods: {
    ...userActions([
      "getmerchandis",
      "addmerchandis",
      "detelemerchandis",
    ]),
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.detelemerchandis({
            id: row.id,
            cid: this.ids,
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
          if(this.rulegoto.termination === false){
            this.rulegoto.termination = 0
          }else if(this.rulegoto.termination === true){
             this.rulegoto.termination = 1
          }
          this.addmerchandis({
            cid: this.ids,
            content: this.rulegoto.content,
            termination: this.rulegoto.termination,
            lastAt: this.rulegoto.lastAt,
            terminationAt: this.rulegoto.terminationAt,
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
      this.getmerchandis({
        cid: this.ids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getmerchandis({
        cid: this.ids,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
  },
  mounted() {
    this.getmerchandis({
      cid: this.ids,
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
   
  },
  watch: {},
  computed: {
    ...userState(["merchandislist", "totalRowg"]),
  },
};
</script>

<style scoped lang='scss'>
</style>