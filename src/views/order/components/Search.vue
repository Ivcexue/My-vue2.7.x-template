<template>
  <el-form ref="formRef" class="form-container" :model="formInfo" size="small" label-width="100px">
    <el-form-item label="项目名称：">
      <el-input v-model="formInfo.projectName" placeholder="请输入项目名称" clearable />
    </el-form-item>
    <el-form-item label="代理公司：">
      <el-input v-model="formInfo.projectOrgName" placeholder="请输入代理公司" clearable />
    </el-form-item>
    <el-form-item label="订单号：">
      <el-input v-model="formInfo.outOrderNo" placeholder="请输入订单号" clearable />
    </el-form-item>
    <el-form-item label="渠道来源：">
      <el-select v-model="formInfo.source" placeholder="请选择">
        <el-option value="yingbiao" label="赢标平台" />
        <el-option value="hezhe" label="菏泽项目" />
        <el-option value="huangshan" label="山西项目" />
        <el-option value="shanxi" label="单县项目" />
        <el-option value="shanxian" label="庆阳项目" />
        <el-option value="qiye" label="企业版" />
      </el-select>
    </el-form-item>
    <el-form-item label="交易时间：">
      <el-date-picker
        v-model="timer"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="onDatePickerChange"
      />
    </el-form-item>
    <el-form-item>
      <div class="search-btn">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
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
      formInfo: {
        projectName: '',
        outOrderNo: '',
        source: '',
        projectOrgName: '',
        payTimeStart: '',
        payTimeEnd: ''
      }
    }
  },
  methods: {
    onDatePickerChange(timeRange) {
      if (!timeRange) {
        this.formInfo.payTimeStart = ''
        this.formInfo.payTimeEnd = ''
        return
      }
      this.formInfo.payTimeStart = timeRange[0].getTime()
      this.formInfo.payTimeEnd = timeRange[1].getTime()
    },
    onSearch() {
      this.$emit('onSearch', this.formInfo)
    },
    onReset() {
      Object.assign(this.$data, this.$options.data())
      this.$emit('onReset')
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
