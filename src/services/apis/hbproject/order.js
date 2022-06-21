import projectServer from './index'

// 查询客户信息列表
export function countOrder(data) {
  return projectServer.post('/userOrder/count', { data })
}

// 查询客户信息列表
export function countOrderAmount(data) {
  return projectServer.post('/userOrder/count/amount', { data })
}

// 查询客户信息列表
export function exportOrderCheck(data) {
  return projectServer.post('/userOrder/export/check', { data })
}

// 查询客户信息列表
export function exportOrderList(data) {
  return projectServer.post('/userOrder/export', {
    responseType: 'blob',
    data
  })
}

// 查询客户信息列表
export function getOrderList(data) {
  return projectServer.post('/userOrder/listSuccess', { data })
}

/**
 * 查询已发起退款订单
 * @param {*} data
 * @returns
 */
export const queryUserRefundOrders = data => {
  return projectServer.post('/userOrder/pageRefund', { data })
}

/**
 * 批量操作-同意退款申请
 * @param {*} data
 * @returns
 */
export const passRefundApplication = data => {
  return projectServer.post('/userOrder/passRefundApplication', { data })
}
