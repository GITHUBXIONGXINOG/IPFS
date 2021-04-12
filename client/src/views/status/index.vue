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
        <div class="errTitle">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjinggao"></use>
          </svg>
          无法连接到IPFS API
        </div>
        <ul>
          <li>参考在IPFS Docs上的安装指南，或者尝试一下这些常规解决办法:</li>
          <li>
            1.您的IPFS后台守护进程有正常运行吗？尝试从命令行终端内开启或者重新启动它
          </li>
          <li>
            2.requests【跨域请求】?如果没有，从命令行终端内执行这些命令然后再启动你的IPFS守护进程
          </li>
        </ul>
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
    .errTitle {
      font-size: 30px;
      color: #ea5037;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
      width: 80%;
      margin: 20px 60px;
      li {
        display: flex;

        margin: 20px 0;
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
}
.bandwidth {
  height: 25rem;
}
</style>