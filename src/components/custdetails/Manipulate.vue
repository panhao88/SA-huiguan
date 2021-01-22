<template>
 <div>
     操作
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("customer");
const { mapState: userState, mapActions: userActions } = userModule;
 export default {
   name: '',
   props: {
       ids:{
           type:Number
       }
   },
   components: {

   },
   data () {
     return {

     }
   },
   methods: {
       ...userActions(["getoperationRecord"])
   },
   mounted() {
       this.getoperationRecord({
           cid:this.ids
       })
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>