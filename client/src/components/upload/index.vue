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
      :on-success="handle_success"
      :on-change="beforeUpload"
      :on-remove="handleRemove"
      name="upload_file"
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
      ></el-input>
    </div>

    <el-button
      class="submit_button"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </div>
</template>
<script>
import { encryptData_ECB, decryptData_ECB } from "../../utils/SM4Util";
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
    };
  },
  methods: {
 
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let panel = document.getElementsByClassName("el-upload--text");
      panel[0].setAttribute("class", "el-upload el-upload--text");
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
      // let fr = new FileReader();
      // console.log(fr);
      // <input type="file" name="upload_file" class="el-upload__input">
      // debugger;
      // console.log(file);
      // let uploadfile = document.getElementsByClassName('el-upload__input').files[0];
      // console.log(uploadfile);
      // let file = this.$refs.upload
      // debugger
      // let fr = new FileReader()
      // fr.readAsDataURL(file)
      // fs.onload(function () {
      //   console.log(fr.result)
      // })
      // console.log(file);
      // console.log("解密：" + decryptData_ECB("4ncw+RSEdPY/gnet0Usv0LEtCGYrxBzm6zSzXrLScUA="));
      // console.log("加密：" + encryptData_ECB("2477.39713035076"));

      // this.$alert(this.uploadPanelInfo, "文件上传成功", {
      //   confirmButtonText: "确定",
      //   callback: () => {
      //     // this.$message({
      //     //   type: "info",
      //     //   message: `action: ${action}`,
      //     // });
      //   },
      // });
    },
    //成功上传返回值
    handle_success(res) {
      console.log(res);
      const h = this.$createElement;
      this.$msgbox({
        title: "上传成功",
        message: h("p", null, [
          h("span", { style: "color: teal" }, "文件hash:"),
          h("span", { style: "margin: 0 10px" }, res),
          h("div", null),
          h("i", { style: "color: teal" }, "加密密钥"),
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
  mounted() {
    // let data = `https://todo-1258496109.cos.ap-chengdu.myqcloud.com/uploads/upload_02ab40edf0d28434279e0adddafdf9f9.png`;
    // console.log("加密：" + encryptData_ECB(data));
    // console.log(
    //   "解密：" + decryptData_ECB("1xtLFzaFA9zRrY6idUDjsGrZyCHmEXKP105wep494jZ88R7TJX2qtPkFAE0L7nVtaNuffLUSCOJNjRRGzxpP2hfHIcrPjCslT5RJcjZ6BoHB6G46ROubmaNOwHVsYUfmniujJ5GnfgmAIyhBTK/kTg==")
    // );
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
.submit_button {
  width: 200px;
  height: 50px;
  font-size: 18px;
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
</style>