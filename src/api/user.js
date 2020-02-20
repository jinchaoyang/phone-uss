import request from '@/utils/request'

// 获取用户列表
export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/' + data.id,
    method: 'put',
    data
  })
}

export function getById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function destroy(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function userNameCheck(params) {
  return request({
    url: '/user/userNameCheck',
    method: 'get',
    params: params
  })
}

export function updateProfile(data) {
  return request({
    url: '/user/profile',
    method: 'put',
    data
  })
}

