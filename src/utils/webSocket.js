import config from "./config.js"
import store from '@/store'
import { Toast } from "vant"
import i18n from '@/i18n/index'
import router from '@/router'

// 随机数
let normalId = store.state.userInfo && store.state.userInfo.id ? store.state.userInfo.id : new Date().getTime()
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
        ws = new WebSocket(wsUrl);
        init();
    } catch (e) {
        console.log('catch' + e);
        reconnect();
    }
}

function init() {
    ws.onclose = function (e) {
        console.log('链接关闭' + e.code + new Date().getTime());
        // 服务器关闭  不重连
        // if (e.code != 1006) {
        reconnect();
        // }
    };
    ws.onerror = function (e) {
        console.log('发生异常了' + new Date().getTime());
        reconnect();
    };
    ws.onopen = function (e) {
        console.log(router, 'scscsd')
        console.log('连接成功' + new Date().getTime());
        let obj = {
            type: 'JOIN',
            content: '',
            sender: normalId,
            timestamp: new Date().getTime()
        }
        console.log(obj)
        ws.send(JSON.stringify(obj));
        heartSendMsg = setInterval(() => {
            // console.log(`HEART_SEND_MSG ${new Date().getTime()}`)
            ws.send(JSON.stringify({type: 'HEARTBEAT'}));
        }, heartTime)
    };
    ws.onmessage = function (event) {
        // console.log('接收到来自服务器的消息：', event, new Date().getTime());
        if (event.data) {
            if (event.data.includes('UPDATE_PRICE')) {
                let obj = JSON.parse(event.data)
                let content = JSON.parse(obj.content)
                let coinMainList = JSON.parse(JSON.stringify(store.state.coinMainList))
                let index = coinMainList.findIndex(item => item.cryptoId === content.cryptoId)
                if (index == -1) {
                    coinMainList.push(content)
                } else {
                    // console.log('原s', coinMainList[index].cryptoId, coinMainList[index].volumeChange24h, coinMainList[index].price, coinMainList[index].percentChange24h)
                    coinMainList[index] = {
                        ...coinMainList[index],
                        ...content,
                        // timestamp: new Date().getTime()
                    }
                    // console.log('替s', coinMainList[index].cryptoId, coinMainList[index].volumeChange24h, coinMainList[index].price, coinMainList[index].percentChange24h)
                }
                store.commit('changeCoinMainList', coinMainList)
            } else {
                console.log('接收到来自服务器的消息：', event, new Date().getTime());
            }
        }
    }
}

function reconnect() {
    console.log('重连中......')
    if (lockReconnect) {
        return;
    };
    clearInterval(heartSendMsg)
    heartSendMsg = undefined;
    lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多，有定时任务，先取消再设置
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        createWebSocket();
        lockReconnect = false;
    }, 2000);
}

export const getSocket = (userInfo) => {
    createWebSocket(userInfo)
    // var ws = new WebSocket(`${config.server.replace('https', 'wss').replace('http', 'ws')}/websocket`); // Connect to the WebSocket endpoint
    // ws.onopen = () => {
    //     console.log('ws连接状态：' + ws.readyState);
    //     let obj = {
    //         type: 'JOIN',
    //         content: '',
    //         sender: userInfo ? userInfo.id : store.userInfo.id,
    //         timestamp: new Date().getTime()
    //     }
    //     console.log(obj)
    //     //连接成功则发送一个数据
    //     // ws.send('连接成功');
    //     ws.send(JSON.stringify(obj));
    // }

    // //接听服务器发回的信息并处理展示
    // ws.onmessage = (event) => {
    //     console.log('接收到来自服务器的消息：', event);
    //     if (event.data && event.data.includes('MINT_NFT')) {
    //         let obj = JSON.parse(event.data)
    //         let str = obj.content.replace('data:', '')
    //         let objData = JSON.parse(str)
    //         localStorage.setItem('mintNftTokenId', objData.mintNft.tokenId || '')
    //     }
    // }

    // //监听连接关闭事件
    // ws.onclose = () => {
    //     //监听整个过程中websocket的状态
    //     console.log('ws连接状态：' + ws.readyState);
    // }

    // //监听并处理error事件
    // ws.onerror = function (error) {
    //     console.log(error);
    // }
}
