import projectServer from './index'

// 查询财务结算列表
export function pageSettlement(data) {
  return projectServer.post('/financeSettlement/pageSettlement', { data })
}

// 查询财务结算详情
export function getSettlementDetail(data) {
  return projectServer.post('/financeSettlement/settlementDetails', { data })
}

// 确认结算
export function confirmSettlement(data) {
  return projectServer.post('/financeSettlement/confirm', { data })
}

// 驳回
export function rejectSettlement(data) {
  return projectServer.post('/financeSettlement/reject', { data })
}

// 查看驳回原因
export function getRejectReason(data) {
  return projectServer.post('/financeSettlement/rejectReason', { data })
}
