<template>
  <div class="search">
    <div class="part">
      <input type="text" placeholder="QmHasg/bafyHash" v-model="searchText" />
      <div class="button" @click="submitSearch">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfiles"></use></svg
        >浏览
      </div>
    </div>
    <div class="upload">
      <!-- <label for="upload_button" class="upload_input"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#iconjia"></use></svg
        >上传文件</label
      >
      <input type="file" id="upload_button" /> -->
      <!-- <Upload /> -->
      <!-- {{ resFile }} -->
      <p class="panel_down" v-show="panelFlag == true">
        <!-- <p class="panel"> -->
        <img :src="imgurl" alt="" style="display: block" />
        <a :href="downloadUrl" :download="downloadfilename" @click="Download">
          <el-button>点击下载到本地 </el-button>
        </a>

        <!-- <el-button type="info" @click="bxz">关闭 </el-button> -->
      </p>
    </div>
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
// import Upload from '../upload'
export default {
  methods: {
    async submitSearch() {
      //输入数量为46且限制范围
      if (
        this.searchText.trim().length === 46 &&
        this.searchText.match("[A-Za-z0-9]{46}")
      ) {
        //QmPtRWBink1ic4sp2RrQVYPXzPqWLjiwcnTWZV4bH36pB5
        let image = await ajax("/api/search", { hash: this.searchText });
        // console.log(this.resFile);
        // console.log(image);
        this.imgurl = "data:image/png;base64," + image;
        this.downLoadImage(this.imgurl);
        this.panelFlag = true;
      }
    },
    downLoadImage(imgUrl) {
      let timestamp = new Date().getTime();
      let name = imgUrl.substring(22, 30) + timestamp + ".png";
      this.downloadUrl = imgUrl;
      this.downloadfilename = name;
    },
    Download() {
      // debugger
      this.panelFlag = false;
    },
  },
  data() {
    return {
      searchText: "", //搜索hash
      imgurl: null, //图片地址
      panelFlag: false, //显示面板
      downloadUrl: null, //下载地址
      downloadfilename: null, //图片名
    };
  },
  components: {
    // Upload
  },
};
</script>
<style lang="scss">
.search {
  height: 5rem;
  background-color: #f0f6fa;
  display: flex;
  align-items: center;
  position: relative;
}
.part {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  height: 40%;
  margin: 0 0 0 30px;
  input {
    background-color: #fff;
    border-radius: 3px;
    border-right: none;
    width: 90%;
    height: 100%;
    &:focus {
      border: 2px solid #ccc;
      border-right: none;
    }
  }
}

.button {
  width: 10%;
  height: 100%;
  border: 2px solid #dee0e7;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee0e7;
  color: #f7f8fa;
  svg {
    margin: 0 5px;
  }
}
.upload {
  #upload_button {
    display: none;
  }
  .upload_input {
    display: flex;
    width: 150px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #234d64;
    color: #fff;
    border-radius: 3px;
    margin: 0 0 0 10px;
    &:hover {
      cursor: pointer;
      background-color: #0b3a53;
    }
  }
  svg {
    width: 20px;
    fill: #77c8d1;
  }

  .panel_down {
    width: 100%;
    height: 50rem;
    position: absolute;
    background-color: #fbfbfb;
    left: 0;
    right: 0;
    top: 5rem;
    bottom: 0;
    // margin: auto;
    z-index: 1;
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;

    img {
      // width: 500px;
      width: 50%;
      max-width: 500px;
      // height: 50%;
      left: 0;
      right: 0;
      margin: 8rem auto 2rem;
    }
    a {
      width: 140px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>