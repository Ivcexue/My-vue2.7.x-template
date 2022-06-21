<template>
  <div class="refund">
    <page-header title="交易情况">
      <div class="refund__content">
        <div class="refund__price">
          <div>本月交易总额（元）</div>
          <div>{{ formatAmount(amountTotal) }}</div>
        </div>
        <div class="refund__count">
          <div>本月订单笔数（笔）</div>
          <div>{{ orderTotal }}</div>
        </div>
      </div>
    </page-header>
    <div class="refund-table">
      <search @onSearch="onSearch" @onReset="onReset" />

      <div class="refund-tool-box">
        <el-button icon="el-icon-upload2" type="primary" size="mini" @click="handlerExport">导出</el-button>
      </div>

      <el-table v-loading="tableLoading" border :data="agencyList">
        <el-table-column
          v-for="(col, i) in agencyColumns"
          :key="i"
          :type="col.type"
          :width="col.width"
          :formatter="col.formatter"
          :prop="col.prop"
          :label="col.label"
          show-overflow-tooltip
        />
      </el-table>
      <pagination
        :total="total"
        :page.sync="query.currentPage"
        :limit.sync="query.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Base/PageHeader'
import { agencyColumns } from './columns'
import { countOrder, countOrderAmount, exportOrderCheck, exportOrderList, getOrderList } from '@/services/apis/hbproject/order'
import Search from './components/Search'
import Pagination from './components/Pagination'
import { downloadRawFile } from '@/utils'

export default {
  name: 'Order',
  components: {
    Search,
    PageHeader,
    Pagination
  },
  data() {
    return {
      // 加载遮罩层
      tableLoading: false,
      // 本月交易额
      amountTotal: 0,
      // 本月订单数
      orderTotal: 0,
      // 查询条件
      query: {
        currentPage: 1,
        pageSize: 10
      },
      // 列表数据
      agencyList: [],
      // 列表label
      agencyColumns,
      // 总条数
      total: 0
    }
  },
  created() {
    this.getAmountNumber()
    this.getOrderNumber()
    this.getList()
  },
  methods: {
    /** 查询 */
    onSearch(query) {
      this.query.currentPage = 1
      Object.assign(this.query, query)
      this.getList()
    },
    /** 重置 */
    onReset() {
      this.query = {
        currentPage: 1,
        pageSize: 10
      }
      this.getList()
    },
    /** 获取列表 */
    getList() {
      this.tableLoading = true
      getOrderList(this.query).then(res => {
        this.agencyList = res.data.records
        this.total = +res.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /** 导出 */
    async handlerExport() {
      exportOrderCheck(this.query).then(async res => {
        const rawFile = await exportOrderList(this.query)
        downloadRawFile(rawFile, '全部文件.xls')
      })
    },
    /** 获取本月交易额 */
    getAmountNumber() {
      countOrderAmount(this.query).then(res => {
        this.amountTotal = res.data
      })
    },
    /** 获取本月订单数 */
    getOrderNumber() {
      countOrder(this.query).then(res => {
        this.orderTotal = res.data
      })
    },
    /** 金额格式化 */
    formatAmount(amount) {
      if (amount === undefined || amount == null) {
        return '0'
      }
      let logo = '' // 记录正负
      if (amount < 0) {
        logo = '-'
        amount = -amount
      }
      const result = amount.toString().split('')
      let position = result.indexOf('.')
      position = position !== -1 ? position -= 1 : result.length
      while (position > 2) {
        position -= 3
        result.splice(position + 1, 0, ',')
      }
      return logo + result.join('')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

$base-color: #212529;
$base-color-light: #73767a;

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

  &-tool-box {
    margin: 20px 0 16px;
  }

  &-table {
    @include pageCard;
    margin-top: 16px;

    &__container {
      margin-top: 20px;
    }
  }
}

::v-deep .el-form-item .el-form-item__content, .el-form-item .el-form-item__label {
  height: 36px;
}
</style>
