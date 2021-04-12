<template>
  <div class="list">
    <ul>
      <li><input type="checkbox" /></li>
      <li>名称</li>
      <li>大小</li>
    </ul>
  </div>
</template>
<script>
export default {
    computed:{

    }
}
</script>
<style lang="scss" scoped>
.list {
  border: 1px solid #eee;
  height: 60px;
  width: 100%;
}
ul {
  display: flex;
  align-items: center;
  //   justify-content: space-between;
  height: 100%;
  width: 100%;
  li {
    height: 80%;
    display: flex;
    align-items: center;
  }
  li:nth-child(1) {
    width: 20px;
    margin: 0 20px;
  }
  li:nth-child(2) {
    // width: 80rem;
    width: 80%;
  }
  li:nth-child(3) {
    width: 50px;
  }
}
</style>