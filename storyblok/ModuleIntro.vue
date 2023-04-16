<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-intro">
    <p>
      {{ blok.textarea_intro }}
    </p>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/functions' as *;

section {
  margin-inline: var(--s-s);
  margin-top: rem(80);
}

p {
  max-width: 80%;
  font-size: var(--fs-m);
  line-height: 1.2;
}
</style>
