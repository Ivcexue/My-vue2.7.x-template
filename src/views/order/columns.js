import { parseTime } from '@/utils'
const dateFormatter = (row, column, cellValue) => parseTime(cellValue)

export const feeTypeList = {
  1: '投标保证金',
  2: '履约保证金',
  3: '报名费',
  4: '标书管理费',
  5: '系统使用费'
}
export const payType = {
  1: '支付宝',
  2: '微信',
  3: '银联'
}
export const agencyColumns = [
  {
    width: '55px',
    type: 'index',
    label: '序号'
  },
  {
    prop: 'outOrderNo',
    label: '订单号'
  },
  {
    prop: 'orgName',
    label: '付款单位'
  },
  {
    prop: 'projectName',
    label: '项目名称'
  },
  {
    prop: 'sectionName',
    label: '标段(包)名称'
  },
  {
    prop: 'projectOrgName',
    label: '代理公司'
  },
  {
    prop: 'feeType',
    label: '费用类型',
    formatter(row, col, val) {
      return feeTypeList[val]
    }
  },
  {
    prop: 'actualAmount',
    label: '交易金额(元)'
  },
  {
    prop: 'payType',
    label: '支付方式',
    formatter(row, col, val) {
      return payType[val]
    }
  },
  {
    prop: 'source',
    label: '渠道来源'
  },
  {
    prop: 'payTime',
    label: '交易时间',
    formatter: dateFormatter
  }
]
