<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="layout">
    <Noise />
    <Menu />
    <Header />

    <section>
      <h1>{{ error.statusCode }}</h1>
      <h2>{{ error.message }}</h2>
    </section>
  </div>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: rem(180);
}

h1 {
  font-size: var(--fs-xl);
  font-weight: 100;
}

h2 {
  font-size: var(--fs-m);
  font-weight: 100;
}
</style>
