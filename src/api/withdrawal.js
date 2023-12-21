import request from '@/utils/request'


// 提现手续费
export function getHandlingFee() {
  return request({
    url: '/app/withdrawRecord/handlingFee',
    method: 'get'
  })
}

// 提现
export function applyWithdraw(data) {
  return request({
    url: '/app/withdrawRecord/applyWithdraw',
    method: 'post',
    data: data
  })
}

// 提现记录
export function withdrawRecordList(data) {
  return request({
    url: '/app/withdrawRecord/list',
    method: 'get',
    params: data
  })
}
