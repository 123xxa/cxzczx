import request from '@/utils/request'

// 充值
export function appRecharge(data) {
  return request({
    url: '/app/wallet/appRecharge',
    method: 'post',
    data: data
  })
}

// 获取充值地址
export function getRechargeAddress() {
  return request({
    url: '/app/rechargeLog/getRechargeAddress',
    method: 'get'
  })
}

// 上传图片接口
export function imageUploader(data) {
  return request({
    url: '/app/rechargeLog/imageUploader',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

// 获取用户钱包
export function getUserWallet() {
  return request({
    url: '/app/wallet/userAmount',
    method: 'get'
  })
}

// 查询流水
export function getBalanceLog(data) {
  return request({
    url: '/app/balanceLog/list',
    method: 'get',
    params: data
  })
}