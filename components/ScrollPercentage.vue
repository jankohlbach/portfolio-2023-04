<script setup lang="ts">
const scroll = useScroll()
</script>

<template>
  <span class="scroll-percentage" :style="`--percentage: ${scroll.percentage}vw`">{{ Math.ceil(scroll.percentage) }}%</span>
</template>

<style lang="scss" scoped>
span {
  position: fixed;
  left: 0;
  bottom: 0;
  mix-blend-mode: difference;
  color: var(--c-light);
  pointer-events: none;
  transform: translateX(min(calc(100vw - 100% - 20px), var(--percentage)));
}
</style>
