import request from '@/utils/request'

// 获取资源列表
export function getList(params) {
  return request({
    url: '/sys/resource/list',
    method: 'get',
    params: params
  })
}

export function save(data){
  return request({
    url: '/sys/resource',
    method: 'post',
    data
  })
}

export function getById(id){
  return request({
    url: '/sys/resource/'+id,
    method: 'get'
  })
}

export function update(data){
  return request({
    url: '/sys/resource/'+data.id,
    method: 'update',
    data
  })
}

export function destroy(id){
  return request({
    url: '/sys/resource/'+data.id,
    method: 'delete'
  })
}

export function getTree(){
  return request({
    url: '/sys/resource/tree',
    method: 'get'
  })
}
