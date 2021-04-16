<template>
  <div class="files">
    <search />
    <div class="list">
      <!-- <div class="title">
        <list />
    
      </div> -->
      <PinInfo />

      <Upload />
      <List v-show="filePanel"/>
    </div>
  </div>
</template>
<script>
import Search from "../../components/search";
import List from "../../components/list";
import Upload from "../../components/upload";
import PinInfo from "../../components/pinInfo";
import {mapGetters,mapState} from 'vuex'
export default {
  data() {
    return {};
  },
  components: {
    Search,
    List,
    Upload,
    PinInfo,
  },
  computed:{
  //  ...mapGetters([
  //     'getFilePanelFlag'
  //  ]),
   ...mapState({
     filePanel:'filePanel'
   })
  }
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