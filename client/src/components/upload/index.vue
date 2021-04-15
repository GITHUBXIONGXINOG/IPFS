<template>
  <div class="upload-panel">
    <!-- {{ fileList }} -->
    <!-- list-type="picture-card" -->
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
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->

    <div class="key_wrap">
      <el-input
        v-model="smKey"
        placeholder="请输入密钥"
        class="key_input"
        show-password
        onkeyup="this.value = this.value.replace(/[^\w.]/g,'');"
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
      uploadFlag: false,
      dialogImageUrl: "",
      // dialogVisible: false,
      uploadListFlag: true,
      uploadRuleFlag: true, //是否满足条件上传
    };
  },
  methods: {
    cleanData(type=0) {
      this.smKey = "";
      this.fileInfo = { hash: "", key: "" };
      if (type==1) {
          this.fileList = [];
      }
    
    },
    async UploadFile(param) {
      // console.log(param);
      var formData = new FormData();
      formData.append("file", param.file);
      formData.append("smKey", this.smKey);
      let res = await ajax("/api/upload", formData, "POST");
      if (res.hash) {
        //成功提交
        this.handle_success(res.hash);
        this.cleanData();
      }
      // console.log(res);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let panel = document.getElementsByClassName("el-upload--text");
      panel[0].setAttribute("class", "el-upload el-upload--text");
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
      this.uploadRuleFlag = false;
      let panel = document.getElementsByClassName("el-upload--text");
      panel[0].setAttribute("class", "el-upload el-upload--text hidden_style");
      // console.log("解密：" + decryptData_ECB("sS0IZivEHObrNLNestJxQA=="));
      // console.log("加密：" + encryptData_ECB(file));
      // let encryECB = encryptData_ECB(file)
      // debugger
      // let decryECB = decryptData_ECB(encryECB)
      // console.log('加密:',encryECB);
      // console.log('解密:',decryECB);
      // debugger
      //  let fr = new FileReader()
      //  console.log(fr);
      //  debugger
      //  console.log(file);
      //  let uploadfile = this.$refs.upload
      //  console.log(uploadfile);
      // fr.readAsDataURL(file)
      // fr.onloadend = function (e) {
      //   // console.log(fr.result)
      //   console.log(e.target);
      // }
      // fr.onerror = function (err) {
      //   console.error(err)
      // }
      // if(file){
      //   fr.readAsDataURL(file)
      // }
      return isLt2G;
    },
    //上传递交按钮
    submitUpload() {
      this.$refs.upload.submit();
    },
    //成功上传返回值
    handle_success(res) {
      // console.log(res);
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
          h("span", { style: "border:1px dotted #409EFF; border-radius:5px;" }, res),
          h("div", null),
          h(
            "span",
            {
              style:
                "display:inline-block;color: teal;user-select: none;width: 65px;",
            },
            "加密密钥 :"
          ),
          h("span", { style: "border:1px dotted #409EFF; border-radius:5px;" }, this.smKey),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = "执行中...";
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    //   debugger;
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // fileSet(file, fileList) {
    // //   console.log(file, fileList);
    // },
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
        // console.log(this.fileList);
        this.uploadRuleFlag = false;
      } else {
        this.uploadRuleFlag = true;
      }
    },
    // fileList(newValue, oldValue){
    //   console.log(newValue);
    // }
  },
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
  .el-upload--text {
    // border: 1px solid red;
    // width: 30rem;
    // height: 15rem;
    .el-upload-dragger {
      // border: 1px solid red;
      // width: 25rem;
      // height: 15rem;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
    }
  }
  /*   .el-upload--picture-card {
    width: 30rem;
    height: 20rem;
    .el-upload-dragger {
      width: 100%;
      height: 100%;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      .el-icon-upload {
        width: 100%;
        position: relative;
        &::before {
          font-size: 10rem;
          position: absolute;
          left: 0;
          right: 0;
          top: 30px;
          margin: auto;
        }
      }
      .el-upload__text {
        // margin-top: -30px;
        // font-size: 20px;
      }
    }
  }
  .el-upload-list--picture-card {
    position: absolute;
    z-index: 2;
    // width: 50%;
    // height: 100%;
    background-color: #fff;
    .is-ready,
    .is-success {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      max-width: 29rem;
      height: 100%;
      max-height: 19rem;
      // margin: 20px;
    }
    //     .is-success{
    // border: 1px solid red;

    // }
  } */
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
</style>