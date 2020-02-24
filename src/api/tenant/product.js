import request from '@/utils/request'

// 获取交易列表
export function getList(params) {
  return request({
    url: '/tenant/product/list',
    method: 'get',
    params: params
  })
}

export function save(data){
    return request({
        url: '/tenant/product',
        method: 'post',
        data
    })
}

export function update(data){
    return request({
        url: '/tenant/product/'+data.id,
        method: 'put',
        data
    })
}


export function findByCode(params){
    return request({
        url: '/tenant/product/'+params.code,
        method: 'get',
        params: params
    })
}

