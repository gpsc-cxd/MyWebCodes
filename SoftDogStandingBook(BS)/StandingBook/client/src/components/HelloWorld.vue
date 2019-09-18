<template>
  <div class="hello">
    <div>
      <el-form :inline="true">
        <div>
          <el-form-item class="fbtn">
            <el-button type="success" @click="newClick">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-select
              ref="selectedtype"
              v-model="selectedvalue"
              placeholder="请选择"
              style="width:200px"
            >
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
              @keyup.enter.native="searchClick"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="exportExcel">导出台账</el-button>
          </el-form-item>-->
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
      <el-table-column type="index" width="60" fixed="left" label="序号" />
      <el-table-column fixed="left" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="exportRow(scope.row)">导出</el-button>
          <el-button type="text" size="small" @click.native.prevent="editRow(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="left" prop="Dogcode" label="加密锁编号" width="150" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Applydate" label="申请日期" width="100" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Compname" label="公司/部门名称" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Name" label="申请人" width="100" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Phonenumber" label="联系电话" width="120">
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column
        prop="Dogtype"
        label="加密锁类型"
        width="120"
        :filters="[{text:'单机锁',value:'单机锁'},{text:'网络锁',value:'网络锁'}]"
        :filter-method="filterDogtype"
      />
      <el-table-column prop="Expirationdate" label="过期日期" width="120" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Remark" label="备注" width="150">
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Regionalname" label="测区" width="80">
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Regionalcode" label="测区代码" width="90">
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
      <el-table-column prop="Softwarename" label="软件" sortable>
        <!-- <template slot-scope="scope">
          <p v-html="showData(scope)"></p>
        </template>-->
      </el-table-column>
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
function GetNowDate() {
  var date = new Date();
  var dateStr =
    date.getFullYear().toString() +
    buling(date.getMonth().toString()) +
    buling(date.getDay().toString()) +
    buling(date.getHours().toString()) +
    buling(date.getMinutes().toString()) +
    buling(date.getSeconds().toString());
  return dateStr;
}
function buling(input) {
  return input.length < 2 ? "0" + input : input;
}
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
    showData(scope) {
      var prop = scope.column.property;
      var val = scope.row[prop];
      if (prop != this.selectedvalue) {
        return val;
      }
      var text = this.input;
      if (text != "") {
        let reg = new RegExp("(" + text + ")", "g");
        if (val != null && val !== "") {
          return val.replace(reg, "<font style='color:red'>$1</font>");
        } else {
          return val;
        }
      } else {
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
    exportExcel() {
      var datas = JSON.parse(JSON.stringify(this.data));
      //去掉所有的_id
      datas.forEach(element => {
        delete element._id;
      });
      // axios({
      //   url:'/api/exportexcel',
      //   method:'post',
      //   data:datas
      // },{responseType:'arraybuffer'}).then(res=>{
      //   console.log(res);
      // })       //参数太长报错
      var type = this.$refs.selectedtype.value;
      var keyw = this.input;
      axios
        .get("/api/exportexcel?type=" + type + "&keyword=" + keyw, {
          responseType: "arraybuffer"
        })
        .then(res => {
          console.log(res);
          var blob = new Blob([res.data]);
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          var date = GetNowDate();
          // var d = data.Applydate.replace(/\//g, "");
          var filename = date + "-加密锁台账.xlsx";
          a.download = filename;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    },
    handleSelectionChange(e) {
      this.multiSelection = e;
      console.log(e);
    },
    exportRow(data) {
      //先去掉data._id
      delete data._id;
      axios
        .get("/api/exportword?data=" + JSON.stringify(data), {
          responseType: "arraybuffer"
        })
        .then(res => {
          console.log(res);
          var blob = new Blob([res.data]);
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          var d = data.Applydate.replace(/\//g, "");
          var filename =
            d +
            "-加密锁授权申请-" +
            data.Compname +
            "-" +
            data.Regionalname +
            ".doc";
          a.download = filename;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
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
