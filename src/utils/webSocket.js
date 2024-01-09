import config from "./config.js"
import store from '@/store'
import { Toast } from "vant"
import i18n from '@/i18n/index'
import router from '@/router'
import Vue from "vue"
// 随机数
// 获取ip + 端口 
var wsUrl = `${config.baseUrl.replace('https', 'wss').replace('http', 'ws')}/websocket`;
// 避免重复连接
var lockReconnect = false;
var ws;
// 定时任务
var tt;
// 心跳定时发送消息
var heartSendMsg;
var heartTime = 10000;
// 用户信息
var userInfo;
function createWebSocket(info) {
    userInfo = userInfo ? userInfo : (info || store.userInfo)
    try {
        if(ws) return;
        ws = new WebSocket(wsUrl);
        Vue.prototype.$socket = ws;
        init();
    } catch (e) {
        // console.log('catch' + e);
        reconnect();
    }
}

function init() {
    ws.onclose = function (e) {
        console.log('关闭')
        ws = null
        Vue.prototype.$socket = null
        reconnect();
    };
    ws.onerror = function (e) {
        reconnect();
    };
    ws.onopen = function (e) {
        let normalId = store.state.userInfo && store.state.userInfo.nickname ? store.state.userInfo.nickname : new Date().getTime()
        let obj = {
            type: 'JOIN',
            content: '',
            sender: normalId,
            timestamp: new Date().getTime()
        }
        ws.send(JSON.stringify(obj));
        heartSendMsg = setInterval(() => {
            ws.send(JSON.stringify({type: 'HEARTBEAT'}));
        }, heartTime)
    };
    ws.onmessage = function (event) {
        if (event.data) {
            if (event.data.includes('UPDATE_PRICE')) {
                let obj = JSON.parse(event.data)
                let content = JSON.parse(obj.content)
                let coinMainList = JSON.parse(JSON.stringify(store.state.coinMainList))
                let index = coinMainList.findIndex(item => item.cryptoId === content.cryptoId)
                if (index == -1) {
                    coinMainList.push(content)
                } else {
                    coinMainList[index] = {
                        ...coinMainList[index],
                        ...content,
                    }
                }
                store.commit('changeCoinMainList', coinMainList)
            } else {
            }
        }
    }
}

export const  closeSocketConnection = ()=>{
    ws.close();
}

function reconnect() {
    clearInterval(heartSendMsg)
    heartSendMsg = undefined;
    // 没连接上会一直重连，设置延迟避免请求过多，有定时任务，先取消再设置
    if(!tt){
        tt = setInterval(function () {
            createWebSocket();
        }, 5000);
    }
}

export const getSocket = (userInfo) => {
    createWebSocket(userInfo)
}
