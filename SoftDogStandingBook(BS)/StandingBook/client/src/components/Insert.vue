<template>
  <div class="main">
    <el-button type="text" @click="Return">返回</el-button>
    <el-button type="text" @click="Add">{{buttonName}}</el-button>
    <el-form
      ref="form"
      :inline="true"
      :model="data"
      label-position="left"
      :rules="rules"
      label-width="120px"
    >
      <div>
        <el-form-item label="加密锁编号：" prop="Dogcode">
          <el-input placeholder="请输入加密锁编号" v-model="data.Dogcode" style="width:200px" />
        </el-form-item>
        <el-form-item label="申请日期：" prop="Applydate">
          <el-date-picker
            type="date"
            value-format="yyyy/MM/dd"
            format="yyyy 年 MM 月 dd 日"
            v-model="data.Applydate"
            style="width:200px"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="公司或部门：" prop="Compname">
          <el-input placeholder="请输入公司或部门名称" v-model="data.Compname" style="width:200px" />
        </el-form-item>
        <el-form-item label="申请人：" prop="Name">
          <el-input placeholder="请输入申请人姓名" v-model="data.Name" style="width:200px" />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="联系电话：" prop="Phonenumber">
          <el-input placeholder="请输入联系电话" v-model="data.Phonenumber" style="width:200px" />
        </el-form-item>
        <el-form-item label="加密锁类型：" prop="Dogtype">
          <el-select placeholder="请选择加密锁类型" v-model="data.Dogtype" style="width:200px">
            <el-option
              v-for="item in dogtypes"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="过期时间：" prop="Expirationdate">
          <el-date-picker
            type="date"
            value-format="yyyy/MM/dd"
            format="yyyy 年 MM 月 dd 日"
            v-model="data.Expirationdate"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="备注：" prop="Remark">
          <el-input placeholder="请输入备注" v-model="data.Remark" style="width:200px" />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="测区名称：" prop="Regionalname">
          <el-input placeholder="请输入测区名称" v-model="data.Regionalname" style="width:200px" />
        </el-form-item>
        <el-form-item label="测区代码：" prop="Regionalcode">
          <el-input placeholder="请输入测区代码" v-model="data.Regionalcode" style="width:200px" />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="软件：" prop="Softwarename">
          <el-select
            placeholder="请选择或输入软件名称"
            v-model="data.Softwarename"
            multiple
            filterable
            allow-create
            style="width:200px"
          >
            <el-option
              v-for="item in softtypes"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="办理类型：" prop="Servicetype">
          <el-select
            placeholder="请选择办理类型"
            v-model="data.Servicetype"
            multiple
            filterable
            allow-create
            style="width:200px"
          >
            <el-option
              v-for="item in servicetypes"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分组：" prop="Type">
          <el-select placeholder="请选择分组" v-model="data.Type" style="width:200px">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { data } from "../models/data";
import { rules } from "../models/data";
import { dogtypes, softtypes, servicetypes, types } from "../models/fields";
import axios from "axios";
var ArrayToString = function(array) {
  var res = "";
  array.forEach(element => {
    res += element + ",";
  });
  res = res.substr(0, res.length - 1);
  return res;
};
export default {
  name: "Insert",
  data() {
    return {
      data: data,
      rules: rules,
      dogtypes: dogtypes,
      softtypes: softtypes,
      servicetypes: servicetypes,
      types: types,
      buttonName: ""
    };
  },
  mounted() {
    // console.log(this.$route.params);
    if (this.$route.params._id) {
      this.buttonName = "修改";
      //获取params，转换并赋值到this.data
      var tmp = JSON.parse(JSON.stringify(this.$route.params));
      tmp.Softwarename = tmp.Softwarename.split(",");
      tmp.Servicetype = tmp.Servicetype.split(",");
      console.log(tmp);
      this.data = tmp;
    } else {
      this.buttonName = "提交";
    }
  },
  methods: {
    Return() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    Add() {
      console.log(this.data);

      //验证
      this.$refs.form.validate(valid => {
        if (valid) {
          //先转换数据
          var tmp = JSON.parse(JSON.stringify(this.data));
          var softtmp = tmp.Softwarename;
          var servicetmp = tmp.Servicetype;
          var software = ArrayToString(softtmp);
          tmp.Softwarename = software;
          var service = ArrayToString(servicetmp);
          tmp.Servicetype = service;
          console.log(tmp);
          if (!this.$route.params._id) {
            //添加数据
            axios
              .get(
                "/api/add?collection=standingbook&selector=" +
                  JSON.stringify(tmp)
              )
              .then(res => {
                console.log(res);
                if (res.statusText == "OK") {
                  alert("提交成功");
                  this.$router.push({
                    name: "HelloWorld",
                    params: { reload: true }
                  });
                } else {
                  alert("提交失败");
                }
              });
          } else {
            //修改数据
            //修改selector使用的updateOne，需要添加$set
            var id = tmp._id;
            delete tmp._id;
            var selector = [{ _id: id }, { $set: tmp }];
            console.log(JSON.stringify(selector));
            selector = JSON.stringify(selector);
            axios
              .get("/api/update?collection=standingbook&selector=" + selector)
              .then(res => {
                console.log(res);
                if (res.statusText == "OK") {
                  alert("修改成功");
                  this.$router.push({
                    name: "HelloWorld",
                    params: { reload: true }
                  });
                } else {
                  alert("修改失败");
                }
              });
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    }
  }
};
</script>