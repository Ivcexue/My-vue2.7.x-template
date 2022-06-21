<template>
  <div class="table-wrapper">
    <div class="table-content">
      <el-table
        :header-cell-style="headerCellStyle"
        :border="border"
        :data="data"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-for="item in columns">
          <!-- 自定义 -->
          <slot v-if="item.type === 'slot'" :name="item.prop"></slot>
          <!-- 时间格式化 -->
          <el-table-column
            v-if="item.type === 'date'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :type="item.type"
            :formatter="formatterDate"
            :show-overflow-tooltip="item.tooltip || false"
          />

          <!-- 普通 -->
          <el-table-column
            v-if="['index'].includes(item.type) || !item.type"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :type="item.type"
            :show-overflow-tooltip="item.tooltip || false"
          />

          <el-table-column
            v-if="item.type === 'selection'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :type="item.type"
            :selectable="(row) => item.selectable(row)"
            :show-overflow-tooltip="item.tooltip || false"
          />
        </template>

        <template slot="empty">
          <Empty />
        </template>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<script>
import { Table } from 'element-ui'
import Empty from '@/components/Base/Empty.vue'
import Pagination from '@/components/FzTable/Pagination.vue'

import { formatDate } from '@/utils'

export default {
  name: 'FzTable',
  props: {
    ...Table.props,
    border: {
      type: Boolean,
      default: false
    },
    headerCellStyle: {
      type: Object,
      default: () => ({
        backgroundColor: '#F2F3F5',
        color: '#212529',
        fontSize: '14px',
        border: 'none'
      })
    },
    columns: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      required: true
    },
    listQuery: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    }
  },
  components: {
    Empty,
    Pagination
  },
  data() {
    return {}
  },

  methods: {
    handlePagination(val) {
      this.$emit('update:listQuery', { ...val })
      this.$emit('change', val)
    },

    formatterDate(_, __, cellValue) {
      if (!cellValue) return '--'
      return formatDate(cellValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-content {
  margin-bottom: 20px;
}
</style>
