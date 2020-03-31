import request from '@/utils/request'

// 获取交易列表
export function getSetting(tenantId) {
  return request({
    url: '/tenant/setting/'+tenantId,
    method: 'get',
    params: {id:tenantId}
  })
}


export function updateSetting(data){
    return request({
        url: '/tenant/setting/'+data.id,
        method: 'put',
        data
    })
}
