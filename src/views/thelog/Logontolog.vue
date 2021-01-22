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
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="loginLogList"
        style="width: 100%; margin-top: 20px"
        border
        align="center"
        show-overflow-tooltip
      >
        <el-table-column prop="ip" label="IP" width="200" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="登录人" align="center">
        </el-table-column>
        <el-table-column prop="loginAt" label="登录时间" align="center">
        </el-table-column>
        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          width="300"
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
      <div style="margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="talrow"
        ></el-pagination>
      </div>
      <div style="height: 20px"></div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("daily");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pageNo: 1, //当前页数
      pagesize: 10, //一夜多少条
      currentPage: 1, // 默认第几页
      query: "",
      multipleSelection: [],
      list: [],
    };
  },
  methods: {
    ...userActions(["getloginLogList", "getdeleteLoginLog"]),
    // 分页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getloginLogList({
        pageNo: this.pageNo,
        pageSize: this.pagesize,
      });
    },
    // 分页页数
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getloginLogList({
        pageNo: this.pageNo,
        pageSize: this.pagesize,
      });
    },
    // //删除单个
    handleDelete(index, row) {
      let createAt = row.loginAt;
      console.log(createAt);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getdeleteLoginLog({
            createAt: createAt,
            pageNo: this.pageNo,
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
    // 搜索
    search_se() {},
    //回车搜索
    keydowm() {},
  },
  mounted() {
    this.getloginLogList({
      pageNo: this.pageNo,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["loginLogList", "talrow"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>