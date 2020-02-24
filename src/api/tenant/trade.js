import request from '@/utils/request'

// 获取交易列表
export function getList(params) {
  return request({
    url: '/tenant/trade/list',
    method: 'get',
    params: params
  })
}


export function save(data){
    return request({
        url: '/tenant/trade',
        method: 'post',
        data
    })
}
