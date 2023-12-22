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

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: '/app/order/list',
    method: 'get',
    params: data
  })
}

// 获取k线图数据
export function getKline(data) {
  return request({
    url: '/app/cryptoData/kline',
    method: 'get',
    params: data
  })
}

// 获取k线图数据
export function getKlines(data) {
  return request({
    url: '/app/cryptoData/klines',
    method: 'get',
    params: data
  })
}