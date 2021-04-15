<template>
  <div class="upload-panel">
    <el-upload
      class="upload-file"
      drag
      action="/api/upload"
      ref="upload"
      :on-preview="handlePreview"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handle_success"
      :before-upload="beforeUpload"
      name="upload_file"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

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
    <!-- <div class="submit_success_panel"></div> -->

    <!-- <el-alert
      class="success_info"
      title="上传成功,请保留HASH和KEY"
      type="success"
      :description='fileInfo'
      show-icon
      v-show="uploadFlag"
    >
    </el-alert> -->
    <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   formInline: {
      //     file: "",
      //     key: "",
      //   },
      smKey: "",
      fileList: [],
      fileInfo: {
        hash: "",
        key: "",
      },
      uploadFlag: false,
    };
  },
  methods: {
    beforeUpload(file) {
      // debugger
      //   const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt2G = file.size / 1024 / 1024 / 1024 / 2 < 1;

      //   if (!isIMAGE) {
      //     this.$message.error('上传文件只能是图片格式!');
      //   }
      if (!isLt2G) {
        this.$message.error("上传文件大小不能超过 2G!");
      }
      return isLt2G;
    },
    submitUpload() {
      this.$refs.upload.submit();

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
          h("span", {style: "margin: 0 10px"}, res),
          h("div",null),
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
    handlePreview(file) {
      console.log(file);
    },
    // fileSet(file, fileList) {
    // //   console.log(file, fileList);
    // },
  },
  // computed: {
  //   uploadPanelInfo() {
  //     return `<h2>sdvsd</h2>`;
  //   },
  // },
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
  height: 18rem;
  margin: 50px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
.el-message-box__wrapper{
 .el-message-box {
  // width: 250px;
  width: 60%;
}
}

</style>