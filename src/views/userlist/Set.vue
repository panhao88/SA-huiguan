<template>
  <div>
    <el-card>
      <el-tabs   :value="String(activeName)" @tab-click="clickTab">
        <el-tab-pane label="来源信息">
          <source-tion v-if="activeName === 0" @next="next"></source-tion>
        </el-tab-pane>
        <el-tab-pane label="咨询方式">
          <consulting v-if="activeName === 1" @next="next"></consulting>
        </el-tab-pane>
        <el-tab-pane label="客户类别" >
            <visitorType v-if="activeName === 2"  @next="next"></visitorType>
        </el-tab-pane>
        <el-tab-pane label="客户类型" >
            <customerType v-if="activeName === 3"  @next="next"></customerType>
        </el-tab-pane>
         <el-tab-pane label="校区" >
            <campusset v-if="activeName === 4"  @next="next"></campusset>
        </el-tab-pane>
         <el-tab-pane label="事业单位" >
            <causeCent v-if="activeName === 5"  @next="next"></causeCent>
        </el-tab-pane>
         <el-tab-pane label="专业信息" >
            <specialty v-if="activeName === 6"  @next="next"></specialty>
        </el-tab-pane>
         <el-tab-pane label="学历" >
            <education v-if="activeName === 7"  @next="next"></education>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Education from '../../components/clientele/Education'
import Specialty from '../../components/clientele/Specialty'
import Campusset from '../../components/clientele/Campusset'
import SourceTion from "../../components/clientele/SourceTion";
import Consulting  from "../../components/clientele/Consulting";
import VisitorType from '../../components/clientele/VisitorType'
import CustomerType from '../../components/clientele/CustomerType'
import CauseCent from '../../components/clientele/CauseCent'
export default {
  name: "",
  props: {},
  components: {
    SourceTion, //来源信息
    Consulting, //咨询方式
    VisitorType,//客户类别
    CustomerType,//客户类型
    Campusset,//校区
    CauseCent,//事业重心
    Specialty,//专业信息
    Education, //学历
  },
  data() {
    return {
      activeName: 0,
    };
  },
  methods: {
    next(data) {
      this.activeName += data;
    },
    clickTab(tab) {
      this.activeName = tab.index * 1;
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
/deep/.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>