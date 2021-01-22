<template>
  <div>
    <el-card>
      <el-button type="primary" size="mini" @click="dialogForm = true"
        >新增联系人</el-button
      >
    </el-card>
    <el-card>
      <el-table
        :data="contacts"
        style="width: 100%; margin-top: 20px"
        border
        align="center"
        show-overflow-tooltip
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="80"
          align="center"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          width="50"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="center"
          width="50"
          fixed="left"
        >
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信号"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="qq" label="QQ号" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="居住地址"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          align="center"
          width="260"
        >
        </el-table-column>
        <el-table-column prop="job" label="职务" align="center" width="150">
        </el-table-column>
        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          width="130"
          fixed="right"
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
      <!-- 新增联系人 -->
      <el-dialog
        title="新增联系人"
        :visible.sync="dialogForm"
        width="30%"
        append-to-body
      >
        <el-form :model="rulegoto" :rules="rules" ref="rulegoto">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="rulegoto.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio-group v-model="rulegoto.sex" >
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="rulegoto.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="rulegoto.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="微信号"
            :label-width="formLabelWidth"
            prop="wechat"
          >
            <el-input v-model="rulegoto.wechat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码" :label-width="formLabelWidth" prop="qq">
            <el-input v-model="rulegoto.qq" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="居住地址"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input v-model="rulegoto.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号码"
            :label-width="formLabelWidth"
            prop="idCard"
          >
            <el-input v-model="rulegoto.idCard" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth" prop="job">
            <el-input v-model="rulegoto.job" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="add('rulegoto')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 联系人编辑 -->
      <el-dialog
        title="编辑联系人"
        :visible.sync="dialogFormVisible"
        width="30%"
        append-to-body
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <!-- <el-input v-model="rulegoto.sex" auto-complete="off"></el-input> -->
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="ruleForm.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="微信号"
            :label-width="formLabelWidth"
            prop="wechat"
          >
            <el-input v-model="ruleForm.wechat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码" :label-width="formLabelWidth" prop="qq">
            <el-input v-model="ruleForm.qq" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="居住地址"
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input v-model="ruleForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号码"
            :label-width="formLabelWidth"
            prop="idCard"
          >
            <el-input v-model="ruleForm.idCard" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth" prop="job">
            <el-input v-model="ruleForm.job" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update('ruleForm')">确 定</el-button>
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
  props: {
    ids: {
      type: Number,
    },
  },
  components: {},
  data() {
    return {
      cid: "",
      outerVisible: false,
      dialogForm: false,
      dialogFormVisible: false,
      id:'', //客户编辑id
      rulegoto: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        wechat: "",
        qq: "",
        address: "",
        idCard: "",
        job: "",
      },
      ruleForm: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        wechat: "",
        qq: "",
        address: "",
        idCard: "",
        job: "",
      },
      formLabelWidth: "90px",
      rules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
         sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "年龄不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur",
          },
           {
            validator: function (rule, value, callback) {
              var MobileRegex = /^1[0-9]{10}$/;
              if (!MobileRegex.test(value)) {
                callback(new Error("手机号码格式不正确！"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...userActions([
      "addcustomerContact",
      "getcontacts",
      "detelecustomerContact",
      "updatecustomerContact"
    ]),
    //联系人编辑
    handleEdit(index, row) {
      this.id = row.id
      this.dialogFormVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.sex = row.sex;
      this.ruleForm.age = row.age;
      this.ruleForm.phone = row.phone;
      this.ruleForm.wechat = row.wechat;
      this.ruleForm.qq = row.qq;
      this.ruleForm.address = row.address;
      this.ruleForm.idCard = row.idCard;
      this.ruleForm.job = row.job;
    },
    //确认编辑
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          if(this.ruleForm.sex === "男"){
            this.ruleForm.sex = 1
          }else if(this.ruleForm.sex === "女"){
             this.ruleForm.sex = 0
          }
          this.updatecustomerContact({
            cid: this.ids,
            name: this.ruleForm.name,
            sex: this.ruleForm.sex,
            age: this.ruleForm.age,
            phone: this.ruleForm.phone,
            wechat: this.ruleForm.wechat,
            qq: this.ruleForm.qq,
            address: this.ruleForm.address,
            idCard: this.ruleForm.idCard,
            job: this.ruleForm.job,
             id:this.id,
          });
        } else {
          return false;
        }
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
          this.detelecustomerContact({
            id: row.id,
            cid:this.ids,
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
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addcustomerContact({
            cid: this.ids,
            name: this.rulegoto.name,
            sex: this.rulegoto.sex,
            age: this.rulegoto.age,
            phone: this.rulegoto.phone,
            wechat: this.rulegoto.wechat,
            qq: this.rulegoto.qq,
            address: this.rulegoto.address,
            idCard: this.rulegoto.idCard,
            job: this.rulegoto.job,
          });
          this.dialogForm = false;
          this.rulegoto = {};
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getcontacts({
      cid: this.ids,
    });
  },
  watch: {},
  computed: {
    ...userState(["contacts"]),
  },
};
</script>

<style scoped lang='scss'>
</style>