<script setup lang="ts">
import { onMounted } from 'vue'
import SakanaWidget from 'sakana-widget'

const sakana = new SakanaWidget()
onMounted(() => {
  sakana.mount('#sakana-widget')
})
</script>

<template>
  <div id="sakana-widget" />
</template>

<style lang="scss">
@import 'sakana-widget/lib/index.css';
#sakana-widget {
  z-index:10;
  position: relative;
  left:0;
  bottom:10px;
  width: 100%;
  height: 100%;
}
</style>
