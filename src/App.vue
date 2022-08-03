<template>
  <div id="app">
    <router-view />
    <VueJsx/>
  </div>
</template>

<script>
import VueJsx from './views/VueJsx'
export default {
  name: 'App',
  components: {
    VueJsx
  }
}
</script>
