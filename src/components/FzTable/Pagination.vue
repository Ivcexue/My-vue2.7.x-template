<template>
  <div class="pagination-container">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="hideOnSinglePage"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hideOnSinglePage({ total }) {
      return total < 10
    },
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },

  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { currentPage: this.currentPage, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
