import request from '@/utils/request'

// 获取资源列表
export function getList(params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: params
  })
}

export function getAllRoles(params){
  return request({
    url: '/sys/role/all',
    method: 'get',
    params: params
  })
}

export function save(data){
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

export function getById(id){
  return request({
    url: '/sys/role/'+id,
    method: 'get'
  })
}

export function update(data){
  return request({
    url: '/sys/role/'+data.id,
    method: 'put',
    data
  })
}

export function destroy(id){
  return request({
    url: '/sys/role/'+id,
    method: 'delete'
  })
}
