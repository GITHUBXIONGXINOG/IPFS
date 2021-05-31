<template>
  <div class="file_info">
    <table class="file_list">
      <tr class="file_img">
        <td>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="imgForType"></use>
          </svg>
        </td>
      </tr>
      <tr>
        <td>文件hash</td>
        <td>{{ fileInfo().hash }}</td>
      </tr>
      <tr>
        <td>文件名字</td>
        <td>{{ fileInfo().name }}</td>
      </tr>
      <tr>
        <td>文件大小</td>
        <td>{{ fileInfo().size }}</td>
      </tr>
      <tr>
        <td>文件类型</td>
        <td>{{ fileInfo().type }}</td>
      </tr>
      <tr>
        <td>修改时间</td>
        <td>{{ fileInfo().lastModifiedDate }}</td>
      </tr>
      <tr>
        <td>解密密钥</td>
        <td>
          <el-input
            placeholder="请输入密钥"
            v-model="smKey"
            class="input_key"
            onkeyup="this.value = this.value.replace(/[^\w.]/g,'');"
            maxlength="16"
            clearable
          ></el-input>
          <el-button-group class="open_panel">
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="clickGET"
              :disabled="clickFlag"
              title="下载到本地"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="deleteIPFS"
              title="删除IPFS固定"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-close"
              @click="closeFilePanel"
              title="关闭"
            ></el-button>
          </el-button-group>
        </td>
      </tr>
      <div class="progress_wrap" v-show="decryProcess">
      <el-progress :percentage="decryProcess" :format="progressformat"></el-progress>

      </div>
    </table>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import ajax from "../../utils/ajax";
export default {
  props: {
    // data: Array,
  },
  data() {
    return {
      smKey: "", //输入密钥
      uploadListFlag: true,
      uploadRuleFlag: true, //是否满足条件上传
      uploadProcess: 0, //上传进度条
      decryProcess: 0, //加密进度条
      encryStatus: "", //加密状态
      uploadFlag: false, //上传标记
    };
  },
  methods: {
    ...mapMutations(["changeFilePanel"]),
    ...mapState({
      fileInfo: "fileInfo",
    }),
  progressformat(percentage){
    if(!percentage){
      return ' '
    }else{
      return percentage === 100 ? '解压完成' : `解压中${percentage}%`
    }
  },
 
    //点击下载文件
    async clickGET() {
      if (this.smKey) {
     
        let _self = this;
 
        let file = "";
        let downloadFile = await ajax(
          "/api/download",
          {
            hash: this.fileInfo().filehash,
          },
          "POST"
        );
        // debugger;
        if (downloadFile.Error) {
          if (downloadUrl.Code === "401") {
            this.$message.error("服务端解压失败,密钥错误!");
          }
        } else {
          // this.smKey = "";
          //创建子线程
          let worker = new Worker("/utils/encryWork.js");
          // debugger
          worker.postMessage({ file: downloadFile, key: _self.smKey, flag: 1 });
          worker.onmessage = function (event) {
            if (event.data.progress <= 100 && !event.data.encryData) {
              // console.log("加密的数据进度:", event.data.progress);
              _self.decryProcess = Math.floor(event.data.progress * 100);
            }
            if (event.data.decryptData) {
              // debugger
              // console.log("加密数据:", event.data.encryData);
              //上传标记
              _self.uploadFlag = true;
              _self.file = event.data.decryptData;
              // debugger;
              _self.downloadFileByBase64(
                event.data.decryptData,
                _self.fileInfo().name
              );
              worker.terminate()
              // _self.formSubmit(event.data.decryptData, fileInfo);
            }
          };
        }
      } else {
        this.$message.error("请输入密钥");
      }
    },

    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    downloadFile(url, name = "What's the fuvk") {
      var a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", name);
      a.setAttribute("target", "_blank");
      let clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent("click", true, true);
      a.dispatchEvent(clickEvent);
    },
    downloadFileByBase64(base64, name) {
      var myBlob = this.dataURLtoBlob(base64);
      var myUrl = URL.createObjectURL(myBlob);
      this.downloadFile(myUrl, name);
    },
    //删除ipfs固定
    async deleteIPFS() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await ajax("/api/delete", { hash: this.fileInfo().hash });
          this.smKey = "";
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.changeFilePanel(false);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      // let req = await ajax("/api/delete", { hash: this.fileInfo().hash });
      // console.log(req);
      // // this.panelFlag = false;
      // this.changeFilePanel(false)
    },
    //关闭面板
    closeFilePanel() {
      // debugger;
      this.changeFilePanel(false);
      this.smKey = "";
      this.decryProcess = 0
    },
  },
  computed: {
    clickFlag() {
      if (this.smKey) {
        return false;
      }
      return true;
    },
    //文件类型缩略图
    imgForType() {
      switch (this.fileInfo().type) {
        case "text/plain":
          return "#iconTXTCopy";
        case "application/pdf":
          return "#iconPdf";
        case "video/mp4":
          return "#iconMP4";
        case "image/png":
        case "image/jpeg":
        case "image/x-icon":
          return "#icontupian";
        case "text/html":
          return "#iconHTML";
        case "application/x-zip-compressed":
          return "#iconzip";
        case "application/octet-stream":
          return "#iconexe";
        case "audio/mpeg":
          return "#iconMP";
        default:
          return "#iconfiles";
      }
    },
  },
  mounted() {
    // debugger
    // var ws = new WebSocket("ws://localhost:3001",'echo-protocol');
    // ws.onopen = function (evt) {
    //   console.log("Connection open ...");
    //   ws.send("Hello WebSockets!");
    // };
    // ws.onmessage = function (evt) {
    //   console.log("Received Message: " + evt.data);
    //   // ws.close();
    // };
    // ws.onclose = function (evt) {
    //   console.log("Connection closed.");
    // };
  },
};
</script>
<style lang="scss" >
.file_info {
  // border: 1px solid #eee;
  // border: 1px solid red;

  height: 100%;
  width: 100%;
  z-index: 300;
  position: absolute;
  left: 0;
  top: 1rem;
  background-color: #fff;
  margin: 10% 0;
  display: flex;
  justify-content: center;
  // align-items: center;
}

.file_list {
  // border: 1px solid red;
  width: 70%;
  border: 1px solid #ebeef5;
  font-size: 18px;
  tr {
    // border: 1px solid red;
    border-top: 1px solid #ebeef5;
    display: flex;
    align-items: center;
    height: 3rem;
    // padding-left: 15px;

    td {
      // border: 1px solid black;
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      position: relative;
      &:first-child {
        // border: 1px solid black;
        width: 7rem;
        // margin: 0 20px;
        display: flex;
        pointer-events: none;
        justify-content: center;
      }
      &:last-child {
        padding: 0 0 0 20px;
      }
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
//图标
.file_img {
  height: 100% !important;
  display: flex;
  justify-content: center;
  svg {
    font-size: 8rem;
  }
}
//输入框
.input_key {
  left: 0;
  top: 0;
  height: 100%;
  width: 42% !important;
  display: flex;
  align-items: center;
  margin-right: 10px;
  input {
    letter-spacing: 2px;
  }
}
.open_panel {
  right: 2rem;
  position: absolute;
}
//清除浮动
.clear_float {
  &::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
.progress_wrap{
  // border: 1px solid red;
  margin: 10px;
  // width: 100%;
}

</style>