import store from '@/store'

export const USER_INFO_KEY = '__USER_INFO__'

export const getUserInfo = () => {
  return store.state['user'].userInfo
}
