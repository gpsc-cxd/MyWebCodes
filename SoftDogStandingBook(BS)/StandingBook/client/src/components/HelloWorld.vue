<template>
  <div class="hello">
   <el-table :data="data" stripe border style="width:90%">
     <el-table-column prop="Dogcode" label="加密锁编号" />
     <el-table-column prop="Applydate" label="申请日期" />
     <el-table-column prop="Compname" label="公司/部门名称" />
     <el-table-column prop="Name" label="申请人" />
     <el-table-column prop="Phonenumber" label="联系电话" />
     <el-table-column prop="Dogtype" label="加密锁类型" />
     <el-table-column prop="Expirationdate" label="过期日期" />
     <el-table-column prop="Remark" label="备注" />
     <el-table-column prop="Regionalname" label="测区" />
     <el-table-column prop="Regionalcode" label="测区代码" />
     <el-table-column prop="Softwarename" label="软件" />
     <el-table-column prop="Servicetype" label="办理类型" />
     <el-table-column prop="Type" label="分组" />
   </el-table>
  </div>
</template>

<script>
import axios from 'axios';
// axios.defaults.withCredentials=true;
// axios.defaults.baseURL="http://localhost:3000";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:[]
    }
  },
  mounted(){
    axios.get('/api/show?collection=standingbook&selector={}').then(res=>{
      console.log(res.data);
      this.data=res.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
