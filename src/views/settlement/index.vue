<template>
  <div class="settlement-content">
    <search @onSearch="onSearch" @onReset="onReset" />

    <div class="tool-box">
      <el-button icon="el-icon-upload2" type="primary" size="mini" @click="handlerExport">导出</el-button>
      <el-dropdown @command="handleCommand">
        <el-button size="mini">
          批量操作
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">确认结算</el-dropdown-item>
          <el-dropdown-item command="b">驳回</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      ref="tableRef"
      v-loading="tableLoading"
      row-key="id"
      border
      :data="settlementList"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      @selection-change="onSelectChange"
    >
      <el-table-column type="selection" reserve-selection align="center" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="sourceName" label="渠道来源" />
      <el-table-column prop="orgName" label="代理公司" />
      <el-table-column prop="projectName" label="项目编号/名称" show-tooltip-when-overflow>
        <template #default="{row}">
          <div>{{ row.projectCode }}</div>
          <div>{{ row.projectName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="actualAmount" label="系统使用费总金额(元)" />
      <el-table-column prop="account" label="结算账号">
        <template #default="{row}">
          <div>户名: {{ row.settlementAccountInfo.bankAccountName }}</div>
          <div>账号: {{ row.settlementAccountInfo.bankAccount }}</div>
          <div>开户行: {{ row.settlementAccountInfo.bankDeposit }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" :formatter="dateFormatter" />
      <el-table-column prop="handleTime" label="处理时间" :formatter="dateFormatter" />
      <el-table-column prop="handleStatus" label="状态" :formatter="statusFormatter" />

      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{row}">
          <el-button type="text" @click="openDetail(row)">详情</el-button>
          <el-button v-if="row.handleStatus === 3" type="text" @click="openRejectReason(row)">驳回原因</el-button>
          <el-dropdown v-if="row.handleStatus === 2">
            <el-button type="text">
              处理
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="onConfirm({id: row.id})">确认结算</el-dropdown-item>
              <el-dropdown-item @click.native="onReject({id: row.id})">驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="query.currentPage"
      :limit.sync="query.pageSize"
      @pagination="getList"
    />

    <fz-drawer title="订单列表" size="70%" :visible.sync="drawerVisible">
      <el-row>
        <form-item :span="12" title="项目名称" :content="currentProjectInfo.projectName" />
        <form-item :span="12" title="代理公司" :content="currentProjectInfo.orgName" />
      </el-row>
      <el-table
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :data="orderList"
        border
      >
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="outOrderNo" label="订单号" show-tooltip-when-overflow width="140" />
        <el-table-column prop="orgName" label="付款单位" show-tooltip-when-overflow width="200" />
        <el-table-column
          prop="sectionName"
          label="标段(包)编号/名称"
          width="230"
          :formatter="(row, column, cellValue) => {
            return `${row.sectionCode} / ${cellValue}`
          }"
        />
        <el-table-column prop="feeType" label="费用类型" :formatter="feeTypeFormatter" show-tooltip-when-overflow width="120" />
        <el-table-column prop="actualAmount" label="交易金额(元)" show-tooltip-when-overflow width="140" />
        <el-table-column prop="payType" label="支付方式" :formatter="payTypeFormatter" width="100" />
        <el-table-column prop="sourceName" label="渠道来源" />
        <el-table-column prop="payTime" label="交易时间" :formatter="dateFormatter" width="180" />
      </el-table>
    </fz-drawer>
  </div>
</template>

<script>
import Search from './components/Search'
import Pagination from './components/Pagination'
import {
  confirmSettlement,
  getRejectReason, getSettlementDetail,
  pageSettlement,
  rejectSettlement
} from '@/services/apis/hbproject/settlement'
// import { downloadRawFile } from '@/utils'
import { parseTime } from '@/utils'
import { statusMapper } from './constant'
import FzDrawer from '@/components/FzDreawer'
import { feeTypeList, payType } from '@/views/order/columns'
import FormItem from '@/views/settlement/components/FormItem'
const dateFormatter = (row, column, cellValue) => cellValue ? parseTime(cellValue) : '--'
const statusFormatter = (row, column, cellValue) => statusMapper[cellValue]
const feeTypeFormatter = (row, column, cellValue) => feeTypeList[cellValue]
const payTypeFormatter = (row, column, cellValue) => payType[cellValue]

export default {
  name: 'Settlement',
  components: {
    FormItem,
    FzDrawer,
    Search,
    Pagination
  },
  data() {
    return {
      // 加载遮罩层
      tableLoading: false,
      // 查询条件
      query: {
        currentPage: 1,
        pageSize: 10
      },
      // 列表数据
      settlementList: [],
      projectIds: [],
      drawerVisible: false,
      // 详情订单列表
      orderList: [],
      // 总条数
      total: 0,

      currentProjectInfo: {},
      headerCellStyle: { backgroundColor: '#F2F3F5', color: '#212529' },
      cellStyle: {
        'font-size': '14px',
        'color': '#484C52',
        'line-height': '20px'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    dateFormatter,
    statusFormatter,
    feeTypeFormatter,
    payTypeFormatter,
    onSearch(query) {
      this.query.currentPage = 1
      Object.assign(this.query, query)
      this.getList()
    },
    onReset() {
      this.query = {
        currentPage: 1,
        pageSize: 10
      }
      this.getList()
    },
    getList() {
      this.tableLoading = true
      pageSettlement(this.query).then(res => {
        this.settlementList = res.data.records
        this.total = res.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    onSelectChange(rows) {
      this.projectIds = rows.map(row => row.id)
    },
    handleCommand(command) {
      if (!this.projectIds.length) {
        this.$message.warning('请至少选择一条数据')
        return
      }

      const query = { ids: this.projectIds }
      const commandApi = command === 'a' ? this.onConfirm : this.onReject
      commandApi(query)
    },
    onConfirm(query) {
      this.$confirm('请确保已结算完成，确认将状态更改为已结算吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          confirmSettlement(query).then(res => {
            this.$message.success(res.message)
            this.getList()
            this.$refs.tableRef.clearSelection()
          })
        })
        .catch(() => {})
    },
    onReject(query) {
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(val) {
          if (val?.length > 1000) {
            return '驳回原因不能超过1000字'
          }
          return val ? true : '请输入原因'
        }
      }).then(({ value }) => {
        rejectSettlement({
          ...query,
          rejectReason: value
        }).then(res => {
          this.getList()
          this.$refs.tableRef.clearSelection()
          this.$message.success(res.message)
        })
      }).catch(() => {
      })
    },
    // 导出
    async handlerExport() {
      // exportOrderCheck(this.query).then(async res => {
      //   const rawFile = await exportOrderList(this.query)
      //   downloadRawFile(rawFile, '全部文件.xls')
      // })
    },
    openDetail(row) {
      this.currentProjectInfo = row
      getSettlementDetail({ id: row.id }).then(res => {
        this.orderList = res.data
        this.drawerVisible = true
      })
    },
    openRejectReason({ id }) {
      getRejectReason({ id }).then(res => {
        this.$alert(res.data, '驳回原因', {
          showConfirmButton: false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement-content {
  padding: 16px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 16px;

  .tool-box {
    margin: 20px 0 16px;
    > * {
      margin-left: 5px;
    }
  }
}
.table-header {
  background: #F2F3F5;
}
::v-deep .el-form-item .el-form-item__content, .el-form-item .el-form-item__label {
  height: 36px;
}
</style>
