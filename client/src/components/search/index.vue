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
      <!--       <section class="panel_down" v-show="panelFlag === true">
        <div class="table_wrap">
          <el-table :data="tableData" style="width: 100%" class="fileInfo">
            <el-table-column prop="name" label="" width="180">
            </el-table-column>
            <el-table-column prop="value" label=""> </el-table-column>
          </el-table>
          <el-input
            placeholder="请输入密码"
            v-model="smKey"
            show-password
            class="input_key"
            onkeyup="this.value = this.value.replace(/[^\w.]/g,'');"
            maxlength="16"
          ></el-input>
          <div class="download_button">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="clickGET"
                :disabled="keyFlag"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="deleteIPFS"
                :disabled="keyFlag"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-close"
                @click="panelFlag = false"
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </section> -->
      <!-- <List :data="tableData"/> -->
      <!-- {{tableData}} -->
    </div>
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
// import List from "../list";
import {mapMutations} from 'vuex'
export default {
  //QmaL3qoxGE8FpULDF6EYgt8ty2Fmj7g5yD5FfDiXxckcVh
  methods: {
    ...mapMutations([
      'changeFilePanel',
      'saveFileInfo'
    ]),
    // async deleteIPFS() {
    //   let req = await ajax("/api/delete", { hash: this.hashInfo });
    //   console.log(req);
    //   this.panelFlag = false;
    // },
    handleClose() {
      this.panelFlag = false;
      // this.hashInfo = "";
    },
    async submitSearch() {
      //输入数量为46且限制范围
      if (this.searchRule) {
        const loading = this.$loading({
          lock: true,
          text: "搜索中,请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        // setTimeout(() => {
        //   loading.close();
        // }, 2000);
        this.fileInfo = await ajax("/api/search", { hash: this.searchText });
        loading.close();
        // console.log(this.fileInfo);
        // debugger;
        if (this.fileInfo.code === 0 && this.fileInfo.type === "error") {
          this.nullPanelFlag = true;
          this.$message.error("没有找到该HASH信息!");
        } else {
          
          // this.tableData.forEach((item, index) => {
          //   // console.log(item);
          //   // console.log(item.value);
          //   if (index === 0) {
          //     item.value = this.searchText || this.hashInfo;
          //   } else {
          //     item.value = this.fileInfo[item.key];
          //   }
          // });
          // debugger
          let upSm = document.getElementsByClassName('el-input__inner')
          console.log(upSm);
          upSm[0].value = ""
          if (this.fileInfo) {
            this.changeFilePanel(true)
            this.saveFileInfo({info:this.fileInfo,hash:this.searchText })
            // this.hashInfo = this.searchText;
            this.searchText = "";
          }
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
    /*     //点击下载
    async clickGET() {
      if (this.smKey) {
        //QmddpXWUJcg93FbGVKN3k7HvqrP8rSZXinWJVdzWxmevTW
        let downloadUrl = await ajax(
          "/api/download",
          {
            url: this.fileInfo.downloadUrl,
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
          let name = this.tableData[1].value;
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
    }, */
  },
  data() {
    return {
      searchText: "", //搜索hash
      imgurl: null, //图片地址
      panelFlag: false, //显示面板
      downloadUrl: null, //下载地址
      downloadfilename: null, //图片名
      // hashInfo: "", //显示hash信息
      fileInfo: {}, //文件信息
      // tableData: [
      //   {
      //     name: "HASH",
      //     key: "hash",
      //     value: "",
      //   },
      //   {
      //     name: "文件名字",
      //     key: "name",
      //     value: "",
      //   },
      //   {
      //     name: "文件大小",
      //     key: "size",
      //     value: "",
      //   },
      //   {
      //     name: "文件类型",
      //     key: "type",
      //     value: "",
      //   },
      //   {
      //     name: "上次修改时间",
      //     key: "lastModifiedDate",
      //     value: "",
      //   },
      //   {
      //     name: "加密密钥",
      //     key: "smKey",
      //     value: "",
      //   },
      // ],
      nullPanelFlag: false, //空搜索
      smKey: "",
      keyFlag: true, //
    };
  },
  components: {
    // Upload
    // List,
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
  watch: {
    smKey(newVal) {
      if (newVal) {
        this.keyFlag = false;
        // debugger
        // console.log(newVal);
      } else {
        this.keyFlag = true;
      }
    },
  },
  mounted(){
    // setInterval(async ()=>{
    //     let progress = await ajax('/api/progress')
    //     console.log(progress);
    // },2000)
  }
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
    // justify-content: center;
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
    //下载按钮区
    .download_button {
      // border: 1px solid red;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      // bottom: 10%;
      .down {
        // border: 1px solid red;
        font-size: 16px;
      }
    }
    .table_wrap {
      // border: 1px solid red;
      width: 100%;
      position: relative;
      margin: 5rem 0;
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
.up_button {
  background: #234d64;
}
//输入密码
.input_key {
  // border: 1px solid red;
  left: 0;
  position: absolute;
  width: 65% !important;
  height: 10%;
  bottom: 15%;
}
</style>