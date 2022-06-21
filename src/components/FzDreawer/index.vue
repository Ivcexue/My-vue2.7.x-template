<template>
  <el-drawer
    :title="title"
    :size="size"
    :with-header="false"
    :visible.sync="visible"
    :before-close="handleClose"
    :append-to-body="appendToBody"
    :wrapper-closable="wrapperClosable"
  >
    <div class="drawer-wrapper">
      <!-- header -->
      <div class="drawer-wrapper__header">
        <span class="drawer-wrapper__header_title">{{ title }}</span>
        <span class="drawer-wrapper__header_close" @click="handleClose">
          <svg-icon icon-class="close" />
        </span>
      </div>
      <!-- body -->
      <div class="drawer-wrapper__body">
        <slot />
      </div>
      <!-- footer -->
      <div v-if="$slots.footer" class="drawer-wrapper__footer">
        <slot name="footer" />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { Drawer } from 'element-ui'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'FzDrawer',
  components: {
    SvgIcon
  },
  props: {
    ...Drawer.props,
    title: {
      type: String,
      default: '标题'
    },
    size: {
      type: String,
      default: '42%'
    },
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
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
.drawer-wrapper {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 999;
    &_title {
      color: #23272e;
      font-size: 16px;
      font-weight: 500;
    }
    &_close {
      cursor: pointer;
    }
  }
  &__body {
    padding: 78px 24px 70px 30px;
    box-sizing: border-box;
  }
  &__footer {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #f0f0f1;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: 20px;
    z-index: 999;
  }
}
</style>
