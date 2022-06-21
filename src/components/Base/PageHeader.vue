<template>
  <div class="page-header">
    <div class="page-header__title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

$base-color: #212529;
$base-color-light: #73767a;

.page-header {
  @include pageCard;

  &__title {
    color: $base-color;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
