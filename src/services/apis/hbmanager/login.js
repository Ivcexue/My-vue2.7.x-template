import managerServer from './index'

// 业务人员/管理员登录
export const adminLogin = (data) => {
  return managerServer.post('/admin/login', { data })
}
