<template>
  <div class="main">
    <el-button type="text" @click="Return">返回</el-button>
    <el-button type="text" @click="Add">新增</el-button>
    <el-form :inline="true"></el-form>
  </div>
</template>
<script>
export default {
  name: "Insert",
  data() {
    return {};
  },
  methods: {
    Return() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    Add() {
      //添加数据

      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>