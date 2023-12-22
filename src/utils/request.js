import axios from 'axios'
import store from '@/store'
import errorCode from '@/utils/errorCode'
import config from './config.js'
import { Toast, Dialog  } from 'vant';
import router from '@/router'
import i18n from '@/i18n/index'

function getToken() {
  return localStorage.getItem(config.tokenKey)
}

function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 对应国际化资源文件后缀
axios.defaults.headers['Content-Language'] = 'en_US'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: config.baseUrl,
  // 超时
  timeout: 60000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.headers['Content-Language'] = 'en_US'
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  // if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
  //   const requestObj = {
  //     url: config.url,
  //     data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
  //     time: new Date().getTime()
  //   }
  //   const sessionObj = cache.session.getJSON('sessionObj')
  //   if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
  //     cache.session.setJSON('sessionObj', requestObj)
  //   } else {
  //     const s_url = sessionObj.url;                  // 请求地址
  //     const s_data = sessionObj.data;                // 请求数据
  //     const s_time = sessionObj.time;                // 请求时间
  //     const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
  //     if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
  //       const message = '数据正在处理，请勿重复提交';
  //       console.warn(`[${s_url}]: ` + message)
  //       return Promise.reject(new Error(message))
  //     } else {
  //       cache.session.setJSON('sessionObj', requestObj)
  //     }
  //   }
  // }
  return config
}, error => {
    // console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        Dialog.confirm({
          title: i18n.t('text96'),
          message: i18n.t('text97'),
          confirmButtonText: i18n.t('text94'),
          cancelButtonText: i18n.t('text95')
        }).then(() => {
          isRelogin.show = false;
          store.commit('removeUserInfo')
          router.push('/home')
        }).catch(() => {
          isRelogin.show = false;
        });
      }
      return Promise.reject('error')
    } else if (code === 500) {
      Toast(msg)
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      Toast(msg)
      return Promise.reject('error')
    } else if (code !== 200) {
      Toast(msg)
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    // console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = i18n.t('text98');
    } else if (message.includes("timeout")) {
      message = i18n.t('text99');
    } else if (message.includes("Request failed with status code")) {
      message = i18n.t('text101') + message.substr(message.length - 3) + i18n.t('text100');
    }
    Toast(message)
    return Promise.reject(error)
  }
)

export default service
