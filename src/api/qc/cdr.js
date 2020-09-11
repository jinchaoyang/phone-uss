import request from '@/utils/request'

// 获取质检话单列表
export function getQcCdrs(params) {
  return request({
    url: '/qc/cdr/list',
    method: 'get',
    params: params
  })
}