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
section {
  margin-inline: var(--s-s);
  margin-top: rem(80);
}

p {
  max-width: 80%;
  font-size: clamp(1.5rem, 0.977rem + 2.23vw, 3.375rem);
  line-height: 1.2;
}
</style>
