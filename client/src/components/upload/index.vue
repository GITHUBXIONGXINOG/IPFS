<template>
  <div class="upload-panel">
    <el-upload
      class="upload-file"
      drag
      action="/api/upload"
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="fileSet"
      name="upload_file"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <!-- <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="fileSet"
        name="upload_file"
        :data="smKey"
        multiple
        drag
      > -->
    <!--    accept="image/jpeg,image/gif,image/png,image/bmp" -->
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
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
export default {
  data() {
    return {
      //   formInline: {
      //     file: "",
      //     key: "",
      //   },
      smKey: "",
      fileList: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    fileSet(file, fileList) {
      console.log(file, fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.key_wrap{
    margin: 0 0 50px;
}
.key_input {
  // border: 1px solid red;
  width: 500px;
}
.submit_button{
    width: 200px;
    height: 50px;
    font-size: 18px;
}
</style>