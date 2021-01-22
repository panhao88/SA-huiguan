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
        :data="dailylist"
        style="width: 100%; margin-top: 20px"
        border
        align="center"
        show-overflow-tooltip
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="60px" align="center" type="selection">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="400" align="center">
        </el-table-column>
        <el-table-column prop="url" label="请求地址" width="280" align="center">
        </el-table-column>
        <el-table-column
          prop="issuccess"
          label="是否成功"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.issuccess === '1'">成功</el-tag>
            <el-tag type:danger v-if="scope.row.issuccess === '2'">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操纵类型" align="center" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 1">菜单</el-tag>
            <el-tag type="success" v-if="scope.row.type === 2">按钮</el-tag>
            <el-tag type="warning" v-if="scope.row.type === 3">数据源</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="210">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="请求时间"
          align="center"
          width="200"
        >
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
          :total="totalRow"
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
    ...userActions(["getsysLogList", "dellog"]),
    // 分页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getsysLogList({
        pageNo: this.pageNo,
        pageSize: this.pagesize,
      });
    },
    // 分页页数
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getsysLogList({
        pageNo: this.pageNo,
        pageSize: this.pagesize,
      });
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelection.map((item) => {
        this.list.push(item.id);
      });
    },
    //删除
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dellog({
            ids: id,
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
    //全选删除
    del() {
      if (this.list.length > 0) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dellog({
              ids: this.list.toString(),
              pageNo: this.pageNo,
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
    // 搜索
    search_se() {},
    //回车搜索
    keydowm() {},
  },
  mounted() {
    this.getsysLogList({
      pageNo: this.pageNo,
      pageSize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["dailylist", "totalRow"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table td, .el-table th {
    padding: 6px 0;
}
</style>