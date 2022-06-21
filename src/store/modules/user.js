import { logout } from '@/services/apis/hbcenter/login'
import { resetRouter } from '@/router'
import { adminLogin } from '@/services/apis/hbmanager/login'

const state = {
  userInfo: {}
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      adminLogin(userInfo).then(response => {
        const { data } = response
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.userInfo.token).then(() => {
        resetRouter()
        commit('CLEAR_USER_INFO')
        resolve()
        location.reload()
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

