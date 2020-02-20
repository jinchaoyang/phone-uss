import request from '@/utils/request'

// 获取企业列表
export function getList(params) {
  return request({
    url: '/tenant/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: '/tenant',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/tenant/' + data.id,
    method: 'put',
    data
  })
}

export function getById(id) {
  return request({
    url: '/tenant/' + id,
    method: 'get'
  })
}

export function destroy(id) {
  return request({
    url: '/tenant/' + id,
    method: 'delete'
  })
}

export function tenantCodeCheck(params) {
  return request({
    url: '/tenant/tenantCodeCheck',
    method: 'get',
    params: params
  })
}

export function stat(params) {
  return request({
    url: '/stat/all',
    method: 'get',
    params: params
  })
}

