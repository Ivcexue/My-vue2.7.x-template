<template>
  <div class="refund">
    <page-header title="交易情况">
      <div class="refund__content">
        <div class="refund__price">
          <div>本月交易总额（元）</div>
          <div>124,568,90</div>
        </div>
        <div class="refund__count">
          <div>本月订单笔数（笔）</div>
          <div>596</div>
        </div>
      </div>
    </page-header>
    <div class="refund-table">
      <Search @search="queryUserRefundOrders" />
      <div class="refund-table__container">
        <div class="refund-table__batch">
          <el-button type="primary" size="medium" icon="el-icon-upload2">导出</el-button>

          <el-dropdown @command="handleBatchCommand">
            <el-button size="medium" class="batch-btn">
              批量操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pass">同意退款</el-dropdown-item>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <fz-table
          :data="tableData"
          :columns="columns"
          :total="total"
          :listQuery.sync="listQuery"
          @change="handleChange"
          @selection-change="handleSelectionChange"
        >
          <template #refundStatus>
            <el-table-column label="状态">
              <template slot-scope="{ row }">
                <span :class="[`refund-status${row.refundStatus}`]">
                  {{ row.refundStatuName }}
                </span>
              </template>
            </el-table-column>
          </template>
          <template #option>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <!-- 有发票显示发票信息 -->
                <el-button type="text" v-if="row.refundStatus === 1">
                  {{ row.invoiceCode ? '发票信息' : '--' }}
                </el-button>
                <template v-if="row.refundStatus === 3">
                  <el-button type="text">同意退款</el-button>
                  <el-button type="text">驳回</el-button>
                </template>
              </template>
            </el-table-column>
          </template>
        </fz-table>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './search.vue'
import FzTable from '@/components/FzTable'
import PageHeader from '@/components/Base/PageHeader'

import { queryUserRefundOrders, passRefundApplication } from '@/services/apis/hbproject/order'

export const refundStatus = Object.freeze({
  1: '已退款',
  2: '已驳回',
  3: '待处理'
})

export default {
  name: 'RefundManage',
  components: {
    PageHeader,
    Search,
    FzTable
  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 55,
          align: 'center',
          selectable(row) {
            if (row.refundStatus === 1) {
              return false
            } else {
              return true
            }
          }
        },
        {
          type: 'index',
          label: '序号',
          width: 55
        },
        { prop: 'sourceName', label: '渠道来源' },
        { prop: 'outOrderNo', label: '订单号', tooltip: true },
        { prop: 'projectName', label: '项目名称' },
        { prop: 'orgName', label: '申请企业' },
        { prop: 'refundPrice', label: '退款金额（元）' },
        { prop: 'payType', label: '原支付方式' },
        { prop: 'refundReason', label: '退款说明' },
        { prop: 'createTime', label: '申请时间', type: 'date' },
        { prop: 'updateTime', label: '处理时间', type: 'date' },
        { prop: 'refundStatus', label: '状态', type: 'slot' },
        { prop: 'option', label: '操作', type: 'slot' }
      ],
      total: 0,
      tableData: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      batchOptionData: []
    }
  },

  mounted() {
    this.queryUserRefundOrders()
  },

  methods: {
    async queryUserRefundOrders(params = {}) {
      const { status, data } = await queryUserRefundOrders({
        ...this.listQuery,
        ...params
      })

      if (status === 200) {
        const { total, records } = data
        this.total = total
        this.tableData = records.map((item) => {
          item.refundStatuName = refundStatus[item.refundStatus]

          return item
        })
      }
    },

    // 批量操作
    async handleBatchCommand(command) {
      if (!this.batchOptionData.length) {
        return this.$message.warning('请至少选择一条数据')
      }

      const orderIds = this.batchOptionData.map((item) => item.orderId)

      const { status, data, message } =
        command === 'pass'
          ? await passRefundApplication({
              orderId: orderIds
            })
          : ''

      if (status === 200) this.$message.success(message)

      console.log(data, 'command...')
    },

    handleChange() {
      this.queryUserRefundOrders()
    },

    handleSelectionChange(checkData) {
      this.batchOptionData = checkData
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

$base-color: #212529;
$base-color-light: #73767a;

%refund-status {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-right: 8px;
}

%refund-wrapper {
  width: 376px;
  height: 94px;
  border-radius: 4px;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: #f5f7fa;
  div:first-child {
    color: $base-color-light;
    font-size: 14px;
  }
  div:last-child {
    color: $base-color;
    font-size: 32px;
    font-weight: 500;
    margin-top: 10px;
  }
}

.refund {
  &__content {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  &__price {
    @extend %refund-wrapper;
    margin-right: 10px;
  }
  &__count {
    @extend %refund-wrapper;
  }

  &-table {
    @include pageCard;
    margin-top: 16px;

    &__container {
      margin-top: 20px;
    }

    &__batch {
      margin-bottom: 16px;

      .batch-btn {
        width: 106px;
        margin-left: 10px;
      }
    }
  }

  @for $i from 1 through 4 {
    .refund-status#{$i} {
      &::before {
        @extend %refund-status;
        @if $i == 1 {
          background-color: #0e77d1;
        } @else if $i == 2 {
          background-color: #0e77d1;
        } @else if $i == 3 {
          background-color: #00a854;
        } @else {
          background-color: #0e77d1;
        }
      }
    }
  }
}
</style>
