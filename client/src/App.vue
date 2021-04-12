<template>
  <div id="app">
    <nav-header />

    <router-view />
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

div {
  padding: 30px;
 
}
</style>
