<template>
  <TopBar />

  <RouterView />
</template>

<script setup>
import TopBar from './components/TopBar.vue'
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  min-width: 90vw;
}
</style>
