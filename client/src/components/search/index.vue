<template>
  <div class="search">
    <div class="part">
      <input type="text" placeholder="QmHasg/bafyHash" v-model="searchText" />
      <div
        class="button"
        @click="submitSearch"
        :class="{ searchStyle: searchRule }"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfiles"></use></svg
        >浏览
      </div>
    </div>
    <div class="upload">
      <section class="panel_down" v-show="panelFlag === true">
        <!-- <img :src="imgurl" alt="" style="display: block" /> -->
        <!-- <section class="info">
        <a :href="downloadUrl" :download="downloadfilename" @click="Download">
          <el-button>点击下载到本地 </el-button>
        </a>
        </section> -->
        <el-table :data="tableData" style="width: 100%" class="fileInfo">
          <el-table-column prop="name" label="" width="180"> </el-table-column>
          <el-table-column prop="value" label=""> </el-table-column>
        </el-table>
        <div class="download_button" >
          <!-- <el-button class="down" @click="clickGET">点击下载到本地 </el-button> -->
          <el-button-group>
          <el-button type="primary" icon="el-icon-download" @click="clickGET"></el-button>
          <el-button type="primary" icon="el-icon-close"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>
        </div>
        <!-- <el-row>
          <el-button type="primary">下载文件</el-button>
          <el-button type="info">关闭面板</el-button>
          <el-button type="danger">删除文件</el-button>
        </el-row> -->
        
      </section>
    </div>
    <!-- <el-button @click="clickGET">点击下载到本地 </el-button> -->
    <!-- <a
      href="javascript:;"
      :download="downloadfilename"
      @click="clickGET"
      ref="aSet"
    >
      <el-button>点击下载到本地 </el-button>
    </a> -->
    <!-- <a :href="/api" ref = "aSet" download="1.png" @click="clickGET">dianji </a> -->
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
export default {
  methods: {
    handleClose() {
      this.panelFlag = false;
      this.hashInfo = "";
    },
    async submitSearch() {
      //输入数量为46且限制范围
      if (this.searchRule) {
        const loading = this.$loading({
          lock: true,
          text: "正在节点中搜索...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
        this.fileInfo = await ajax("/api/search", { hash: this.searchText });
        console.log(this.fileInfo);
        this.tableData.forEach((item, index) => {
          // console.log(item);
          // console.log(item.value);
          if (index === 0) {
            item.value = this.searchText || this.hashInfo;
          } else {
            item.value = this.fileInfo[item.key];
          }
        });
        //QmPtRWBink1ic4sp2RrQVYPXzPqWLjiwcnTWZV4bH36pB5
        // let image = await ajax("/api/search", { hash: this.searchText });
        // console.log(this.resFile);
        // console.log(image.length);
        // this.imgurl = "data:image/png;base64," + image;
        // this.imgurl = image;

        if (this.fileInfo) {
          // this.downLoadImage(this.imgurl);
          this.panelFlag = true;
          this.hashInfo = this.searchText;
          this.searchText = "";
        }
      }
    },
    async downLoadImage(imgUrl) {
      let timestamp = new Date().getTime();
      // let name = imgUrl.substring(22, 30) + timestamp + ".png";
      let name = timestamp + ".png";

      this.downloadUrl = imgUrl;
      console.log(this.downloadUrl);
      this.downloadfilename = name;
    },
    Download() {
      // debugger

      this.downLoadImage(this.imgurl);
      this.panelFlag = false;
    },
    async clickGET() {
      // window.open(this.testUrl)
      let downloadUrl = await ajax("/api/download", { hash: this.hashInfo});
      
      // let downloadUrl = await ajax("/api/download", { url: this.fileInfo.downloadUrl });
      // let downloadUrl = await this.imgGetUrl;
      console.log(downloadUrl);
      // console.log(res);
      // this.$refs.aSet.href = res;
      // console.log(this.$refs.aSet);
      // // this.$refs.aSet.click()
      const a = document.createElement("a");
      a.href = downloadUrl;
      // a.href = this.testUrl
      a.setAttribute("download", "chart-download");
      a.click();
    },
  },
  data() {
    return {
      searchText: "", //搜索hash
      imgurl: null, //图片地址
      panelFlag: false, //显示面板
      downloadUrl: null, //下载地址
      downloadfilename: null, //图片名
      hashInfo: "", //显示hash信息
      fileInfo: {}, //文件信息
      tableData: [
        {
          name: "HASH",
          key: "hash",
          value: "",
        },
        {
          name: "文件名字",
          key: "name",

          value: "",
        },
        {
          name: "文件大小",
          key: "size",

          value: "",
        },
        {
          name: "文件类型",
          key: "type",

          value: "",
        },
        {
          name: "上次修改时间",
          key: "lastModifiedDate",
          value: "",
        },
      ],
      testUrl: 'https://todo-1258496109.cos.ap-chengdu.myqcloud.com/uploads/upload_02ab40edf0d28434279e0adddafdf9f9.png'
    };
  },
  components: {
    // Upload
  },
  computed: {
    searchRule() {
      if (this.searchText.trim().match("^[A-Za-z0-9]{46}$")) {
        return true;
      }
      return false;
    },
    imgGetUrl() {
      //  debugger
      let image = ajax("/api/search", { hash: this.searchText });
      // console.log(image);
      return image;
    },
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
  width: 15%;
  height: 100%;
  border: 3px solid #dee0e7;
  border-radius: 3px;
  border-left: none;
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
    border: 1px solid red;

    width: 100%;
    height: 40rem;
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
    justify-content: center;
    align-items: center;

    img {
      // width: 500px;
      width: 50%;
      max-width: 500px;
      // height: 50%;
      left: 0;
      right: 0;
      margin: 5rem auto 1rem;
    }
    a {
      width: 140px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .download_button {
      // border: 1px solid red;
      position: absolute;
      .down{
        // border: 1px solid red;
        font-size: 16px;
      }
    }
  }
}
.searchStyle {
  background-color: #4a8c91;
  border-color: #4a8c91;
  border-width: 2px;
  &:hover {
    cursor: pointer;
  }
}

.hash_tag {
  width: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.fileInfo {
  background-color: #fbfbfb;
  .el-table__header-wrapper {
    display: none;
  }
  .el-table__body-wrapper {
    padding: 0 20px;
    margin: 10px 0;
    .el-table_2_column_3 {
      font-weight: bold;
    }
  }
}
</style>