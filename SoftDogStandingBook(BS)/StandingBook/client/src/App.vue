<template>
  <div id="app">
    <h1>加密锁台账管理系统</h1>
    <!-- <transition name="fade"> -->
      <keep-alive include="HelloWorld">
        <router-view/>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
import router from './router'
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
