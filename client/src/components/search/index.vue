<template>
  <div class="search">
    <div class="part">
      <input type="text" placeholder="QmHasg/bafyHash" v-model="searchText" />
      <div class="button">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfiles"></use></svg
        >浏览
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
};
</script>
<style lang="scss">
.search {
  height: 5rem;
  background-color: #f0f6fa;
  display: flex;
  align-items: center;
}
.part {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  height: 40%;
  margin: 0 0 0 30px;
}
input {
  background-color: #fff;
  border-radius: 3px;
  border-right: none;
  width: 90%;
  height: 100%;
  &:focus {
    border: 2px solid #ccc;
    border-right: none;
  }
}

.button {
  width: 20%;
  height: 100%;
  border: 2px solid #dee0e7;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee0e7;
  color: #f7f8fa;
  svg{
      margin: 0 5px;
  }
}
</style>