<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  /* min-height: calc(100vh - 50px); */
  width: 100%;
  position: relative;
  /* overflow: hidden; */
  overflow: auto;
  background-color: #f5f7fa;
}
.fixed-header + .app-main {
  /* padding-top: 50px; */
  padding: 66px 16px 16px 16px;
  box-sizing: border-box;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
