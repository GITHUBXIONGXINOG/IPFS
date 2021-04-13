<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="文件">
      <!-- <el-input v-model="formInline.file" placeholder="审批人"></el-input> -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="fileSet"
        name="upload_file"
        multiple
      >
      <!--    accept="image/jpeg,image/gif,image/png,image/bmp" -->
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="密钥">
      <el-input v-model="formInline.key" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        file: "",
        key: "",
      },
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
      fileSet(file,fileList){
        console.log(file, fileList);
      }
  },
};
</script>