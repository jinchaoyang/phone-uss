import { login, logout, getInfo, getPermissions } from '@/api/login'
import { getToken, setToken, removeToken, setTenantType } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    tenantType:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
  },
  SET_TENANT_TYPE: (state,tenantType) => {
    state.tenantType = tenantType
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password ,tenantCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password ,tenantCode: tenantCode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_TENANT_TYPE',data.tenantType)
        setTenantType(data.tenantType)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户签出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户基本信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        commit('SET_NAME', data.name)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  getPermissions({ commit }){
    return new Promise((resolve,reject) => {
      getPermissions(state.token).then(response => {
         const { data } = response
         commit('SET_MENU',data)
         resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
