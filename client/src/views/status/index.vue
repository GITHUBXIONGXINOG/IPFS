<template>
  <div class="status">
    <section class="connect">connect</section>
    <section class="bandwidth">bandwidth</section>
  </div>
</template>
<script>
export default {
    data(){
        return{
            a:''
        }
    },

};
</script>
<style lang="scss" scoped>
.status {
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.connect,
.bandwidth {
  border: 1px solid red;
  width: 95%;
  padding: 20px 0;
}
.connect {
    height: 20rem;
    margin: 30px 0 10px;
}
.bandwidth {
    height: 25rem;
}
</style>