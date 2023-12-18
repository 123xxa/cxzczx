import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const switchCheckedStr = localStorage.getItem("switchChecked")!== undefined? localStorage.getItem("switchChecked")==='false'?false:true:  true;
export default new Vuex.Store({
  state: {
    lang: localStorage.getItem("lang") || "en",
    switchChecked: switchCheckedStr,
    token:""
  },
  getters: {
    getLang:state => state.lang,
    getSwitchChecked:state => state.switchChecked,
  },
  mutations: {
    SET_LANG: (state, data) => {
      localStorage.setItem("lang", data);
      state.lang = data;
    },
    SET_SWITCH_CHECKED: (state, data) => {
      localStorage.setItem("switchChecked", data);
      state.switchChecked = data;
      if(data){
        document.documentElement.style.setProperty('--bg-color', '#111827');
        document.documentElement.style.setProperty('--box-bg-color', '#171E26');
        document.documentElement.style.setProperty('--color', '#FFFFFF');
      }else{
        document.documentElement.style.setProperty('--bg-color', '#F3F4F6');
        document.documentElement.style.setProperty('--box-bg-color', '#FFFFFF');
        document.documentElement.style.setProperty('--color', '#0D1721');
      }
    },
  },
  actions: {
    setSwitchChecked({ commit }, data){
      commit("SET_SWITCH_CHECKED", data);
    },
    setLang({ commit }, data) {
      commit("SET_LANG", data);
    },
  },
  modules: {
  }
})
