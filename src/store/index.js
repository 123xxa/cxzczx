import Vue from 'vue'
import Vuex from 'vuex'
import { getInfo } from "@/api/login.js";
import config from '@/utils/config.js'
Vue.use(Vuex)
const switchCheckedStr = localStorage.getItem("switchChecked")!== undefined? localStorage.getItem("switchChecked")==='false'?false:true:  true;
export default new Vuex.Store({
  state: {
    lang: localStorage.getItem("lang") || "en",
    switchChecked: switchCheckedStr,
    token: localStorage.getItem(config.tokenKey) || "",
    userInfo: JSON.parse(localStorage.getItem(config.userInfoKey)) || {},
  },
  getters: {
    getLang:state => state.lang,
    getSwitchChecked:state => state.switchChecked,
    token:state => state.token,
    userInfo:state => state.userInfo
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
    SET_TOKEN(state, data){
      localStorage.setItem(config.tokenKey, data);
      state.token = data;
    },
    SET_USERINFO(state, data){
      localStorage.setItem(config.userInfoKey, JSON.stringify(data));
      state.userInfo = data;
    },
    removeUserInfo(state) {
      state.userInfo = {}
      state.token = ""
      localStorage.removeItem(config.tokenKey)
      localStorage.removeItem(config.userInfoKey)
    },
  },
  actions: {
    setSwitchChecked({ commit }, data){
      commit("SET_SWITCH_CHECKED", data);
    },
    setLang({ commit }, data) {
      commit("SET_LANG", data);
    },
    setToken({commit}, data) {
      commit("SET_TOKEN", data);
    },
    setUserInfo({commit}, data) {
      getInfo().then(res => {
        console.log(res)
        commit("SET_USERINFO", res.data);
      })
      // commit("SET_USERINFO", data);
    }
  },
  modules: {
  }
})
