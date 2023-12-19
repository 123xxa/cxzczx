import request from '@/utils/request'

// 获取价格涨幅列表
export function getLastPrice() {
    return request({
        url: '/app/cryptoData/lastPrice',
        method: 'get'
    })
}

// 获取盈利列表
export function getProfitRatesList() {
  return request({
    url: '/app/profitRates/list',
    method: 'get'
  })
}

// 下单
export function postOrder(data) {
  return request({
    url: '/app/order',
    method: 'post',
    data: data
  })
}