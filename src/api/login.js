import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/app/loginV2',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/app/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/app/wallet/info',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/app/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCode(data) {
  return request({
    url: '/app/code',
    headers: {
      isToken: false
    },
    method: 'get',
    params: data,
    timeout: 20000
  })
}

// 重置密码
export function resetAccount(data) {
  return request({
    url: '/app/reset',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 修改登录密码
export function updatePassword(data) {
  return request({
    url: '/app/updatePassword',
    method: 'post',
    data: data
  })
}
