<template>
  <div id="app">
    <nav-header />
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>
 
<script>
import navHeader from "./views/nav_header";

export default {
  components: {
    navHeader,
  },
};
</script> 

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

}

div {
  padding: 30px;
 
}
</style>
