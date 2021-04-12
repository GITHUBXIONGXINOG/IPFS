<template>
  <div class="status">
    <section class="connect">
      <div class="info" v-if="connectFlag">
        <div class="title">已连接到 IPFS</div>
      </div>
      <div class="infoErr" v-else>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconjinggao"></use>
        </svg>
        无法连接到IPFS API
      </div>
    </section>
    <section class="bandwidth">
      totalIn:{{ totalIn }} <br />
      totalOut: {{ totalOut }}<br />
      rateIn: {{ rateIn }}<br />
      rateOut: {{ rateOut }}<br />
    </section>
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
export default {
  data() {
    return {
      connectFlag: false,
      totalIn: 0,
      totalOut: 0,
      rateIn: 0,
      rateOut: 0,
    };
  },
  // methods: {},
  mounted() {
    setInterval(async () => {
      // const response = await ajax("/api/status");
      try {
        const { totalIn, totalOut, rateIn, rateOut } = await ajax(
          "/api/status"
        );
        (this.totalIn = totalIn),
          (this.totalOut = totalOut),
          (this.rateIn = rateIn),
          (this.rateOut = rateOut);
        this.connectFlag = true;
      } catch (err) {
        console.error(err);
        this.connectFlag = false;
      }
    }, 1000);
  },
  // computed:{
  //   rate:{

  //   }
  // }
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
  .info {
    display: flex;
    .title {
      font-size: 28px;
    }
  }
  .infoErr {
    font-size: 30px;
    color: #ea5037;
  }
}
.bandwidth {
  height: 25rem;
}
</style>