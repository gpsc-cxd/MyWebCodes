<template>
  <div class="hello">
    <div>
      <el-form :inline="true">
        <div>
          <el-form-item class="fbtn">
            <el-button type="success" @click="newClick">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-select ref="selectedtype" v-model="selectedvalue" placeholder="请选择" style="width:200px">
              <el-option
                v-for="item in fields"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              ref="searchinput"
              placeholder="请输入搜索内容"
              v-model="input"
              @keydown.enter.native.prevent="searchClick"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-table
      ref="filtertable"
      :data="data"
      stripe
      border
      style="width:100%"
      max-height="600"
      :default-sort="{prop:'Applydate',order:'descending'}"
    >
      <!-- <el-table-column fixed="left" type="selection" width="55" /> -->
      <el-table-column type="index" width="60" fixed="left" label="序号"/>
      <el-table-column fixed="left" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="exportRow(scope.row)">导出</el-button>
          <el-button type="text" size="small" @click.native.prevent="editRow(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="left" prop="Dogcode" label="加密锁编号" width="150" sortable >
        <template slot-scope="scope">
          <p v-html="showData(scope.row.Dogcode)"></p>
        </template>
      </el-table-column>
      <el-table-column prop="Applydate" label="申请日期" width="100" sortable >
        <template slot-scope="scope">
          <p v-html="showData(scope.row.Applydate)"></p>
        </template>
      </el-table-column>
      <el-table-column prop="Compname" label="公司/部门名称" sortable />
      <el-table-column prop="Name" label="申请人" width="100" sortable />
      <el-table-column prop="Phonenumber" label="联系电话" width="120" />
      <el-table-column
        prop="Dogtype"
        label="加密锁类型"
        width="120"
        :filters="[{text:'单机锁',value:'单机锁'},{text:'网络锁',value:'网络锁'}]"
        :filter-method="filterDogtype"
      />
      <el-table-column prop="Expirationdate" label="过期日期" width="120" sortable />
      <el-table-column prop="Remark" label="备注" width="150" />
      <el-table-column prop="Regionalname" label="测区" width="80" />
      <el-table-column prop="Regionalcode" label="测区代码" width="90" />
      <el-table-column prop="Softwarename" label="软件" sortable />
      <el-table-column prop="Servicetype" label="办理类型" width="120" sortable />
      <el-table-column
        prop="Type"
        label="分组"
        width="80"
        :filters="[{text:'外部',value:'外部'},{text:'内部',value:'内部'}]"
        :filter-method="filterDogtype"
      />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { fields } from "../models/fields";
import Vue from "vue";
// axios.defaults.withCredentials=true;
// axios.defaults.baseURL="http://localhost:3000";
export default {
  name: "HelloWorld",
  data() {
    return {
      data: [],
      fields: fields,
      selectedvalue: "Dogcode",
      input: "",
      multiSelection: [],
      keepalive: true
    };
  },
  mounted() {
    var params = { collection: "standingbook", selector: {} };
    axios.get("/api/show", { params }).then(res => {
      console.log(res.data);
      this.data = res.data;
    });
  },
  activated() {
    console.log(this.$route.params);
    if (this.$route.params.reload) {
      //刷新
      var params = { collection: "standingbook", selector: {} };
      axios.get("/api/show", { params }).then(res => {
        console.log(res.data);
        this.data = res.data;
        Vue.set(this.data, this.data, res.data);
      });
    }
  },
  methods: {
    filterDogtype(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    showData(val){
      var text = this.input;
      if(text!=""){
        let reg = new RegExp("("+text+")","g");
        if(val!=null && val!==""){
          return val.replace(reg,"<font style='color:red'>$1</font>");
        }
        else{
          return val;
        }
      }
      else{
        return val;
      }
    },
    searchClick() {
      var type = this.$refs.selectedtype.value;
      // console.log(type);
      var text = this.input;
      // console.log(text);
      var params = { collection: "standingbook", selector: {} };
      //条件搜索
      var kv = {};
      if (text != "") {
        kv = {};
        kv[type] = text;
        params["selector"] = kv;
      }
      // let params = { collection: "standingbook", selector: kv };

      console.log(params);
      axios
        .get("/api/show?collection=standingbook&selector=" + JSON.stringify(kv))
        .then(res => {
          console.log(res.data);
          this.data = res.data;
        });
    },
    handleSelectionChange(e) {
      this.multiSelection = e;
      console.log(e);
    },
    exportRow(data) {
      //先去掉data._id
      delete data._id;
      axios.get('/api/exportword?data='+JSON.stringify(data))
      .then(res=>{
        console.log(res);
      })
    },
    editRow(data) {
      //修改
      console.log(data);
      this.$router.push({ name: "Insert", params: data });
    },
    newClick() {
      this.$router.push("/insert");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
#fbtn {
  align-items: flex-start;
}
</style>
