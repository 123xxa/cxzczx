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
    coinMainList: [],
    coinList: [
      {
        logo: require('@/assets/images/withdrawCoins/1.png'),
        label: 'USDT'
      },
      {
        logo: require('@/assets/images/withdrawCoins/2.png'),
        label: 'BTC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/3.png'),
        label: 'ETH'
      },
      {
        logo: require('@/assets/images/withdrawCoins/4.png'),
        label: 'LTC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/5.png'),
        label: 'BCH'
      },
      {
        logo: require('@/assets/images/withdrawCoins/6.png'),
        label: 'USDC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/7.jpg'),
        label: 'XCC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/8.jpg'),
        label: 'MDA'
      },
      {
        logo: require('@/assets/images/withdrawCoins/9.jpg'),
        label: 'DOTS'
      },
      {
        logo: require('@/assets/images/withdrawCoins/10.jpg'),
        label: 'FDE'
      },
      {
        logo: require('@/assets/images/withdrawCoins/11.jpg'),
        label: 'ESMY'
      },
      {
        logo: require('@/assets/images/withdrawCoins/12.jpg'),
        label: 'VTSD'
      },
      {
        logo: require('@/assets/images/withdrawCoins/13.jpg'),
        label: 'TWB'
      },
      {
        logo: require('@/assets/images/withdrawCoins/14.jpg'),
        label: 'WHD'
      },
      {
        logo: require('@/assets/images/withdrawCoins/15.jpg'),
        label: 'QCM'
      },
      {
        logo: require('@/assets/images/withdrawCoins/16.jpg'),
        label: 'ALIDD'
      },
      {
        logo: require('@/assets/images/withdrawCoins/17.jpg'),
        label: 'MTC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/18.jpg'),
        label: 'AITO'
      },
      {
        logo: require('@/assets/images/withdrawCoins/19.png'),
        label: 'AVAX'
      },
      {
        logo: require('@/assets/images/withdrawCoins/20.png'),
        label: 'LINK'
      },
      {
        logo: require('@/assets/images/withdrawCoins/21.png'),
        label: 'MATIC'
      },
      {
        logo: require('@/assets/images/withdrawCoins/22.png'),
        label: 'BNB'
      },
      {
        logo: require('@/assets/images/withdrawCoins/23.png'),
        label: 'DOT'
      },
      {
        logo: require('@/assets/images/withdrawCoins/24.png'),
        label: 'TRX'
      },
      {
        logo: require('@/assets/images/withdrawCoins/25.png'),
        label: 'DOGE'
      },
      {
        logo: require('@/assets/images/withdrawCoins/IMX.png'),
        label: 'IMX'
      },
      {
        logo: require('@/assets/images/withdrawCoins/OP.png'),
        label: 'OP'
      },
      {
        logo: require('@/assets/images/withdrawCoins/SHIB.png'),
        label: 'SHIB'
      },
      {
        logo: require('@/assets/images/withdrawCoins/SOL.png'),
        label: 'SOL'
      },
      {
        logo: require('@/assets/images/withdrawCoins/XRP.png'),
        label: 'XRP'
      },
      {
        logo: require('@/assets/images/withdrawCoins/ARB.png'),
        label: 'ARB'
      }
    ]
  },
  getters: {
    getLang:state => state.lang,
    getSwitchChecked:state => state.switchChecked,
    token:state => state.token,
    userInfo:state => state.userInfo,
    coinList:state => state.coinList,
    coinMainList:state => state.coinMainList
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
    changeCoinMainList(state, data){
      state.coinMainList = JSON.parse(JSON.stringify(data));
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
    async setUserInfo({commit}, data) {
      const res =  await getInfo()
      if(res.code == 200 )commit("SET_USERINFO",res.data);
    }
  },
  modules: {
  }
})
