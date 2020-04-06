import Cookies from 'js-cookie'

const TokenKey = 'pb-uss-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTenantType(data){
  localStorage.setItem("pb_tenant_type",data);
}

export function getTenantType(){
  return localStorage.getItem("pb_tenant_type")
}
