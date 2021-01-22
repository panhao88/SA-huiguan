<template>
  <div>
    <el-card>
      <div class="vue-box" style="display: none" :style="'display: block;'">
        <el-row :gutter="10">
          <el-col :lg="4" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div style="padding: 0px 12px; white-space: nowrap">ID:</div>
              <div>
                <el-input
                  size="mini"
                  v-model.trim="seek.idd"
                  placeholder="请输入ID"
                  @keydown.enter.native="keydowm"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :lg="4" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div style="padding: 0px 5px; white-space: nowrap">姓名:</div>
              <div>
                <el-input
                  size="mini"
                  v-model.trim="seek.name"
                  placeholder="请输入姓名"
                  @keydown.enter.native="keydowm"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :lg="4" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div style="padding: 0px 5px; white-space: nowrap">年龄:</div>
              <div>
                <el-input
                  size="mini"
                  v-model.trim="seek.age"
                  placeholder="请输入年龄"
                  @keydown.enter.native="keydowm"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :lg="4" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div style="padding: 0px 5px; white-space: nowrap">性别:</div>
              <div>
                <el-select
                  v-model="seek.sex"
                  placeholder="请输入性别"
                  size="mini"
                >
                  <el-option
                    v-for="item in sexlist"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :lg="8" :sm="24" :xs="24">
            <div class="sa-wnk">
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="search_se"
                  >搜索</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-circle-close"
                  @click="empty"
                  >清空输入框</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-arrow-down"
                  @click="unfold"
                  v-if="boxshow === false"
                  >更多搜索</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-arrow-up"
                  @click="shrink"
                  v-if="boxshow === true"
                  >更多搜索</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <div
          v-show="boxshow"
          style="border-top: 1px solid #ebeef5; margin-top: 10px"
        >
          <el-row :gutter="14">
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  qq:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.qq"
                    placeholder="请输入QQ"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  搜索词:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.searchTerms"
                    placeholder="请输入搜索词"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  手机:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.mobile"
                    placeholder="请输入手机"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  称谓:
                </div>
                <div>
                  <el-select
                    v-model="seek.appellation"
                    placeholder="请输入称谓"
                    size="mini"
                  >
                    <el-option
                      v-for="item in appellationlist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  微信:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.wechat"
                    placeholder="微信"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  客户类别:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.visitortype"
                    placeholder="请输入客户类别"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  访问网址:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.website"
                    placeholder="请输入初次访问网址"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  学校:
                </div>
                <div>
                  <el-select
                    v-model="seek.school"
                    placeholder="请输入学校"
                    size="mini"
                  >
                    <el-option
                      v-for="item in campuslistL"
                      :key="item.id"
                      :value="item.id"
                      :label="item.shortName"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  学历:
                </div>
                <div>
                  <el-select
                    v-model="seek.education"
                    placeholder="请输入学历"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in educationlist"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  毕业学校:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.graduatedSchool"
                    placeholder="请输入毕业学校"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  拟报专业:
                </div>
                <div>
                  <el-select
                    v-model="seek.proposedMajor"
                    placeholder="请输入拟报专业"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in specialty"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  来源:
                </div>
                <div>
                  <el-select
                    v-model="seek.source"
                    placeholder="请输入来源"
                    size="mini"
                  >
                    <el-option
                      v-for="item in souecelist"
                      :key="item.id"
                      :value="item.id"
                      :label="item.shortName"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  下次时间:
                </div>
                <div>
                  <el-date-picker
                    v-model="seek.lastAt"
                    type="datetime"
                    placeholder="请输入下次联系时间"
                    size="mini"
                    style="width: 178px"
                  >
                  </el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  客户类型:
                </div>
                <div>
                  <el-select
                    v-model="seek.customerType"
                    placeholder="请输入客户类型"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in customerTyplist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  备注:
                </div>
                <div>
                  <el-input
                    size="mini"
                    v-model.trim="seek.remarks"
                    placeholder="请输入备注"
                    @keydown.enter.native="keydowm"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  创建日期:
                </div>
                <div>
                  <el-date-picker
                    v-model="seek.createAt"
                    type="datetime"
                    placeholder="请输入创建日期"
                    size="mini"
                    style="width: 178px"
                  >
                  </el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  录入员:
                </div>
                <div>
                  <el-select
                    v-model="seek.createAc"
                    placeholder="请输入录入员"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in account"
                      :key="item.value"
                      :label="item.nickName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  业务员:
                </div>
                <div>
                  <el-select
                    v-model="seek.salesman"
                    placeholder="请输入业务员"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in account"
                      :key="item.value"
                      :label="item.nickName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  数据类型:
                </div>
                <div>
                  <el-select
                    v-model="seek.state"
                    placeholder="请输入数据类型"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in typelist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :lg="6" :sm="12" :xs="24">
              <div class="c-item">
                <div style="padding: 0px 5px; white-space: nowrap; width: 60px">
                  咨询方式:
                </div>
                <div>
                  <el-select
                    v-model="seek.advisory"
                    placeholder="请输入咨询方式"
                    size="mini"
                    style="width: 178px"
                  >
                    <el-option
                      v-for="item in advisory"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-button size="mini" type="primary" @click="dialogFormVisible = true"
        ><i class="el-icon-plus"></i> 添加客户</el-button
      >
      <el-button size="mini" type="primary" @click="shiftto"
        ><i class="el-icon-back"></i> 转入公海</el-button
      >
      <el-button size="mini" type="primary" @click="transfer"
        ><i class="el-icon-caret-right"></i> 客户转移</el-button
      >
      <el-button size="mini" type="danger" @click="del"
        ><i class="el-icon-error"></i> 删除选中</el-button
      >
    </el-card>
    <el-card>
      <el-table
        :data="list"
        style="width: 100%; margin-top: 20px"
        border
        align="center"
        show-overflow-tooltip
        @selection-change="handleSelectionChange"
        @row-dblclick="addContact"
      >
        <el-table-column
          width="40"
          fixed
          align="center"
          type="selection"
        ></el-table-column>
        <el-table-column
          prop="id"
          fixed
          label="ID"
          width="40"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          fixed
          label="姓名"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="customerType"
          label="客户类型"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="wechat"
          label="微信"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="qq"
          label="QQ"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="education"
          label="学历"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="school"
          label="学校"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="lastAt"
          label="下次联系时间"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="createAt"
          label="创建日期"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="createAc"
          label="录入员"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="salesman"
          label="业务员"
          align="center"
          width="80"
        ></el-table-column>
        <!-- 操纵 -->
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <!-- <el-tooltip content="查看详情" placement="top">
              <el-button
                size="mini"
               
                type="primary"
              >
                <i class="el-icon-view"></i>
              </el-button>
            </el-tooltip> -->
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
          :total="talRow"
        ></el-pagination>
      </div>
      <!-- 新增客户列表 -->
      <el-dialog
        title="新增客户列表"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
      >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item required>
            <el-col :span="8">
              <el-form-item
                label="姓名:"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input
                  v-model="ruleForm.name"
                  auto-complete="off"
                  size="mini"
                  style="width: 80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="手机:"
                :label-width="formLabelWidth"
                prop="mobile"
              >
                <el-input
                  v-model="ruleForm.mobile"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信:" :label-width="formLabelWidth">
                <el-input
                  v-model="ruleForm.wechat"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item label="QQ:" :label-width="formLabelWidth">
                <el-input
                  v-model="ruleForm.qq"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="年龄:"
                :label-width="formLabelWidth"
                prop="age"
              >
                <el-input
                  v-model="ruleForm.age"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-form-item
                label="称谓:"
                :label-width="formLabelWidth"
                prop="appellation"
              >
                <el-radio-group v-model="ruleForm.appellation">
                  <el-radio label="0">学生</el-radio>
                  <el-radio label="1">家长</el-radio>
                  <el-radio label="2">朋友</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="性别:"
                :label-width="formLabelWidth"
                prop="sex"
              >
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="0">女</el-radio>
                  <el-radio label="1">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item
                label="学历"
                :label-width="formLabelWidth"
                prop="education"
              >
                <el-select
                  v-model="ruleForm.education"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in educationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="来源"
                :label-width="formLabelWidth"
                prop="source"
              >
                <el-select
                  v-model="ruleForm.source"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in souecelist"
                    :key="item.id"
                    :value="item.shortName"
                    :label="item.shortName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="拟报专业"
                :label-width="formLabelWidth"
                prop="proposedMajor"
              >
                <el-select
                  v-model="ruleForm.proposedMajor"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in specialty"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item
                label="学校"
                :label-width="formLabelWidth"
                prop="school"
              >
                <el-select
                  v-model="ruleForm.school"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in campuslistL"
                    :key="item.id"
                    :value="item.id"
                    :label="item.shortName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="搜索词" :label-width="formLabelWidth">
                <el-input
                  v-model="ruleForm.searchTerms"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="毕业学校"
                :label-width="formLabelWidth"
                prop="graduatedSchool"
              >
                <el-input
                  v-model="ruleForm.graduatedSchool"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="24">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  v-model="ruleForm.remarks"
                  auto-complete="off"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 编辑客户列表 -->
      <el-dialog
        title="编辑客户列表"
        :visible.sync="dialogForm"
        :modal-append-to-body="false"
      >
        <el-form :model="verification" ref="verification" :rules="rules">
          <el-form-item required>
            <el-col :span="6">
              <el-form-item
                label="姓名:"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input
                  v-model="verification.name"
                  auto-complete="off"
                  size="mini"
                  style="width: 80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="手机:"
                :label-width="formLabelWidth"
                prop="mobile"
              >
                <el-input
                  v-model="verification.mobile"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="微信:" :label-width="formLabelWidth">
                <el-input
                  v-model="verification.wechat"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="QQ:" :label-width="formLabelWidth">
                <el-input
                  v-model="verification.qq"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-form-item
                label="称谓:"
                :label-width="formLabelWidth"
                prop="appellation"
              >
                <el-radio-group v-model="verification.appellation">
                  <el-radio label="学生">学生</el-radio>
                  <el-radio label="家长">家长</el-radio>
                  <el-radio label="朋友">朋友</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-form-item
                label="性别:"
                :label-width="formLabelWidth"
                prop="sex"
              >
                <el-radio-group v-model="verification.sex">
                  <el-radio label="女">女</el-radio>
                  <el-radio label="男">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-form-item label="搜索词" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  v-model="verification.searchTerms"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  v-model="verification.remarks"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item
                label="学历"
                :label-width="formLabelWidth"
                prop="education"
              >
                <el-select
                  v-model="verification.education"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in educationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="来源"
                :label-width="formLabelWidth"
                prop="source"
              >
                <el-select
                  v-model="verification.source"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in souecelist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.shortName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="拟报专业"
                :label-width="formLabelWidth"
                prop="proposedMajor"
              >
                <el-select
                  v-model="verification.proposedMajor"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in specialty"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item
                label="年龄:"
                :label-width="formLabelWidth"
                prop="age"
              >
                <el-input
                  v-model="verification.age"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学校"
                :label-width="formLabelWidth"
                prop="school"
              >
                <el-select
                  v-model="verification.school"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in campuslistL"
                    :key="item.id"
                    :value="item.id"
                    :label="item.shortName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item
                label="毕业学校"
                :label-width="formLabelWidth"
                prop="graduatedSchool"
              >
                <el-input
                  v-model="verification.graduatedSchool"
                  auto-complete="off"
                  style="width: 80%"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="compile('verification')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 客户转移 -->
      <el-dialog
        title="请选择业务员"
        :visible.sync="dialog"
        append-to-body
        width="30%"
      >
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth" label="业务员：">
            <el-select v-model="form.value" placeholder="请选择">
              <el-option
                v-for="item in account"
                :key="item.value"
                :label="item.nickName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="deteleadd">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看详情 -->
      <el-dialog
        title="客户信息"
        :visible.sync="Popup"
        append-to-body
        top="5vh"
        width="60%"
      >
        <div class="el-dialog-div">
          <el-tabs
            :value="String(activeName)"
            type="card"
            @tab-click="clickTab"
          >
            <el-tab-pane label="客户详情" name="0">
              <detailed
                v-if="activeName === 0"
                @next="next"
                :ids="ids"
              ></detailed>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="1">
              <contacts
                v-if="activeName === 1"
                @next="next"
                :ids="ids"
              ></contacts>
            </el-tab-pane>
            <el-tab-pane label="跟单管理" name="2">
              <document
                v-if="activeName === 2"
                @next="next"
                :ids="ids"
              ></document>
            </el-tab-pane>
            <el-tab-pane label="到访管理" name="3">
              <aurrive
                v-if="activeName === 3"
                @next="next"
                :ids="ids"
              ></aurrive>
            </el-tab-pane>
            <el-tab-pane label="操作记录" name="4">
              <manipulate
                v-if="activeName === 4"
                @next="next"
                :ids="ids"
              ></manipulate>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Aurrive from "../../components/custdetails/Aurrive";
