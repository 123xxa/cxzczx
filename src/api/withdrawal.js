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
