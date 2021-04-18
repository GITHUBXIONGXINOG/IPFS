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
    </table>
    <!-- {{fileInfo()}} -->
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
    };
  },
  methods: {
    ...mapMutations(["changeFilePanel"]),
    ...mapState({
      fileInfo: "fileInfo",
    }),
 
    // connectWebSockets() {
    //   var ws = new WebSocket("ws://localhost:3001","echo-protocol");
    //   ws.onopen = function (evt) {
    //     console.log("Connection open ...");
    //     ws.send("Hello WebSockets!");
    //   };

    //   ws.onmessage = function (evt) {
    //     console.log("Received Message: " + evt.data);
    //     // ws.close();
    //   };
    //   let _self = this
    //   ws.onclose = function (evt) {
    //     console.log("Connection closed.");
    //     _self.connectWebSockets()
    //   };
    // },
    //点击下载文件
    async clickGET() {
      if (this.smKey) {
        // debugger
        // console.log(this.fileInfo);
        // console.log(this.fileInfo());
        // debugger
        let _self  = this
        // setInterval(()=>{
        //   _self.connectWebSockets()
        // },2000)
        // for (var i = 0; i < 10; i++) {
          
        // }
          // _self.connectWebSockets()

        let downloadUrl = await ajax(
          "/api/download",
          {
            hash: this.fileInfo().filehash,
            key: this.smKey,
          },
          "POST"
        );
        if (downloadUrl.Error) {
          if (downloadUrl.Code === "401") {
            this.$message.error("服务端解压失败,密钥错误!");
          }
        } else {
          this.smKey = "";
          let name = this.fileInfo().name;
          var x = new XMLHttpRequest();
          x.open("GET", downloadUrl, true);
          x.responseType = "blob";
          x.onload = function () {
            var url = window.URL.createObjectURL(x.response);
            var a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.click();
          };
          x.send();
        }
      } else {
        this.$message.error("请输入密钥");
      }
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
</style>