<template>
  <el-form class="form-container" :model="formInfo" ref="formRef" size="small" label-width="100px">
    <el-form-item label="订单号：">
      <el-input v-model.trim="formInfo.outOrderNo" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="项目名称：">
      <el-input v-model.trim="formInfo.projectName" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="申请企业：">
      <el-input v-model.trim="formInfo.orgName" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="formInfo.status" placeholder="请选择">
        <el-option
          v-for="item in refundStatus"
          :key="item.status"
          :label="item.label"
          :value="item.status"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="交易时间：">
      <el-date-picker
        v-model="timer"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item> -->
    <el-form-item>
      <div class="search-btn">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      timer: [],
      refundStatus: [
        { label: '已退款', status: '1' },
        { label: '已驳回', status: '2' },
        { label: '待处理', status: '3' }
      ],
      formInfo: {
        outOrderNo: '',
        orgName: '',
        projectName: '',
        status: ''
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.formInfo)
    },
    reset() {
      this.formInfo = {
        outOrderNo: '',
        orgName: '',
        projectName: '',
        status: ''
      }

      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  .el-form-item {
    width: 525px;
    .el-select {
      width: 100%;
    }
  }

  .search-btn {
    button {
      width: 88px;
      height: 32px;
    }
  }
}
</style>
