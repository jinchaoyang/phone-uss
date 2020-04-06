import request from '@/utils/request'

// 获取交易列表
export function getSetting() {
  return request({
    url: '/tenant/setting/info',
    method: 'get'
  })
}


export function updateSetting(data){
    return request({
        url: '/tenant/setting/update',
        method: 'put',
        data
    })
}
