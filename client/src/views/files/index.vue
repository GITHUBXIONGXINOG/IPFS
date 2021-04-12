<template>
  <div class="files">
      <search />
  </div>
</template>
<script>
import Search from "../../components/search";
export default {
  components: {
    Search,
  },
};
</script>
<style lang="scss" scoped>
.files {
  border: 1px solid red;
  width: 85%;
}

</style>