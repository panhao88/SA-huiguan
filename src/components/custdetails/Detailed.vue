<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        >姓名：<el-input
          v-model="objdetail.name"
          style="width: 80%;background:#fff"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >手机：<el-input
          v-model="objdetail.mobile"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >微信：<el-input
          v-model="objdetail.wechat"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >QQ：
        <el-input
          v-model="objdetail.qq"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        >称谓：<el-input
          v-model="objdetail.appellation"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >性别：<el-input
          v-model="objdetail.sex"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >年龄：<el-input
          v-model="objdetail.age"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >学校：<el-input
          v-model="objdetail.school"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="6"
        >学历：<el-input
          v-model="objdetail.education"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
       <el-col :span="6"
        >来源：<el-input
          v-model="objdetail.source"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
        <el-col :span="6"
        >数据：<el-input
          v-model="objdetail.state"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >身高：<el-input
          v-model="objdetail.height"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >录入员：<el-input
          v-model="objdetail.createAc"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >搜索词：<el-input
          v-model="objdetail.searchTerms"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
 <el-row :gutter="20">
      <el-col :span="12"
        >拟报专业：<el-input
          v-model="objdetail.proposedMajor"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >客户类别：<el-input
          v-model="objdetail.visitortype"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
       <el-col :span="12"
        >毕业学校：<el-input
          v-model="objdetail.graduatedSchool"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
       <el-col :span="12"
        >咨询方式：<el-input
          v-model="objdetail.advisory"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
     <el-row :gutter="20">
        <el-col :span="12"
        >访问网址：<el-input
          v-model="objdetail.website"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
       <el-col :span="12"
        >客户类型：<el-input
          v-model="objdetail.customerType"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
     <el-row :gutter="20">
       <el-col :span="12"
        >创建日期：<el-input
          v-model="objdetail.createAt"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >备注：<el-input
          type="textarea"
          v-model="objdetail.remarks"
          style="width: 85%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
     <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="6"
        >血压：<el-input
          v-model="objdetail.bloodPressure"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >收缩：<el-input
          v-model="objdetail.shrink"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >体重：<el-input
          v-model="objdetail.weight"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >气质：<el-input
          v-model="objdetail.temperament"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        >肩宽：<el-input
          v-model="objdetail.shoulder"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >衣长：<el-input
          v-model="objdetail.garment"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >腰围：<el-input
          v-model="objdetail.waist"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >臂长：<el-input
          v-model="objdetail.arm"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        >形体：<el-input
          v-model="objdetail.body"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >籍贯：<el-input
          v-model="objdetail.hometown"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >民族：<el-input
          v-model="objdetail.nation"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="6"
        >地址：<el-input
          v-model="objdetail.address"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
     <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >X型腿：
        <el-input
          v-model="objdetail.legX"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >O型腿：
        <el-input
          v-model="objdetail.legO"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >舒张度：<el-input
          v-model="objdetail.diastole"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >过往病史：<el-input
          v-model="objdetail.medical"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
       <el-col :span="12"
        >联系时间：<el-input
          v-model="objdetail.lastAt"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >四肢疤痕：<el-input
          v-model="objdetail.scar"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>

      <el-col :span="12"
        >色弱色盲：<el-input
          v-model="objdetail.achromatopsia"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >左眼视力：<el-input
          v-model="objdetail.sightL"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >右眼视力：<el-input
          v-model="objdetail.sightR"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >英语口语：<el-input
          v-model="objdetail.spokenEnglish"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >是否口吃：<el-input
          v-model="objdetail.stuttering"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >艺术特长：<el-input
          v-model="objdetail.artSpecialty"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>

      <el-col :span="12"
        >心理素质：<el-input
          v-model="objdetail.psychologicalQuality"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >文化成绩：<el-input
          v-model="objdetail.culturalAchievements"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >综合素质：<el-input
          v-model="objdetail.comprehensiveQuality"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >综合评审：<el-input
          v-model="objdetail.comprehensiveReview"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>

      <el-col :span="12"
        >出生年月：<el-input
          v-model="objdetail.birth"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >政治面貌：<el-input
          v-model="objdetail.political"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >普通话水平：<el-input
          v-model="objdetail.mandarin"
          style="width: 75%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >班主任姓名：<el-input
          v-model="objdetail.teacherName"
          style="width: 75%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >班主任电话：<el-input
          v-model="objdetail.teacherTelphone"
          style="width: 75%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
      <el-col :span="12"
        >身份证号码：<el-input
          v-model="objdetail.idCard"
          style="width: 75%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >形象：<el-input
          type="textarea"
          v-model="objdetail.figure"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        >特长：<el-input
          type="textarea"
          v-model="objdetail.skill"
          style="width: 80%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
    <el-row :gutter="20">
      <el-col :span="12"
        >学校领导确认签字：<el-input
          v-model="objdetail.signatureSchool"
          style="width: 60%"
          size="mini"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <div class="borter"></div>
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
     
    };
  },
  methods: {
    ...userActions(["getdetails"]),
  },
  watch: {
    ids: {
      deep: true,
      handler(val, newval) {
        this.getdetails({
          id: val,
        });
      },
      immediate: true,
    },
  },
  mounted() {},
  computed: {
    ...userState(["objdetail", "contacts"]),
  },
};
</script>

<style scoped lang='scss'>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.borter {
  border-bottom: 1px solid #f0f2f5;
  margin-bottom: 20px;
}
</style>