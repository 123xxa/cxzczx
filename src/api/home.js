import request from '@/utils/request'

// 获取价格涨幅列表
export function getLastPrice() {
    return request({
        url: '/app/cryptoData/lastPrice',
        method: 'get'
    })
}