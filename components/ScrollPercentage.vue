<script setup lang="ts">
const scroll = useScroll()
</script>

<template>
  <span class="scroll-percentage" :style="`--percentage: ${scroll.percentage}vw`">{{ Math.min(Math.ceil(scroll.percentage), 100) }}%</span>
</template>

<style lang="scss" scoped>
span {
  position: fixed;
  left: 0;
  bottom: to-rem(5);
  z-index: var(--zi-scroll-percentage);
  mix-blend-mode: difference;
  color: var(--c-light);
  pointer-events: none;
  transform: translateX(min(calc(100vw - 100% - 20px), var(--percentage)));
}
</style>
