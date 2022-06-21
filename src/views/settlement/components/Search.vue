<template>
  <el-form ref="formRef" class="form-container" :model="formInfo" size="small" label-width="100px">
    <el-form-item label="项目名称：">
      <el-input v-model="formInfo.projectName" placeholder="请输入项目名称" clearable />
    </el-form-item>
    <el-form-item label="代理公司：">
      <el-input v-model="formInfo.orgName" placeholder="请输入代理公司" clearable />
    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="formInfo.handleStatus" placeholder="请选择">
        <el-option v-for="(key, val) in statusMapper" :key="key" :value="val" :label="key" />
      </el-select>
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
    <el-form-item label="申请时间：">
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
import { statusMapper } from '../constant'

export default {
  name: 'Search',
  data() {
    return {
      timer: [],
      statusMapper,
      formInfo: {
        projectName: '',
        orgName: '',
        handleStatus: '',
        source: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  methods: {
    onDatePickerChange(timeRange) {
      if (!timeRange) {
        this.formInfo.startTime = ''
        this.formInfo.endTime = ''
        return
      }
      this.formInfo.startTime = timeRange[0].getTime()
      this.formInfo.endTime = timeRange[1].getTime()
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
