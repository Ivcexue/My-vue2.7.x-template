import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'

import { USER_INFO_KEY } from '@/utils/user'

import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const vuexPersisted = CreatePersistedState({
  key: USER_INFO_KEY,
  paths: ['user'],
  storage: {
    getItem: (key) => window.localStorage.getItem(key),
    setItem: (key, value) => window.localStorage.setItem(key, value),
    removeItem: (key) => window.localStorage.removeItem(key)
  }
})

const store = new Vuex.Store({
  plugins: [vuexPersisted],
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
