<template>
  <div class="file_info">
    <table class="file_list">
      <tr class="file_img">
        <td>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconTXTCopy"></use>
          </svg>
        </td>
      </tr>
      <tr>
        <td>文件hash</td>
        <td>{{ data[0].value }}</td>
      </tr>
      <tr>
        <td>文件名字</td>
        <td>{{ data[1].value }}</td>
      </tr>
      <tr>
        <td>文件大小</td>
        <td>{{ data[2].value }}</td>
      </tr>
      <tr>
        <td>文件类型</td>
        <td>{{ data[3].value }}</td>
      </tr>
      <tr>
        <td>修改时间</td>
        <td>{{ data[4].value }}</td>
      </tr>
      <tr>
        <td>解密密钥</td>
        <td>
          <el-input
            placeholder="请输入密码"
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
        </td>

      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    // data: Array,
  },
  data() {
    return {
      data: [
        {
          name: "HASH",
          key: "hash",
          value: "QmaraZVg1jFzvV75cPw3z1dZ5TyvAG4jTAwhPh1nANE1NG",
        },
        { name: "文件名字", key: "name", value: "中文.txt" },
        { name: "文件大小", key: "size", value: 6 },
        { name: "文件类型", key: "type", value: "text/plain" },
        {
          name: "上次修改时间",
          key: "lastModifiedDate",
          value: "2021-04-16T11:59:31.340Z",
        },
        { name: "加密密钥", key: "smKey" },
      ],
      smKey: "", //输入密钥
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
  },
  computed: {},
};
</script>
<style lang="scss" >
.file_info {
  // border: 1px solid #eee;
  border: 1px solid red;

  height: 100%;
  width: 100%;
  z-index: 300;
  position: absolute;
  left: 0;
  top: 0;
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
.open_panel{
  right: 2rem;
  position:absolute;
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