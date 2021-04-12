<template>
  <div class="status">
    <section class="connect">
      <div class="info" v-if="connectFlag">
        <div class="title">已连接到 IPFS</div>
        <ul class="ipfsPanel">
          <li>
            <div class="name">节点 ID</div>
            <div class="show">
              <div>{{ nodeID.id }}</div>
            </div>
          </li>
          <li>
            <div class="name">代理</div>
            <div class="show">
              <div>{{ nodeID.agentVersion }}</div>
            </div>
          </li>
          <li>
            <div class="name">控制版本</div>
            <div class="show">
              <div>{{ nodeID.protocolVersion }}</div>
            </div>
          </li>
          <li>
            <div class="name">地址</div>
            <div class="show">
              <div v-for="(item, index) in nodeID.addresses" :key="index">
                {{ item }}
              </div>
            </div>
          </li>
          <li>
            <div class="name">公钥</div>
            <div class="show">{{ nodeID.publicKey }}</div>
          </li>
        </ul>
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
      connectFlag: false, //连接状态
      totalIn: 0, //接收总量
      totalOut: 0, //发送总量
      rateIn: 0, //接收速率
      rateOut: 0, //发送速率
      nodeID: "", //节点id
    };
  },
  // methods: {},
  mounted() {
    setInterval(async () => {
      try {
        this.nodeID = await ajax("/api/status");
        this.connectFlag = true;
      } catch (err) {
        console.error(err);
        this.connectFlag = false;
      }
    }, 10000);

    setInterval(async () => {
      // const response = await ajax("/api/status");
      try {
        const { totalIn, totalOut, rateIn, rateOut } = await ajax("/api/speed");
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.connect,
.bandwidth {
  width: 95%;
  padding: 20px 0;
  background-color: #fbfbfb;
}
.connect {
  height: 20rem;
  margin: 30px 0 10px;
  padding-right: 20px;
  box-sizing: border-box;
  .info {
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      font-size: 28px;
    }
    .ipfsPanel {
      // width: 90%;
      overflow: hidden;
      margin: 10px 0;
      li {
        display: flex;
        margin: 15px 0;
        width: 100%;
        .name {
          width: 100px !important;
          display: flex;
          margin: 0 10px 0 0;
          color: #ababab;
        }
        .show {
          width: 100%;
          word-break: break-all;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          div {
            display: flex;
            margin: 1px 0;
          }
        }
      }
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