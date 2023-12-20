import request from '@/utils/request'


// 提现手续费
export function getHandlingFee() {
  return request({
    url: '/app/withdrawRecord/handlingFee',
    method: 'get'
  })
}
