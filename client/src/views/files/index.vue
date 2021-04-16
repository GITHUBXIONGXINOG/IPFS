<template>
  <div class="files">
    <search />
    <div class="list">
      <!-- <div class="title">
        <list />
    
      </div> -->
      <PinInfo />

      <Upload />
        <List />

    </div>
  </div>
</template>
<script>
import Search from "../../components/search";
import List from '../../components/list'
import Upload from "../../components/upload";
import PinInfo from '../../components/pinInfo'
export default {
  data() {
    return {
    };
  },
  components: {
    Search,
    List,
    Upload,
    PinInfo,
  },
};
</script>
<style lang="scss" scoped>
.files {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list {
    height: 90%;
    display: block;
    position: relative;
    background-color: #fbfbfb;
  }
}
</style>