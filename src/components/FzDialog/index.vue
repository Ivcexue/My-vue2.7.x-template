<template>
  <el-dialog
    v-if="visible"
    :title="title"
    :visible.sync="visible"
    :width="width"
    :show-close="false"
    :before-close="handleClose"
    custom-class="fz-dialog"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
  >
    <template #title>
      <div class="fz-dialog__header">
        <span class="fz-dialog__header_title">{{ title }}</span>
        <span class="fz-dialog__header_close" @click="handleClose">
          <svg-icon icon-class="close" />
        </span>
      </div>
    </template>

    <div class="fz-dialog__body">
      <slot />
    </div>

    <template v-if="$slots.footer">
      <div class="fz-dialog__footer">
        <slot name="footer" />
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'FzDialog',
  components: {
    SvgIcon
  },
  props: {
    ...Dialog.props,
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '660px'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('custom-close')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.fz-dialog {
  height: 100px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #eef0f3;
    &_title {
      font-size: 16px;
      font-weight: 500;
      color: #24282f;
    }
    &_close {
      cursor: pointer;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 45px;
    padding: 10px 20px 0 0;
    margin: 0 -20px -20px -20px;
    border-top: 1px solid #eee;

    ::v-deep button {
      width: 88px;
      height: 32px;
      border-radius: 4px;
    }
  }
}
::v-deep {
  .el-dialog__header {
    padding: 0 !important;
  }
}

::v-deep .fz-dialog {
  border-radius: 6px !important;
}
</style>
