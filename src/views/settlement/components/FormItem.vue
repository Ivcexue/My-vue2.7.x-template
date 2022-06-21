<!--
 * @Author: zn
 * @Date: 2021-08-26 13:34:16
 * @LastEditTime: 2022/03/01 14:34:54
 * @LastEditors: SY
 * @Description: 仿el-form-item 用于详情展示
 * @FilePath: @\components\FZ\ListOne.vue
-->

<template>
  <el-col v-bind="$attrs">
    <div :class="`el-form--label-${labelPosition} fz-form-item`">
      <label class="el-form-item__label label" :style="labelStyle">
        <slot name="title">{{ `${title}${labelSuffix}` }}</slot>
      </label>
      <div
        class="el-form-item__content content"
        :class="{ 'text-hidden': showTooltip }"
        :style="contentStyle"
      >
        <slot>
          <el-tooltip
            v-if="showTooltip"
            :open-delay="500"
            :content="realContent"
            placement="top"
            effect="dark"
          >
            <div :class="{ 'text-hidden': showTooltip }">{{ realContent }}</div>
          </el-tooltip>
          <template v-else>
            {{ realContent }}
          </template>
        </slot>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelSuffix: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    showTooltip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // TODO: 基于此组件包装父组件，实现labelWidth="auto"
      // computedLabelWidth: 通过getComputedStyle与Math.max计算父组件中最大label所占的宽度
      computedLabelWidth: ''
    }
  },
  computed: {
    labelStyle() {
      const ret = {}
      if (this.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    contentStyle() {
      const ret = {}
      if (this.labelPosition === 'top' || this.$attrs.inline) return ret
      if (!this.title && !this.labelWidth) return ret
      ret.marginLeft = this.labelWidth
      return ret
    },
    realContent() {
      return this.content || '--'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-hidden {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.fz-form-item {
  padding-bottom: 12px;
  .label {
    line-height: 30px;
    color: #777;
  }
  .content {
    line-height: 30px;
    color: #333;
    // 修改lineHeight后
    ::v-deep .el-button--small, .el-button--small.is-round {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }
}
</style>
<style>
/* 由于popper绑定到body中, 只能添加全局样式进行修改 */
.el-tooltip__popper {
  max-width: 30%
}
</style>