import Manipulate from "../../components/custdetails/Manipulate";
import Detailed from "../../components/custdetails/Detailed";
import Contacts from "../../components/custdetails/Contacts";
import Document from "../../components/custdetails/Document";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("customer");
const { mapState: userState, mapActions: userActions } = userModule;
const listModule = createNamespacedHelpers("account");
const { mapState: listState, mapActions: listActions } = listModule;
export default {
  name: "",
  props: {},
  components: {
    Detailed, //详情信息
    Contacts, //联系人
    Document, //跟单
    Aurrive, //到访
    Manipulate, //操作
  },
  data() {
    return {
      sexlist: [
        {
          id: 1,
          name: "男",
        },
        {
          id: 0,
          name: "女",
        },
      ],
      appellationlist: [
        {
          id: 0,
          name: "学生",
        },
        {
          id: 1,
          name: "家长",
        },
        {
          id: 2,
          name: "朋友",
        },
      ],
      typelist: [
        {
          id: 0,
          name: "客户信息",
        },
        {
          id: 1,
          name: "公海数据",
        },
      ],
      seek: {
        idd: "",
        name: "",
        mobile: "",
        wechat: "",
        qq: "",
        appellation: "",
        sex: "",
        visitortype: "",
        age: "",
        searchTerms: "",
        website: "",
        school: "",
        education: "",
        graduatedSchool: "",
        proposedMajor: "",
        source: "",
        lastAt: "",
        customerType: "",
        remarks: "",
        createAt: "",
        createAc: "",
        salesman: "",
        state: "",
        advisory: "",
      },
      boxshow: false,
      form: {
        value: "",
      },
      dialog: false,
      multipleSelection: [],
      tolist: [],
      activeName: 0,
      query: "",
      dialogFormVisible: false,
      Popup: false,
      dialogForm: false,
      user: {}, //登录人信息
      userid: "", //登录人id
      currentPage4: 1, //当前页数
      pagesize: 10, //一页多少条
      pagenum: 1, //当前页数
      id: "",
      ids: "", //查看详情ids
      // 新增
      ruleForm: {
        name: "",
        mobile: "",
        wechat: "",
        qq: "",
        appellation: "",
        sex: "",
        age: "",
        searchTerms: "",
        website: "",
        school: "",
        education: "",
        graduatedSchool: "",
        proposedMajor: "",
        source: "",
        remarks: "",
        createAc: "",
      },
      // 编辑
      verification: {
        id: "",
        name: "",
        mobile: "",
        wechat: "",
        qq: "",
        appellation: "",
        sex: "1",
        age: "",
        searchTerms: "",
        website: "",
        school: "",
        education: "",
        graduatedSchool: "",
        proposedMajor: "",
        source: "",
        remarks: "",
        createAc: "",
      },
      rules: {
        website: [
          {
            required: true,
            message: "初次访问网址不能为空",
            trigger: "blur",
          },
        ],
        createAc: [
          {
            required: true,
            message: "录入员不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "手机不能为空",
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
        appellation: [
          {
            required: true,
            message: "称谓不能为空",
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
        school: [
          {
            required: true,
            message: "学校不能为空",
            trigger: "blur",
          },
        ],
        education: [
          {
            required: true,
            message: "学历不能为空",
            trigger: "blur",
          },
        ],
        graduatedSchool: [
          {
            required: true,
            message: "毕业学校不能为空",
            trigger: "blur",
          },
        ],
        proposedMajor: [
          {
            required: true,
            message: "拟报专业不能为空",
            trigger: "blur",
          },
        ],
        source: [
          {
            required: true,
            message: "来源不能为空",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    ...userActions([
      "getcustomer",
      "addcustomer",
      "getsource",
      "delcustomer",
      "updatecustomer",
      "delcustomer",
      "getdetails",
      "geteducation",
      "getspecialty",
      "getcampus",
      "getintoPublicSea",
      "gettransfer",
      "getcustomerType",
      "getadvisory",
    ]),
    ...listActions(["getaccount"]),
    // 全部删除
    del() {
      if (this.tolist.length > 0) {
        this.$confirm("此操作会将数据放入公海数据，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.delcustomer({
              id: this.tolist.toString(),
              pageNo: this.pagenum,
              pageSize: this.pagesize,
            });
            this.tolist = [];
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
    search_se() {
      this.getcustomer({
        id: this.seek.idd,
        name: this.seek.name,
        mobile: this.seek.mobile,
        wechat: this.seek.wechat,
        qq: this.seek.qq,
        appellation: this.seek.appellation,
        sex: this.seek.sex,
        visitortype: this.seek.visitortype,
        age: this.seek.age,
        searchTerms: this.seek.searchTerms,
        website: this.seek.website,
        school: this.seek.school,
        education: this.seek.education,
        graduatedSchool: this.seek.graduatedSchool,
        proposedMajor: this.seek.proposedMajor,
        source: this.seek.source,
        lastAt: this.seek.lastAt,
        customerType: this.seek.customerType,
        remarks: this.seek.remarks,
        createAt: this.seek.createAt,
        createAc: this.seek.createAc,
        salesman: this.seek.salesman,
        state: this.seek.state,
        advisory: this.seek.advisory,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //回车搜索
    keydowm() {
      this.getcustomer({
        id: this.seek.idd,
        name: this.seek.name,
        mobile: this.seek.mobile,
        wechat: this.seek.wechat,
        qq: this.seek.qq,
        appellation: this.seek.appellation,
        sex: this.seek.sex,
        visitortype: this.seek.visitortype,
        age: this.seek.age,
        searchTerms: this.seek.searchTerms,
        website: this.seek.website,
        school: this.seek.school,
        education: this.seek.education,
        graduatedSchool: this.seek.graduatedSchool,
        proposedMajor: this.seek.proposedMajor,
        source: this.seek.source,
        lastAt: this.seek.lastAt,
        customerType: this.seek.customerType,
        remarks: this.seek.remarks,
        createAt: this.seek.createAt,
        createAc: this.seek.createAc,
        salesman: this.seek.salesman,
        state: this.seek.state,
        advisory: this.seek.advisory,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    empty() {
      this.seek = {};
      this.getcustomer({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    unfold() {
      this.boxshow = true;
    },
    shrink() {
      this.boxshow = false;
    },

    //删除单个
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delcustomer({
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
    //编辑
    handleEdit(index, row) {
      console.log(row);
      this.id = row.id;
      this.dialogForm = true;
      this.verification.name = row.name;
      this.verification.mobile = row.mobile;
      this.verification.wechat = row.wechat;
      this.verification.qq = row.qq;
      this.verification.appellation = row.appellation;
      this.verification.sex = row.sex;
      this.verification.age = row.age;
      this.verification.searchTerms = row.searchTerms;
      this.verification.website = row.website;
      this.verification.school = row.school;
      this.verification.education = row.education;
      this.verification.graduatedSchool = row.graduatedSchool;
      this.verification.proposedMajor = row.proposedMajor;
      this.verification.source = row.source;
      this.verification.remarks = row.remarks;
    },
    next(data) {
      this.activeName += data;
    },
    clickTab(tab) {
      this.activeName = tab.index * 1;
    },
    // 确认编辑
    compile(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          if (this.verification.sex === "男") {
            this.verification.sex = 1;
          } else if (this.verification.sex === "女") {
            this.verification.sex = 0;
          }
          if (this.verification.appellation === "学生") {
            this.verification.appellation = 0;
          } else if (this.verification.appellation === "家长") {
            this.verification.appellation = 1;
          } else if (this.verification.appellation === "朋友") {
            this.verification.appellation = 2;
          }
          this.updatecustomer({
            id: this.id,
            name: this.verification.name,
            mobile: this.verification.mobile,
            wechat: this.verification.wechat,
            qq: this.verification.qq,
            appellation: this.verification.appellation,
            sex: this.verification.sex,
            age: this.verification.age,
            searchTerms: this.verification.searchTerms,
            website: this.verification.website,
            school: this.verification.school,
            education: this.verification.education,
            graduatedSchool: this.verification.graduatedSchool,
            proposedMajor: this.verification.proposedMajor,
            source: this.verification.source,
            remarks: this.verification.remarks,
            createAc: this.userid,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
        } else {
          return false;
        }
      });
    },
    //分页每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.getcustomer({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getcustomer({
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
    },
    // 全选
    handleSelectionChange(val) {
      let arr = [];
      this.multipleSelection = val;
      this.multipleSelection.map((item) => {
        arr.push(item.id);
      });
      this.tolist = arr;
    },
    goto() {
      this.noke = true;
      console.log(11);
    },
    go() {
      this.noke = false;
      console.log(22);
    },
    //转入公海
    shiftto() {
      if (this.tolist.length > 0) {
        this.$confirm("此操作会将数据放入公海数据，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getintoPublicSea({
              ids: this.tolist.toString(),
              pageNo: this.pagenum,
              pageSize: this.pagesize,
            });
            this.tolist = [];
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
    //客户转移
    transfer() {
      if (this.tolist.length > 0) {
        this.dialog = true;
      } else {
        this.$message.error("你还没有选择要放入的内容");
      }
    },
    // 确认转移
    deteleadd() {
      this.gettransfer({
        ids: this.tolist.toString(),
        accountId: this.form.value,
        pageNo: this.pagenum,
        pageSize: this.pagesize,
      });
      this.tolist = [];
      this.dialog = false;
    },
    //确认添加
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.addcustomer({
            name: this.ruleForm.name,
            mobile: this.ruleForm.mobile,
            wechat: this.ruleForm.wechat,
            qq: this.ruleForm.qq,
            appellation: this.ruleForm.appellation,
            sex: this.ruleForm.sex,
            age: this.ruleForm.age,
            searchTerms: this.ruleForm.searchTerms,
            website: this.ruleForm.website,
            school: this.ruleForm.school,
            education: this.ruleForm.education,
            graduatedSchool: this.ruleForm.graduatedSchool,
            proposedMajor: this.ruleForm.proposedMajor,
            source: this.ruleForm.source,
            customerType: this.ruleForm.customerType,
            remarks: this.ruleForm.remarks,
            createAc: this.userid,
            pageNo: this.pagenum,
            pageSize: this.pagesize,
          });
          this.ruleForm = {};
        } else {
          return false;
        }
      });
    },
    //查看详情
    addContact(row, event) {
      this.activeName = 0;
      this.ids = row.id;
      this.Popup = true;
    },
  },
  mounted() {
    //客户信息列表
    this.getcustomer({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //  客户来源信息
    this.getsource({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //学历列表
    this.geteducation({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //拟报专业
    this.getspecialty({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //校区
    this.getcampus({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //客户类型
    this.getcustomerType({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    //咨询方式
    this.getadvisory({
      pageNo: this.pagenum,
      pageSize: this.pagesize,
    });
    this.getaccount();
    this.user = JSON.parse(localStorage.getItem("adminUser"));
    this.userid = this.user.id;
  },
  watch: {
    //客户信息列表
    seek: {
      deep: true,
      handler(val, newval) {
        this.getcustomer({
          pageNo: this.pagenum,
          pageSize: this.pagesize,
        });
      },
      immediate: true,
    },
  },
  computed: {
    ...userState([
      "list",
      "souecelist",
      "talRow",
      "objdetail",
      "educationlist",
      "specialty",
      "campuslistL",
      "customerTyplist",
      "advisory",
    ]),
    ...listState(["account"]),
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-dialog__body {
  padding: 10px 20px;
}
/deep/.el-tabs__item {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}
.el-dialog-div {
  height: 80vh;
  overflow: auto;
}
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>