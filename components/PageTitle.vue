<template>
  <h1>
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
h1 {
  font-size: var(--fs-xxxl);
  line-height: 0.88;
  text-transform: uppercase;
  margin: var(--s-s) var(--s-s) 0;

  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    left: 28%;
  }
}
</style>
