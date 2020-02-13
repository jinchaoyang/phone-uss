import request from '@/utils/request'

//获取用户列表
export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params 
  })
}

export function save(data){
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getById(id){
   return request({
     url: '/user/'+id,
     method: 'get'
   })
}



