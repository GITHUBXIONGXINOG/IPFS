<template>
  <div class="vueWorker">vueWorker
      {{fileData}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      worker: null,
    };
  },
  created() {
      this.worker = this.$worker.create([
          {
              message: 'pull-data',
              func(data){
                  let res = 1
                  for (var i = 0; i < 100; i++) {
                      res *= data
                  }
                  
                  return res
              }
          }
      ])
  },
  props:['fileData'],
  mounted() {
    //   debugger
    // let data = parseInt(this.fileData)
    let data = 100
      this.worker.postMessage('pull-data',[data])
      .then(
          (res) => console.log(res)
      )
      .catch((e) => console.log(e));
  },
  destroyed() {
    this.worker = null;
  },
};
</script>
