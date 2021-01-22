<template>
  <div>
    <!--  搜索  -->
    <el-card>
      <div class="vue-box" style="display: none" :style="'display: block;'">
        <el-row :gutter="10">
          <el-col :lg="4" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div style="padding: 0px 5px">ID:</div>
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
              <div style="padding: 0px 5px; white-space: nowrap">电话:</div>
              <div>
                <el-input
                  size="mini"
                  v-model.trim="seek.name"
                  placeholder="请输入联系电话"
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
          <el-col :lg="8" :sm="12" :xs="24">
            <div class="sa-wnk">
              <div>
                <el-button size="mini" type="primary" @click="onSubmit"
                  ><i class="el-icon-search"></i> 搜索</el-button
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
        <transition name="draw">
          <div
            v-show="boxshow"
            style="border-top: 1px solid #ebeef5; margin: 10px;"
          >
            <div>
              <el-row :gutter="10">
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      身份证:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.wechat"
                        placeholder="请输入微信"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      学历:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.wechat"
                        placeholder="请输入学历"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      性别:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.wechat"
                        placeholder="请输入性别"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      职务:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入职务"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      职务状态:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入职务状态"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      用工形式:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入用工形式"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      专业:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入专业"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      民族:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入民族"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      事业中心:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入事业重心"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      创建时间:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入创建时间"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :lg="6" :sm="12" :xs="24">
                  <div class="c-item">
                    <div
                      style="padding: 0px 5px; white-space: nowrap; width: 60px"
                    >
                      事业中心:
                    </div>
                    <div>
                      <el-input
                        size="mini"
                        v-model.trim="seek.qq"
                        placeholder="请输入事业重心"
                        @keydown.enter.native="keydowm"
                      ></el-input>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </div>
    </el-card>
    <!--  table  -->
    <el-card>
      <el-header>
        <el-button type="primary" size="mini" @click="Addaccount"
          ><i class="el-icon-plus"></i> 添加账户</el-button
        >
        <el-button size="mini" type="danger" @click="del"
          ><i class="el-icon-delete"></i> 删除选中</el-button
        >
      </el-header>
      <el-table :data="account" style="width: 100%" border>
        <el-table-column
          width="40"
          fixed
          align="center"
          type="selection"
        ></el-table-column>
        <el-table-column type="expand" label="详情" width="60">
          <template slot-scope="s">
            <div style="margin-left: 40px">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出生年月:">{{
                      s.row.birth
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证号码:">{{
                      s.row.idCard
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍地址:">{{
                      s.row.permanentAddr
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="现居住地址:">{{
                      s.row.presentAddr
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族:">{{
                      s.row.nation
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历:">{{
                      s.row.education
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业:">{{ s.row.major }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="毕业时间:">{{
                      s.row.graduationAt
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="毕业学校:">{{
                      s.row.graduationSchool
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="本司入职时间:">{{
                      s.row.entryAt
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="本司工龄:">{{
                      s.row.workYear
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="社会保险缴纳时间:">{{
                      s.row.socialInsuranceAt
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同签订时间:">{{
                      s.row.contractSigningAt
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同到期时间:">{{
                      s.row.contractExpirationAt
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="续签合同时间:">{{
                      s.row.contractRenewalAt
                    }}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="emergencyContact"
          width="100"
          label="紧急联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="emergencyContactNum"
          width="120"
          label="紧急联系人电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="职员状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="recruit"
          label="用工形式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="campus"
          width="160"
          label="组织"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cause"
          width="160"
          label="事业中心"
          align="center"
        ></el-table-column>

        <el-table-column label="是否锁定" width="100" align="center">
          <template slot-scope="s">
            <el-switch
              v-if="s.row.id == 1"
              disabled
              active-color="#ff4949"
              inactive-color="#13ce66"
            ></el-switch>
            <el-switch
              v-else
              active-color="#ff4949"
              inactive-color="#13ce66"
              v-model="s.row.status"
              :active-value="-1"
              :inactive-value="1"
              @change="changeStatus(s.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <!-- 操纵 -->
        <el-table-column
          label="操作"
          align="center"
          :show-overflow-tooltip="true"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-tooltip content="编辑账户" placement="top">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除账户" placement="top">
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
      <!-- 账户新增 -->
      <el-dialog
        title="账户新增"
        :visible.sync="dialogFormVisible"
        width="60%"
        :modal-append-to-body="false"
        top="5vh"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="username"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="昵称"
                :label-width="formLabelWidth"
                prop="nickname"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.nickname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系电话"
                :label-width="formLabelWidth"
                prop="phone"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="组织/校区"
                :label-width="formLabelWidth"
                prop="campus"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.campus"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="事业中心"
                :label-width="formLabelWidth"
                prop="cause"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.cause"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="job"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.job"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职员状态"
                :label-width="formLabelWidth"
                prop="state"
              >
                <el-select
                  v-model="ruleForm.state"
                  size="mini"
                  placeholder="职员状态"
                >
                  <el-option label="试用" value="0"></el-option>
                  <el-option label="转正" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="用工形式"
                :label-width="formLabelWidth"
                prop="recruit"
              >
                <el-select
                  v-model="ruleForm.recruit"
                  size="mini"
                  placeholder="用工形式"
                >
                  <el-option label="全职" value="0"></el-option>
                  <el-option label="兼职" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="身份证号码"
                :label-width="formLabelWidth"
                prop="idCard"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.idCard"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                prop="sex"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.sex"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="出生年月"
                :label-width="formLabelWidth"
                prop="birth"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.birth"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="户籍地址"
                :label-width="formLabelWidth"
                prop="permanentAddr"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.permanentAddr"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="现住地址"
                :label-width="formLabelWidth"
                prop="presentAddr"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.presentAddr"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="紧急联系人"
                :label-width="formLabelWidth"
                prop="emergencyContact"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.emergencyContact"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="紧急联系人电话"
                :label-width="formLabelWidth"
                prop="emergencyContactNum"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.emergencyContactNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="民族"
                :label-width="formLabelWidth"
                prop="nation"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.nation"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="婚姻状况"
                :label-width="formLabelWidth"
                prop="marriage"
              >
                <el-select
                  v-model="ruleForm.marriage"
                  size="mini"
                  placeholder="婚姻状况"
                >
                  <el-option label="未婚" value="0"></el-option>
                  <el-option label="已婚" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学历"
                :label-width="formLabelWidth"
                prop="education"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.education"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="专业"
                :label-width="formLabelWidth"
                prop="major"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.major"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="毕业时间"
                :label-width="formLabelWidth"
                prop="graduationAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.graduationAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="毕业学校"
                :label-width="formLabelWidth"
                prop="graduationSchool"
              >
                <el-input
                  size="mini"
                  v-model="ruleForm.graduationSchool"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="本司入职时间"
                :label-width="formLabelWidth"
                prop="entryAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.entryAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="社会保险缴纳时间"
                :label-width="formLabelWidth"
                prop="socialInsuranceAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.socialInsuranceAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="合同签订时间"
                :label-width="formLabelWidth"
                prop="contractSigningAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.contractSigningAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="合同到期时间"
                :label-width="formLabelWidth"
                prop="contractExpirationAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.contractExpirationAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="续签合同时间"
                :label-width="formLabelWidth"
                prop="contractRenewalAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="ruleForm.contractRenewalAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addconfirm('ruleForm')"
            >确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑账户 -->
      <el-dialog
        title="编辑账户"
        :visible.sync="dialogForm"
        width="60%"
        :modal-append-to-body="false"
      >
        <el-form :model="validation" :rules="rules" ref="validation">
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="username"
              >
                <el-input
                  size="mini"
                  v-model="validation.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  size="mini"
                  v-model="validation.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="昵称"
                :label-width="formLabelWidth"
                prop="nickname"
              >
                <el-input
                  size="mini"
                  v-model="validation.nickname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系电话"
                :label-width="formLabelWidth"
                prop="phone"
              >
                <el-input
                  size="mini"
                  v-model="validation.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="组织/校区"
                :label-width="formLabelWidth"
                prop="campus"
              >
                <el-input
                  size="mini"
                  v-model="validation.campus"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="事业中心"
                :label-width="formLabelWidth"
                prop="cause"
              >
                <el-input
                  size="mini"
                  v-model="validation.cause"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="邮箱"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-input
                  size="mini"
                  v-model="validation.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="job"
              >
                <el-input
                  size="mini"
                  v-model="validation.job"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职员状态"
                :label-width="formLabelWidth"
                prop="state"
              >
                <el-select
                  v-model="validation.state"
                  size="mini"
                  placeholder="职员状态"
                >
                  <el-option label="试用" value="0"></el-option>
                  <el-option label="转正" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="用工形式"
                :label-width="formLabelWidth"
                prop="recruit"
              >
                <el-select
                  v-model="validation.recruit"
                  size="mini"
                  placeholder="用工形式"
                >
                  <el-option label="全职" value="0"></el-option>
                  <el-option label="兼职" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="身份证号码"
                :label-width="formLabelWidth"
                prop="idCard"
              >
                <el-input
                  size="mini"
                  v-model="validation.idCard"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                prop="sex"
              >
                <el-input
                  size="mini"
                  v-model="validation.sex"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="出生年月"
                :label-width="formLabelWidth"
                prop="birth"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.birth"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="户籍地址"
                :label-width="formLabelWidth"
                prop="permanentAddr"
              >
                <el-input
                  size="mini"
                  v-model="validation.permanentAddr"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="现住地址"
                :label-width="formLabelWidth"
                prop="presentAddr"
              >
                <el-input
                  size="mini"
                  v-model="validation.presentAddr"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="紧急联系人"
                :label-width="formLabelWidth"
                prop="emergencyContact"
              >
                <el-input
                  size="mini"
                  v-model="validation.emergencyContact"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="紧急联系人电话"
                :label-width="formLabelWidth"
                prop="emergencyContactNum"
              >
                <el-input
                  size="mini"
                  v-model="validation.emergencyContactNum"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="民族"
                :label-width="formLabelWidth"
                prop="nation"
              >
                <el-input
                  size="mini"
                  v-model="validation.nation"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="婚姻状况"
                :label-width="formLabelWidth"
                prop="marriage"
              >
                <el-select
                  v-model="validation.marriage"
                  size="mini"
                  placeholder="婚姻状况"
                >
                  <el-option label="未婚" value="0"></el-option>
                  <el-option label="已婚" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学历"
                :label-width="formLabelWidth"
                prop="education"
              >
                <el-input
                  size="mini"
                  v-model="validation.education"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="专业"
                :label-width="formLabelWidth"
                prop="major"
              >
                <el-input
                  size="mini"
                  v-model="validation.major"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="毕业时间"
                :label-width="formLabelWidth"
                prop="graduationAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.graduationAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="毕业学校"
                :label-width="formLabelWidth"
                prop="graduationSchool"
              >
                <el-input
                  size="mini"
                  v-model="validation.graduationSchool"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="本司入职时间"
                :label-width="formLabelWidth"
                prop="entryAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.entryAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="社会保险缴纳时间"
                :label-width="formLabelWidth"
                prop="socialInsuranceAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.socialInsuranceAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="合同签订时间"
                :label-width="formLabelWidth"
                prop="contractSigningAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.contractSigningAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="合同到期时间"
                :label-width="formLabelWidth"
                prop="contractExpirationAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.contractExpirationAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="续签合同时间"
                :label-width="formLabelWidth"
                prop="contractRenewalAt"
              >
                <el-date-picker
                  size="mini"
                  v-model="validation.contractRenewalAt"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="editorconfirm('validation')"
            >确 定
          </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const userModule = createNamespacedHelpers("account");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      seek: {
        qq: "",
      },
      boxshow: false,
      s: {}, //搜索
      m: { nickName: "" }, //更多搜索
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      dialogForm: false,
      formLabelWidth: "130px",

      id: "",
      ruleForm: {
        username: "",
        nickname: "",
        password: "",
        phone: "",
        campus: "",
        cause: "",
        job: "",
        state: "",
        recruit: "",
        idCard: "",
        sex: "",
        birth: "",
        permanentAddr: "",
        presentAddr: "",
        emergencyContact: "",
        emergencyContactNum: "",
        nation: "",
        marriage: "",
        education: "",
        major: "",
        graduationAt: "",
        graduationSchool: "",
        entryAt: "",
        socialInsuranceAt: "",
        contractSigningAt: "",
        contractExpirationAt: "",
        contractRenewalAt: "",
      },
      validation: {
        username: "",
        nickname: "",
        password: "",
        email: "",
        phone: "",
        campus: "",
        cause: "",
        job: "",
        state: "",
        recruit: "",
        idCard: "",
        sex: "",
        birth: "",
        permanentAddr: "",
        presentAddr: "",
        emergencyContact: "",
        emergencyContactNum: "",
        nation: "",
        marriage: "",
        education: "",
        major: "",
        graduationAt: "",
        graduationSchool: "",
        entryAt: "",
        socialInsuranceAt: "",
        contractSigningAt: "",
        contractExpirationAt: "",
        contractRenewalAt: "",
      },
      rules: {
        // username: [
        //   {
        //     required: true,
        //     message: "用户名不能为空",
        //     trigger: "blur",
        //   },
        // ],
        // nickname: [
        //   {
        //     required: true,
        //     message: "昵称不能为空",
        //     trigger: "blur",
        //   },
        // ],
        // password: [
        //   {
        //     required: true,
        //     message: "密码不能为空",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  methods: {
    ...userActions([
      "getaccount",
      "accountadd",
      "EditAccount",
      "getChangeStatus",
    ]),
    // 确认弹出框
    Addaccount() {
      this.dialogFormVisible = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    // 删除
    del() {},
    unfold() {
      this.boxshow = true;
    },
    shrink() {
      this.boxshow = false;
    },
    //账户解锁与锁定
    changeStatus(res) {
      this.getChangeStatus({ accountId: res.id, lock: res.status });
    },
    // 确认添加
    addconfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(this.ruleForm.marriage);
          this.accountadd({
            userName: this.ruleForm.username,
            nickName: this.ruleForm.nickname,
            password: this.ruleForm.password,
            phone: this.ruleForm.phone,
            campus: this.ruleForm.campus,
            cause: this.ruleForm.cause,
            job: this.ruleForm.job,
            state: this.ruleForm.state,
            recruit: this.ruleForm.recruit,
            idCard: this.ruleForm.idCard,
            sex: this.ruleForm.sex,
            birth: this.ruleForm.birth,
            permanentAddr: this.ruleForm.permanentAddr,
            presentAddr: this.ruleForm.presentAddr,
            emergencyContact: this.ruleForm.emergencyContact,
            emergencyContactNum: this.ruleForm.emergencyContactNum,
            nation: this.ruleForm.nation,
            marriage: this.ruleForm.marriage,
            education: this.ruleForm.education,
            major: this.ruleForm.major,
            graduationAt: this.ruleForm.graduationAt,
            graduationSchool: this.ruleForm.graduationSchool,
            entryAt: this.ruleForm.entryAt,
            socialInsuranceAt: this.ruleForm.socialInsuranceAt,
            contractSigningAt: this.ruleForm.contractSigningAt,
            contractExpirationAt: this.ruleForm.contractExpirationAt,
            contractRenewalAt: this.ruleForm.contractRenewalAt,
          });
        } else {
          return false;
        }
      });
    },
    // 编辑账户
    handleEdit(index, row) {
      this.id = row.id;
      this.dialogForm = true;
      this.validation.username = row.userName;
      this.validation.nickname = row.nickName;
      this.validation.email = row.email;
      this.validation.phone = row.phone;
      this.validation.password = row.password;
      this.validation.status = row.status;
      this.validation.createAt = row.createAt;
      this.validation.avatar = row.avatar;
      this.validation.campus = row.campus;
      this.validation.cause = row.cause;
      this.validation.job = row.job;
      this.validation.state = row.state;
      this.validation.recruit = row.recruit;
      this.validation.idCard = row.idCard;
      this.validation.sex = row.sex;
      this.validation.birth = row.birth;
      this.validation.permanentAddr = row.permanentAddr;
      this.validation.presentAddr = row.presentAddr;
      this.validation.emergencyContact = row.emergencyContact;
      this.validation.emergencyContactNum = row.emergencyContactNum;
      this.validation.nation = row.nation;
      this.validation.marriage = row.marriage;
      this.validation.education = row.education;
      this.validation.major = row.major;
      this.validation.graduationAt = row.graduationAt;
      this.validation.graduationSchool = row.graduationSchool;
      this.validation.entryAt = row.entryAt;
      this.validation.workYear = row.workYear;
      this.validation.socialInsuranceAt = row.socialInsuranceAt;
      this.validation.contractSigningAt = row.contractSigningAt;
      this.validation.contractExpirationAt = row.contractExpirationAt;
      this.validation.contractRenewalAt = row.contractRenewalAt;
    },
    //确认编辑
    editorconfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm = false;
          this.EditAccount({
            userName: this.validation.username,
            nickName: this.validation.nickname,
            email: this.validation.email,
            id: this.id,
            password: this.validation.password,
            phone: this.validation.phone,
            campus: this.validation.campus,
            cause: this.validation.cause,
            job: this.validation.job,
            state: this.validation.state,
            recruit: this.validation.recruit,
            idCard: this.validation.idCard,
            sex: this.validation.sex,
            birth: this.validation.birth,
            permanentAddr: this.validation.permanentAddr,
            presentAddr: this.validation.presentAddr,
            emergencyContact: this.validation.emergencyContact,
            emergencyContactNum: this.validation.emergencyContactNum,
            nation: this.validation.nation,
            marriage: this.validation.marriage,
            education: this.validation.education,
            major: this.validation.major,
            graduationAt: this.validation.graduationAt,
            graduationSchool: this.validation.graduationSchool,
            entryAt: this.validation.entryAt,
            socialInsuranceAt: this.validation.socialInsuranceAt,
            contractSigningAt: this.validation.contractSigningAt,
            contractExpirationAt: this.validation.contractExpirationAt,
            contractRenewalAt: this.validation.contractRenewalAt,
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.getaccount();
  },
  watch: {},
  computed: {
    ...userState(["account"]),
  },
};
</script>

<style scoped lang='scss'>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>