<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-richtext">
    <div v-html="renderRichText(blok.richtext_text)" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-block: rem(320);
}

div {
  max-width: min(rem(900), 90%);

  @media (min-width: 768px) {
    margin: auto;
  }
}
</style>
