/*
 * @Author: zn
 * @Date: 2021-11-26 10:33:44
 * @Description: 用户相关api
 * @LastEditors: SHUO
 */
import centerServer from './index'

// 退出登录
export function logout(data) {
  return centerServer.post('/user/logout', { data })
}
