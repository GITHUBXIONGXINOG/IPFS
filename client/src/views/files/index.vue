<template>
  <div class="files">
    <search />
    <div class="list">
      <!-- <div class="title">
        <list />
    
      </div> -->
      <Upload />
    </div>
  </div>
</template>
<script>
import Search from "../../components/search";
// import List from '../../components/list'
import Upload from '../../components/upload'
export default {
    data(){
        return{
            list : [1,2,3,4,5,6]
        }
    },
  components: {
    Search,
    // List,
    Upload
  },
};
</script>
<style lang="scss" scoped>
.files {
  border: 1px solid red;
  width: 100%;
}
</style>