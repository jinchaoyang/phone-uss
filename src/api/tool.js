import request from '@/utils/request'

// 名单验证
export function check(params) {
  return request({
    url: '/api/v1.0/black/batchVerify',
    method: 'get',
    params: params
  })
}

export function stat(params) {
  return request({
    url: '/api/v1.0/black/stat',
    method: 'get',
    params: params
  })
}

export function filterProgress (params) {
	return request({
    baseURL: process.env.VUE_APP_OSS_API,
	  url: '/api/v1.0/vip/progress/'+params.taskId,
	  method: 'get'
	})
}
