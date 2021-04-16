import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filePanel: true,//显示文件面板
    fileInfo: {},//文件信息
  },
  mutations: {
    /**
     * 改变文件信息面板状态
     * @param {*} state 
     * @param {Boolean} flag 传入状态布尔值
     */
    changeFilePanel(state,flag){
      state.filePanel = flag
    },
    /**
     * 保存文件信息
     * @param {*} state 
     * @param {*} info 搜索得到的文件信息
     */
    saveFileInfo(state,data){
      state.fileInfo  = data.info
      state.fileInfo.hash = data.hash
    }
    
  },
  actions: {
    
  },
  modules: {
  
  },
  getters:{
    
  }
})
