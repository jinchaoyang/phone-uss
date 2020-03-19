import request from '@/utils/request'

// 获取资源列表
export function getList(params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: params
  })
}
