import request from '@/utils/request'
import {getTenantType} from '@/utils/auth'

export function getById(id) {
  return request({
    url: '/tenant/info',
    method: 'get'
  })
}



export function stat(params) {
  let tenantType = getTenantType();
  return request({
    baseURL: tenantType==2?process.env.VUE_APP_BASE_API:process.env.VUE_APP_EXTERNAL_API,
    url: '/tenant/stat',
    method: 'get',
    params: params
  })
}

export function getBlackList(params){
  let tenantType = getTenantType();
  return request({
    baseURL: tenantType==2?process.env.VUE_APP_BASE_API:process.env.VUE_APP_EXTERNAL_USS,
    url: '/cdr/black',
    method: 'get',
    params: params
  })
}

export function getVipList(params){
  let tenantType = getTenantType();
  return request({
    baseURL: tenantType==2?process.env.VUE_APP_BASE_API:process.env.VUE_APP_EXTERNAL_USS,
    url: '/cdr/vip',
    method: 'get',
    params: params
  })
}
