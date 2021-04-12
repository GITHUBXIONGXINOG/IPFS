<template>
  <div class="files">
    <search />
    <div class="list">
      <div class="title">
        <list />
    
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../../components/search";
import List from '../../components/list'
export default {
    data(){
        return{
            list : [1,2,3,4,5,6]
        }
    },
  components: {
    Search,
    List
  },
};
</script>
<style lang="scss" scoped>
.files {
  border: 1px solid red;
  width: 100%;
}
</style>