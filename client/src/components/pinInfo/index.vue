<template>
  <div class="pin_info">
    <div class="pin_info_panel">
      <ul>
        <li>{{ pininfo.pinList.length || 0 }}</li>
        <li>已固定</li>
      </ul>
      <ul>
        <li>{{ pininfo.NumObjects }}</li>
        <li>块</li>
      </ul>
      <ul>
        <li>{{ pininfo.RepoSize }}</li>
        <li>仓库</li>
      </ul>
    </div>
  </div>
</template>
 <script>
import ajax from "../../utils/ajax";
const {ipcRenderer} = window.require('electron');
export default {
  data() {
    return {
      pininfo: {
        pinList: [],
        NumObjects: 1,
        RepoSize: 0,
      },
    };
  },
  computed: {
    sizeFormat() {
      return (num, type = 0) => {
        let time = 0;
        let unit;
        while (num / 1024 > 1) {
          num = num / 1024;
          time++;
        }

        switch (time) {
          case 0:
            unit = "B";
            break;
          case 1:
            unit = "KB";
            break;
          case 2:
            unit = "MB";
            break;
          case 3:
            unit = "GB";
            break;
          case 4:
            unit = "TB";
            break;
          default:
            break;
        }
        // console.log(`${Math.floor(num)}${unit}`);
        // console.log(unit);
        if (type === 1) {
          unit = unit.length === 1 ? "" : unit.substring(0, 1);
        }
        return Math.floor(num) + unit;
      };
    },
  },
  mounted() {
    (async () => {
      ipcRenderer.invoke('pininfo').then((res)=>{
          console.log(res);
        //   this.pininfo = {
        //   pinList: res.pinList,
        //   NumObjects: this.sizeFormat(res.NumObjects, 1),
        //   RepoSize: this.sizeFormat(res.RepoSize),
        // };
        })
      // let { pinList, NumObjects, RepoSize } = await ajax("/api/pininfo");
      // this.pininfo = {
      //   pinList,
      //   NumObjects: this.sizeFormat(NumObjects, 1),
      //   RepoSize: this.sizeFormat(RepoSize),
      // };
 
    })();
  },
};
</script>
<style lang='scss' scoped>
.pin_info {
  position: absolute;
  background-color: #f7f8fa;
  width: 200px;
  height: 73px;
  right: 0;
  margin: 10px;
}
.pin_info_panel {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  ul {
    // display: flex;
    // align-items: center;
     li:first-child {
    font-size: 20px;
    }
    li:last-child {
    color: #b7bbc8;
    }
  }
}
</style>