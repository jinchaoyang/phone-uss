import request from '@/utils/request'

// 获取交易列表
export function getList(params) {
  return request({
    url: '/tenant/bill/list',
    method: 'get',
    params: params
  })
}