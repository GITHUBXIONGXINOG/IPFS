<template>
  <div class="upload-panel">
    <div class="upload-file-wrap">
      <el-upload
        class="upload-file"
        drag
        action="/api/upload"
        ref="upload"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="beforeUpload"
        :on-remove="handleRemove"
        name="upload_file"
        :http-request="UploadFile"
      >
        <!-- v-show="!fileList.length" -->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="upload_wrap" v-show="uploadProcess != 0">
        <div class="upload_progress_wrap" v-show="!encryProgress">
          <el-progress
            type="circle"
            :percentage="uploadProcess"
            class="upload_progress"
          ></el-progress>
          <div class="upload_text">上传中...</div>
        </div>
        <div class="encry_progress_wrap" v-show="encryProgress">
          <el-progress
            type="circle"
            :percentage="encryProgress"
            class="encry_progress"
            v-show="encryProgress != 100"
          ></el-progress>
          <el-progress
            type="circle"
            :percentage="100"
            class="encry_progress"
            status="success"
            v-show="encryProgress == 100"
          ></el-progress>
          <div class="upload_text">加密中...</div>
        </div>
      </div>
    </div>

    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->

    <div class="key_wrap">
      <el-input
        v-model="smKey"
        placeholder="请输入密钥"
        class="key_input"
        show-password
        maxlength="16"
        ref="key_input"
      ></el-input>
    </div>

    <el-button
      class="submit_button"
      size="small"
      type="info"
      :class="{ rule_style: submitRule }"
      @click="submitUpload"
      :disabled="uploadRuleFlag"
      >上传到服务器</el-button
    >
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
export default {
  data() {
    return {
      smKey: "",
      fileList: [],
      fileInfo: {
        hash: "",
        key: "",
      },
      // uploadFlag: false, //上传标记
      dialogImageUrl: "",
      // dialogVisible: false,
      uploadListFlag: true,
      uploadRuleFlag: true, //是否满足条件上传
      uploadProcess: 0, //上传进度条
      encryProgress: 0, //加密进度条
      encryStatus: "", //加密状态
    };
  },
  methods: {
    //获取加密进度
    GetEncryProgress() {
      let timer = null;
      let _self = this;
      return function () {
        timer = setInterval(async () => {
          let res = await ajax("/api/progress");
          // console.log(res);
          _self.encryProgress = res.progress;
          if (res.progress === 100) {
            // debugger;
            clearInterval(timer);
            _self.encryStatus = "success";
          }
        }, 1000);
      };
    },
    cleanData(type = 0) {
      this.smKey = "";
      this.fileInfo = { hash: "", key: "" };
      if (type == 1) {
        this.fileList = [];
      }
    },
    //自定义上传实现,点击提交按钮后触发
    async UploadFile(param) {
      // console.log(param);
      var url = "/api/upload";
      var formData = new FormData();
      formData.append("file", param.file);
      formData.append("smKey", this.smKey);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      let _self = this;
      // 添加 上传成功后的回调函数
      xhr.onload = function (e) {
        console.log("上传成功");
        _self.upload_success(e);
      };
      // 添加 上传失败后的回调函数
      xhr.onerror = function (e) {
        console.log("上传失败", e);
        _self.upload_failed(e);
      };
      // 添加 进度监听函数
      xhr.upload.onprogress = function (event) {
        // console.log(event.loaded);
        // console.log(event.total);
        if (event.loaded === event.total) {
          // console.log("hhhhhhhhhhh");

          // setInterval(async () => {
          //   let progress = await ajax("/api/progress");
          //   console.log(progress);
          // }, 1000);
          // debugger
          let encryProgress = _self.GetEncryProgress();
          encryProgress();
        }
        if (event.lengthComputable) {
          _self.uploadProcess = Math.floor((event.loaded / event.total) * 100);
          // 设置进度显示
          // console.log(_self.uploadProcess);
        }
        // if (_self.uploadProcess == 100) {
        //   // debugger
        //   // _self.uploadFlag = true;

        // }
      };
      xhr.send(formData);

      // let res = await ajax("/api/upload", formData, "POST");
      // if (res.hash) {
      //   //成功提交
      //   this.handle_success(res.hash);
      //   this.cleanData();
      //   this.uploadFlag = false;
      // }
      // console.log(res);
    },
    //成功上传返回值
    upload_success(e) {
      // console.log(res);
      // console.log("上传成功", e);
      // this.uploadFlag = false;
      let hash = JSON.parse(e.target.response).hash;
      const h = this.$createElement;
      this.$msgbox({
        title: "上传成功",
        message: h("p", null, [
          h(
            "span",
            {
              style:
                "display:inline-block;color: teal;user-select: none;width: 65px;",
            },
            "文件hash: "
          ),
          h(
            "span",
            { style: "border:1px dotted #409EFF; border-radius:5px;" },
            hash
          ),
          h("div", null),
          h(
            "span",
            {
              style:
                "display:inline-block;color: teal;user-select: none;width: 65px;",
            },
            "加密密钥 :"
          ),
          h(
            "span",
            { style: "border:1px dotted #409EFF; border-radius:5px;" },
            this.smKey
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
      }).then((action) => {
        this.encryProgress = 0;
        this.uploadProcess = 0;
        // this.$message({
        //   type: "info",
        //   message: "action: " + action,
        // });
      });
    },
    //上传失败回调函数
    upload_failed(e) {
      console.log("上传失败", e);
    },
    //进度监听函数
    // progressFunction(e) {
    //   console.log(e);
    //   console.log(e.loaded);
    //   console.log(e.total);
    // },

    //关闭上传文件列表
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let panel = document.getElementsByClassName("el-upload--text");
      panel[0].setAttribute("class", "el-upload el-upload--text");
      this.uploadProcess = 0;
      // this.smKey = ''
      this.cleanData(1);
    },
    //文件上传校验
    beforeUpload(file, files) {
      const isLt2G = file.size / 1024 / 1024 / 1024 / 2 < 1;
      if (!isLt2G) {
        this.$message.error("上传文件大小不能超过 2G!");
      }
      // debugger
      // console.log(file);
      // let img = document.getElementsByClassName('el-upload-list__item-thumbnail')
      // console.log(img.src);
      // img.src = ' '
      this.fileList = files;
      if (this.smKey) {
        this.uploadRuleFlag = false;
      }
      let panel = document.getElementsByClassName("el-upload--text");
      panel[0].setAttribute("class", "el-upload el-upload--text hidden_style");

      return isLt2G;
    },
    //上传递交按钮
    submitUpload() {
      //显示加载面板
      // this.uploadFlag = true;
      this.$refs.upload.submit();
    },
  },
  computed: {
    submitRule() {
      if (this.smKey) {
        // this.uploadRuleFlag = false
        return true;
      }
      return false;
    },
  },
  watch: {
    smKey(newValue, oldValue) {
      if (newValue && this.fileList.length === 1) {
        this.uploadRuleFlag = false;
      } else {
        this.uploadRuleFlag = true;
      }
    },
    // fileList(newValue, oldValue){
    //   console.log(newValue);
    // }
  },
  // mounted(){
  //    setInterval(async () => {
  //       let progress = await ajax("/api/progress");
  //       console.log(progress);
  //     }, 1000);
  // }
};
</script>

<style lang="scss" >
.upload-panel {
  //   border: 1px solid red;
  height: 30rem;
  width: 90%;
  //   padding: 0 200px;
  //   bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  //   z-index: -1;
}
.upload-file {
  height: 20rem;
  // border: 1px solid red;

  margin: 50px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .el-upload-list--text {
    // border: 1px solid red;
    // width: 100%;
    position: absolute;
    .is-ready,
    .is-success {
      // height: 10rem;
      // width: 25rem;
      font-size: 20px;
      background-color: #f5f7fa;
      box-shadow: 1px 1px 5px black;
      .el-icon-close {
        top: 10px;
        bottom: 0;
        margin: auto 0;
        &::before {
          top: 5px;
          bottom: 0;
          margin: auto 0;
          // font-size: 20px;
        }
      }
    }
    .is-success {
    }
  }
}
.key_wrap {
  margin: 0 0 50px;
}
.key_input {
  // border: 1px solid red;
  width: 500px;
}
//提交按钮样式
.submit_button {
  width: 200px;
  height: 50px;
  font-size: 18px;
  // pointer-events: none;
  // background-color: #c0c4cc;
}
.el-message-box__wrapper {
  .el-message-box {
    // width: 250px;
    width: 60%;
  }
}
.hidden_style {
  // pointer-events: none;
  visibility: hidden;

  // .el-icon-upload,
  // .el-upload__text {
  //   visibility: hidden;
  // }
}
.rule_style {
  pointer-events: painted;
  background-color: #409eff;
  &:hover {
    background: #3890e7;
  }
}
.el-loading-mask {
  width: 100%;
  height: 40rem;
  position: absolute;
  .el-loading-spinner {
    margin-top: -10rem;
  }
}
//上传进度
.upload_wrap {
  position: absolute;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 30%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  .upload_progress_wrap,
  .encry_progress_wrap {
    // border: 1px solid red;
    position: relative;
    // display: flex;
    // align-items: center;
    .upload_text {
      // border: 1px solid red;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20%;
      margin: auto;
    }
  }
 
}
</style>