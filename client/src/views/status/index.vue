<template>
  <div class="status">
    <search />

    <section class="connect">
      <div class="info" v-if="connectFlag">
        <div class="title">已连接到 IPFS</div>
        <ul class="ipfsPanel">
          <li>
            <div class="name">节点 ID</div>
            <div class="show">
              <div>{{ nodeID.id || "查找中" }}</div>
            </div>
          </li>
          <li>
            <div class="name">代理</div>
            <div class="show">
              <div>{{ nodeID.agentVersion || "查找中" }}</div>
            </div>
          </li>
          <li>
            <div class="name">控制版本</div>
            <div class="show">
              <div>{{ nodeID.protocolVersion || "查找中" }}</div>
            </div>
          </li>
          <!-- <li>
            <div class="name">地址</div>
            <div class="show" v-show="nodeID.addresses">
              <div v-for="(item, index) in nodeID.addresses" :key="index">
                {{ UintToString(item.bytes) }}
              </div>
            </div>
          </li> -->
          <li>
            <div class="name">公钥</div>
            <div class="show">{{nodeID.publicKey || "查找中" }}</div>
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
      <div class="dashboard_panel">
        <div class="rateOut">
          <el-progress
            type="dashboard"
            :percentage="percentageSet(rateOut)"
            :color="colors"
            stroke-linecap="round"
            :stroke-width="18"
            :format="formText(rateOut)"
            :width="250"
            :height="250"
          ></el-progress>
          <span>发送</span>
        </div>
        <div class="rateIn">
          <el-progress
            type="dashboard"
            :percentage="percentageSet(rateIn)"
            :color="colors"
            :show-text="true"
            stroke-linecap="round"
            :stroke-width="18"
            :format="formText(rateIn)"
            :width="250"
            :height="250"
          >
          </el-progress>
          <span>接收</span>
        </div>
      </div>

      <!--  totalIn:{{ totalIn }} <br />
      totalOut: {{ totalOut }}<br />
      rateIn: {{ rateIn }}<br />
      rateOut: {{ rateOut }}<br /> -->
    </section>
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
import Search from "../../components/search";
const {ipcRenderer} = window.require('electron');
// import  ipcRenderer from 'electron'
export default {
  data() {
    return {
      connectFlag: false, //连接状态
      totalIn: 0, //接收总量
      totalOut: 0, //发送总量
      rateIn: 0, //接收速率
      rateOut: 0, //发送速率
      nodeID: "", //节点id
      percentage: 0, //速度进度
      inPercentage: 0, //传入进度
      outPercentage: 0, //传出进度
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  methods: {
    formText(rate) {
      return function () {
        if (rate < 1024) {
          return `${Math.floor(rate)} b/s`;
        } else if (rate >= 1024 && rate < 1024 * 1024) {
          return `${Math.floor(rate / 100)} kb/s`;
        } else if (rate >= 1024 * 1024 && rate < 1024 * 1024 * 1024) {
          return `${Math.floor(rate / (100 * 1024))} mb/s`;
        }
        return `0 b/s`;
      };
    },
    // UintToString(unit){
    //     var dataString = "";
    //    for (var i = 0; i < unit.length; i++) {
    //    dataString += String.fromCharCode(unit[i]);
    //    }
 
    //   return dataString
    // }
  },
  mounted() {
// const {ipcRenderer} = window.require('electron');
// window.require()
    
    setInterval(async () => {
      try {
        // this.nodeID = await ajax("/api/status");
        // this.nodeID = await ajax("/api/status");
        // this.nodeID = '1'
        ipcRenderer.invoke('status').then((res)=>{
          // console.log(res);
          this.nodeID = res
        })

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
    }, 100000);
  },
  computed: {
    percentageSet() {
      return function (rate) {
        // return 0
        // console.log(rate);
        if (rate < 1024) {
          return rate / 100;
        } else if (rate >= 1024 && rate < 1024 * 1024) {
          return rate / 1024;
        } else if (rate >= 1024 * 1024 && rate < 1024 * 1024 * 1024) {
          return rate / (1024 * 1024 * 1024);
        }
        return 0;
      };
    },
  },
  components: {
    Search,
  },
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

        margin: 0px 0;
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
}
.bandwidth {
  height: 20rem;
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.dashboard_panel {
  width: 100%;
  display: flex;
  div {
    // border: 1px solid red;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    span {
      display: flex;
      // border: 1px solid red;
      position: absolute;
      bottom: 10%;
    }
  }
}
.search{
  width: 100%;
  height: 20%;
}
</style>